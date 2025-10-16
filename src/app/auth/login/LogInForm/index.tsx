'use client'
import { LogIn } from "../../../../../actions/log-in"
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { logInSchema } from "../../../../../actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"


const LogInForm = () => {

    const {register, 
        handleSubmit,
    formState: {errors}} = useForm({
        resolver: zodResolver(logInSchema)
    })

    const {mutate, isPending, error} = useMutation({
        mutationFn: LogIn
    })

    return (
        <>
        <form onSubmit={handleSubmit(values => mutate(values))} className=" flex flex-col ">
            <h2 className="font-bold text-center mb-4">Log In!</h2>
            <fieldset>
                <label htmlFor="email">Email</label>
                <input className="ml-2 mb-4 px-2 border-0 rounded-sm" {...register("email")} type="email" name="email" id="email" placeholder="Enter your email" /> 
                {errors.email && <ErrorMessage message={errors.email.message!} /> }
            </fieldset>
            <fieldset>
                <label htmlFor="password">Password</label>
                <input className="ml-2 mb-4 px-2 border-0 rounded-sm" {...register("password")} type="password" name="password" id="password" placeholder="Enter your password" /> 
                {errors.password && <ErrorMessage message={errors.password.message!} /> }
            </fieldset>
            <button type="submit" className="button-secondary w-1/2 text-white m-auto p-2 mt-4">{isPending? "Logging you in!" : "Log In!"}</button>
             {error && <ErrorMessage message={error.message} /> } 
            
        </form>
       
        </>
        
    )
}
export default LogInForm