"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "name" | "email" | "password" | "confirmPassword"
  ) => {
    const value = e.target.value;
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();

    if (!validateRequiredFields()) {
      return alert("Por favor, preencha todos os campos obrigatórios");
    }

    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "As senhas não coincidem",
      }));
      return;
    }

    const formData = { name, email, password };
    try {
      const validatedData = signUpSchema.parse(formData);
      console.log("Dados validados:", validatedData);

      const data = await requestRegister("/signup", formData);

      if (data) {
        setPassword("");
        alert(
          "Cadastro realizado com sucesso. Entre com suas credenciais para fazer login"
        );
        route.push("/");
      }
    } catch (error) {
      handleValidationError(error);
    }
  };

  const validateRequiredFields = () => {
    return name.trim() !== "" && email.trim() !== "" && password.trim() !== "";
  };

  const handleValidationError = (error: any) => {
    console.log("Ocorreu um erro:", error);
    if (error instanceof z.ZodError) {
      const validationErrors: FormErrors = {
        name: "",
        email: "",
        password: "",
      };

      error.errors.forEach((err) => {
        const field = err.path[0];
        if (field in validationErrors) {
          validationErrors[field as keyof FormErrors] = err.message as string;
        }
      });

      setErrors(validationErrors);
    } else {
      alert(error.message);
    }
  };

  const clearErrors = () => {
    setErrors({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nome de usuário
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="username"
            placeholder="Nome de usuário"
            value={name}
            onChange={(e) => handleInputChange(e, "name")}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
          />
          <p className="text-red-500 text-xs italic">{errors.email}</p>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => handleInputChange(e, "password")}
          />
          <p className="text-red-500 text-xs italic">{errors.password}</p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirmar Senha
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e, "confirmPassword")}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
