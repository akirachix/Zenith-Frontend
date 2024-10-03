"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { setCookie } from "nookies";

import { postUser } from "../components/utils/postUser";

interface UserData {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  role: string;
}

const signupSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  phone_number: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  role: yup.string().required("Role is required"),
});

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserData>({
    resolver: yupResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: UserData) => {
    try {
      const response = await postUser(data);
      console.log(response);

      if (response.error) {
        setErrorMessage(response.error);
      } else if (response.data) {
        const { token, userId } = response.data;

        setCookie(null, "authToken", token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        setCookie(null, "userId", userId, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        setSuccessMessage(
          "Account created successfully! Redirecting to Login..."
        );
        setTimeout(() => {
          reset();
          setSuccessMessage(null);
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Image
          src="/images/background.png"
          alt="People assembling puzzle"
          width={600}
          height={600}
          className="max-w-full h-auto mt-20"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-start justify-center ">
        <div className="max-w-md w-full">
          <h2 className="text-[48px] font-bold mb-6 text-[#0088ff] text-center mt-10">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 ">
            <div>
              <label
                htmlFor="firstName"
                className="block font-medium text-gray-700 text-2xl"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("first_name")}
                className={` block w-full py-3 px-2 bg-transparent border-2 border-blue-500 rounded-[10px] ${
                  errors.first_name ? "border-red-500" : ""
                }`}
              />
              {errors.first_name && (
                <p className="text-red-500">{errors.first_name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-xl font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("last_name")}
                className={` block w-full py-3 px-2 bg-transparent border-2 border-blue-500 rounded-[10px] ${
                  errors.last_name ? "border-red-500" : ""
                }`}
              />
              {errors.last_name && (
                <p className="text-red-500">{errors.last_name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`py-3 px-2 mt-1 block w-full bg-transparent border-2 border-blue-500 rounded-[10px] ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-xl font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                {...register("phone_number")}
                className={`py-3 px-2 mt-1 block w-full bg-transparent border-2 border-blue-500 rounded-[10px] ${
                  errors.phone_number ? "border-red-500" : ""
                }`}
              />
              {errors.phone_number && (
                <p className="text-red-500">{errors.phone_number.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  className={`py-3 px-2 mt-1 block w-full bg-transparent border-2 border-blue-500 rounded-[10px] ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-[24px] capitalize mb-2 text-gray-700"
              >
                Role:
              </label>
              <select
                id="role"
                {...register("role")}
                className={`  w-full h-[45px] px-4 py-3 bg-white border ${
                  errors.role ? "border-red-500" : "border-blue-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500`}
              >
                <option value="Role">Select a role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="Estate_Associate">Estate Associate</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}

            <div>
              <button
                type="submit"
                className={`w-44 mt-2 ml-[33%] flex justify-center bg-[#008fff] text-white py-2 font-bold rounded-[10px] hover:bg-[#EF5B1C]"
              ${isSubmitting ? "opacity-40 cursor-not-allowed" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Signup"}
              </button>
            </div>
          </form>

          <p className=" text-xl text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
