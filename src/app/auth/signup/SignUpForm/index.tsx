'use client'

import { signUpSchema } from "../../../../../actions/schemas"
import { SignUp } from "../../../../../actions/sign-up"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema)
  })

  const { mutate, isPending, error } = useMutation({
    mutationFn: SignUp
  })

  return (
    <>
      <form
        onSubmit={handleSubmit(values => mutate(values))}
        className="flex flex-col gap-6"
      >
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-gray-700">Enter your email</label>
          <input
            {...register("email")}
            id="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="username" className="font-medium text-gray-700">Enter username</label>
          <input
            {...register("username")}
            id="username"
            placeholder="Enter username"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <ErrorMessage message={errors.username.message!} />}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium text-gray-700">Enter your password</label>
          <input
            type="password"
            {...register("password")}
            id="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <ErrorMessage message={errors.password.message!} />}
        </fieldset>

        <button
          type="submit"
          className="mt-4 w-1/2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
        >
          {isPending ? "Signing you in!" : "Sign In"}
        </button>
      </form>

      {error && <ErrorMessage message={error.message} />}
    </>
  )
}

export default SignUpForm