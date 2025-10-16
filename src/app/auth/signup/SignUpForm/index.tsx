'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "../../../../../actions/schemas"
import { SignUp } from "../../../../../actions/sign-up"
import ErrorMessage from "@/components/ErrorMessage"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

const  SignUpForm = () => {
    const {
            register,
            handleSubmit,
            formState: {errors} 

     } = useForm({
        resolver: zodResolver(signUpSchema)
        })

        const{mutate, error} = useMutation({
            mutationFn:SignUp
        })
    

    return (
        <>
        <form onSubmit={handleSubmit(values=> mutate(values))} className=" flex flex-col mb-4">
            
            <fieldset>
                <label htmlFor="email">Email</label>
                <input className="ml-2 mb-4 px-2" type="email" id="email" {...register("email")} placeholder="Enter your email" /> 
                {errors.email && <ErrorMessage message={errors.email.message!} />}
            </fieldset>
            <fieldset>
                <label htmlFor="username">Type your name</label>
                <input className="ml-2 mb-4 px-2" type="username"  id="username" {...register("username")} placeholder="Enter your name" /> 
                 {errors.username && <ErrorMessage message={errors.username.message!} />}
            </fieldset>
            <fieldset>
                <label htmlFor="password">Password</label>
                <input className="ml-2 mb-4 px-2" type="password"  id="password" {...register("password")} placeholder="Enter your password" /> 
                 {errors.password && <ErrorMessage message={errors.password.message!} />}
            </fieldset>
            <button type="submit" className="button-secondary w-1/2 text-white m-auto p-2 mt-4">Sign Up!</button>
               {errors.password && <ErrorMessage message={errors.password.message!} />}
            

        </form>
        </>
    )
}
export default SignUpForm