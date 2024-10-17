import React from "react";
import AuthForm from "../components/AuthForm";

interface LoginFormProps {
  handleSubmit: (email: string, password: string) => Promise<void>;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit, error }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8AB5E] to-[#F36961] mb-6">
        Switch
      </h2>
      <p className="text-lg font-medium text-gray-700 mb-6">
        Nice to see you again
      </p>
      <AuthForm onSubmit={handleSubmit} buttonText="Sign in" error={error} />
      <p className="text-sm mt-4 text-center text-gray-600">
        Don’t have an account?{" "}
        <a href="/auth/signup" className="text-blue-600 hover:underline">
          Sign up now
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
