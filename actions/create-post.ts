'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { slugify } from "@/utils/slugify"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "@/utils/supabase/upload-image"


export const CreatePost = async (userdata: z.infer<typeof postSchema>)=> {
    console.log("Image parameter", typeof userdata.image)
    const parsedData = postSchema.parse(userdata)
    const slug = slugify(parsedData.title)

    const imageFile = userdata.image?.get("image")
     
    if(!(imageFile instanceof File) && imageFile !== null) {
        throw new Error("Malformed image file")
    }

    const publicImageUrl = imageFile ? await uploadImage(imageFile) : null

     const supabase = await createClient();
     const {data: {user}} = await supabase.auth.getUser();
     
     if(!user) {throw new Error("Not Authorized")}
    
     const userId = user.id;
   
    await supabase.from('posts')
                  .insert([{user_id: userId, slug: slug,  ...parsedData, image: publicImageUrl }])
                  .throwOnError()

    revalidatePath("/")
    redirect(`/${slug}`)
     
}