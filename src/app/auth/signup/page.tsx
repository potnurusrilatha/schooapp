import Link from "next/link"
import SignUpForm from "../signup/SignUpForm"

const SignUpPage = () => {
  return (
    <div className="flex justify-center mb-6 lg:mb-6 md:mb-36 mt-0 md:mt-26 lg:mt-6 ">
      <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-8 border border-gray-200 mx-4">
        <h2 className="font-semibold text-3xl mb-8 text-center text-gray-800">
          Sign Up!
        </h2>

        <SignUpForm />

        <div className="text-center text-gray-600 mt-6 ">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors ml-2"
          >
            Log in here!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage