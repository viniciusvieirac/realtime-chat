"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { requestRegister } from "../utils/AxiosFunctions";
import { signUpSchema } from "../utils/signupSchema";
import { FormErrors } from "@/interfaces/FormInterfaces";

export default function SignUp() {
  const route = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    if (password !== confirmPassword) return alert("Passwords do not match");

    const formData = { name, email, password, confirmPassword };
    try {
      const validatedData = signUpSchema.parse(formData);

      const data = await requestRegister("/signup", validatedData);
      if (data) {
        setPassword("");
        alert("Sign up successful, enter your credentials to login");
        route.push("/");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const validationErrors: FormErrors = {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        };
    
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof FormErrors;
          validationErrors[field] = err.message;
        });
    
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="username"
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="text-red-500 text-xs italic">{errors.name}</p>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-red-500 text-xs italic">{errors.email}</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500 text-xs italic">{errors.password}</p>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
