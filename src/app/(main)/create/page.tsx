'use client'
import { CreatePost} from "../../../../actions/create-post"
import { postSchema } from "../../../../actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

const CreatePage = () => {
    const schemaWithImage =
        postSchema.omit({ image: true })
            .extend({ image: z.unknown().transform(value => { return value as (FileList) }).optional() })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaWithImage)
    })

    const { mutate, error } = useMutation({
        mutationFn: CreatePost
    })

    return (
        <div className="border-1 rounded-xl p-4 w-[700px] mx-auto ">
            <h2 className="font-bold text-3xl mb-4">Got something to say?</h2>
            <form onSubmit={handleSubmit(values => {
                const imageForm = new FormData()

                if (values.image) {
                    imageForm.append('image', values.image[0])
                }

                mutate({title: values.title, content: values.content, image: imageForm})
            }
            )} className="flex flex-col mb-4">
                <fieldset>
                    <label htmlFor="title">Post title</label>
                    <input className="ml-2 mb-4 px-2" {...register("title")} id="title" placeholder="What's your post called..." />
                </fieldset>
                <fieldset>
                    <label htmlFor="content">What are you going to talk about?</label>
                    <textarea className="ml-2 mb-4 px-2 border-1 rounded-xl w-full" {...register("content")} id="content" placeholder="Start talking..." />
                </fieldset>
                <fieldset>
                    <label htmlFor="image">Upload an image for your post if you like</label>
                    <input type="file" {...register("image")} id="image"></input>
                    {errors.image && <ErrorMessage message={errors.image.message!} />}
                </fieldset>
                <button className="button-secondary w-1/2 m-auto">Create Post</button>
            </form>
        </div>
    )
}

export default CreatePage