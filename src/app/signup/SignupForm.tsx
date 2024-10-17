import React from "react";
import AuthForm from "../components/AuthForm";

interface SignUpFormProps {
  handleSubmit: (email: string, password: string) => void;
  error: string | null;
  message: string | null;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  handleSubmit,
  error,
  message,
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8AB5E] to-[#F36961] mb-6">
        Switch
      </h2>
      <p className="text-lg font-medium text-gray-700 mb-6">
        Create your account
      </p>
      <AuthForm
        onSubmit={handleSubmit}
        buttonText="Sign up"
        error={error}
        message={message}
      />
      <p className="text-sm mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <a href="/auth/login" className="text-blue-600 hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};

export default SignUpForm;
