'use client'
import { postSchema } from "../../../../../../actions/schemas"
import { EditPost } from "../../../../../../actions/edit-post"
import { Tables } from "@/utils/supabase/database.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"


const EditForm = ({ postId, initialValues }: { postId: number, initialValues: Pick<Tables<'posts'>, "title" | "content" | "image"> }) => {

    const schemaWithImage = postSchema.omit({ image: true })
        .extend({
            image: z.unknown()
                .transform(value => { return value as (FileList) }).optional()
        })

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(schemaWithImage),
        defaultValues: {
            title: initialValues.title,
            content: initialValues.content || undefined,
            image: initialValues.image
        }
    })

    const { mutate, error } = useMutation({
        mutationFn: EditPost
    })
    return (
        <form onSubmit={handleSubmit(values => {

            let imageForm = undefined;
           

            if (values.image?.length && typeof values.image !== 'string') {
                imageForm =  new FormData();
                imageForm.append('image', values.image[0])
            }
            mutate({postId, userdata: { title: values.title, content: values.content, image: imageForm}})
        }
        )} className="flex flex-col mb-4">
            <fieldset>
                <label htmlFor="title">Post Title</label>
                <input className="ml-2 mb-4 px-2" {...register('title')} id="title" placeholder="what's your post clled..." />
            </fieldset>

            <fieldset>
                <label htmlFor="content">What are you going to talk about?</label>
                <input className="ml-2 mb-4 px-2 border-1 rounded-xl w-full" {...register('content')} id="content" placeholder="what's your" />
            </fieldset>

            <fieldset>
                {initialValues.image && <img className="w-xl h-auto" src={initialValues.image} alt="post-images" />}
                <label htmlFor="image" >upload a new image for your post</label>
                <input type="file"  {...register("image")} id="image"></input>
            </fieldset>

            <fieldset>
                <button className="button-teritary mb-4">Update post!</button>
            </fieldset>
            {error && <p>{error.message}</p>}
        </form>
    )
}

export default EditForm