'use client'


import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"
import { CreatePost } from "../../../../actions/create-post"
import { postSchema } from "../../../../actions/schemas"

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
    <div className="max-w-2xl mx-auto mt-10 mb-10  bg-white shadow-md rounded-2xl p-8 border border-gray-300 ">
      <h2 className="font-semibold text-3xl mb-8 text-center text-gray-800">
        Got something to say?
      </h2>

      <form
        onSubmit={handleSubmit(values => {
          let imageForm = new FormData();

          if (values.image?.length) {
            imageForm.append('image', values.image[0])
          }
          mutate({ title: values.title, content: values.content, image: imageForm })
        })}
        className="flex flex-col gap-6"
      >
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium text-gray-700">Post Title</label>
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title")}
            id="title"
            placeholder="Enter post title"
          />
          {errors.title && <ErrorMessage message={errors.title.message!} />}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="content" className="font-medium text-gray-700">What are you going to talk about?</label>
          <textarea
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            {...register("content")}
            id="content"
            placeholder="Start talking..."
          />
          {errors.content && <ErrorMessage message={errors.content.message!} />}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="image" className="font-medium text-gray-700 mb-2">Upload an image</label>
          <input
            type="file"
            {...register("image")}
            id="image"
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md 
              file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 
              hover:file:bg-blue-100 cursor-pointer"
          />
          {errors.image && <ErrorMessage message={errors.image.message!} />}
        </fieldset>

        <button
          type="submit"
          className="mt-4  bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors  w-1/2 mx-auto block"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}

export default CreatePage