'use server'
 
import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"
import {logInSchema} from "./schemas"
 
export const LogIn = async (userdata: z.infer<typeof logInSchema>) => {
   
    const parsedData = logInSchema.parse(userdata)


    const supabase = await createClient()
 
    const {data: {user}, error} = await supabase.auth.signInWithPassword(parsedData)
    console.log("Error", error)
 
    // if (user && user.email) {
    //     const {data, error} = await supabase.from('users').insert([{id: user.id, email: user.email, username: userdata.password}])
    //     // console.log("New user:", data, "Error:", error)
    // }
    if (error) throw error
    redirect("/")
}
 