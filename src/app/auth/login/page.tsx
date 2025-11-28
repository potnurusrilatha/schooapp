import Link from "next/link"
import LogInForm from "./LogInForm"

const LogInPage = () => {
  return (
    <div className="flex justify-center mb-0 lg:mb-0 md:mb-36 mt-0 md:mt-26 lg:mt-6 ">
      <div className=" max-w-md w-full bg-white shadow-md rounded-2xl p-8 border border-gray-200 mx-4 mt-8 mb-8">
        <h2 className="font-semibold text-3xl mb-8 text-center text-gray-800">
          Log in!
        </h2>

        <LogInForm />

        <div className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Sign up here!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LogInPage