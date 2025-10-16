import Link from "next/link";
import LogInForm from "./LogInForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-2">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-800">
          Welcome Back
        </h1>
        <LogInForm />
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            className="font-medium text-red-500 hover:text-red-600"
            href="/auth/signup"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
