import Link from "next/link";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-2 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Create an Account
        </h2>
        <SignUpForm />
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            className="font-medium text-red-500 hover:text-red-600"
            href="/auth/login"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
