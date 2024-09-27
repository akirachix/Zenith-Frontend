
'use client';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
 });
 
 
 type LoginFormData = yup.InferType<typeof loginSchema>;
 
 
 const Login: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });
 
 
  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setLoginSuccess(false);
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
       const result = await response.json();
       if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }
       console.log("Login successful:", result);
      setLoginSuccess(true);
    } catch (error) {
      console.error("Login error:", error);
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
 
 
  const handleGoogleLogin = () => {
    window.location.href = 'https://aquasense-e472a26d7581.herokuapp.com/auth/login';
  };
 
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 

  return (
    <div className="flex h-screen font-sans">
      <div className="w-1/2 bg-blue-100 flex items-center justify-center">
        <img src="/login.png" alt="Login illustration" className="w-full h-auto max-w-md" />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <h2 className="text-4xl font-bold mb-9 text-center text-blue-500">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 mr-10 text-xl">
            <div className='w-full'>
              <label htmlFor="email" className="block text-2xl font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-[150%] px-8 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-2xl font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-[150%] px-6 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-6 right-[-150px]  text-gray-400 focus:outline-none  "
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
            {loginSuccess && <p className="text-green-500 text-sm">Logged in successfully!</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[150%] px-8 py-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-2xl">
                <span className="px-2 bg-white text-gray-500 ">OR</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="mt-8 w-[130%] px-8 py-4 flex items-center justify-center bg-white border border-gray-300 rounded-md text-xl font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FcGoogle className="w-9 h-5 mr-2 " />
              Continue with Google 
            </button>
          </div>

          <p className="mt-6 text-center text-2xl text-gray-600">
            Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline text-xl">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


