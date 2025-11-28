'use client'
import { LogIn } from "../../../../../actions/log-in"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { logInSchema } from  "../../../../../actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"

const LogInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(logInSchema)
  })

  const { mutate, isPending, data } = useMutation({
    mutationFn: LogIn
  })

  return (
    <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col gap-6">

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
        {isPending ? "Logging you in!" : "Log In"}
      </button>

      {data?.error && <ErrorMessage message={data.error} />}
    </form>
  )
}

export default LogInForm