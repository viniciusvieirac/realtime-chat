"use client";
import Image from "next/image";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "@/context/auth/AuthContext";
import { requestLogin, setToken } from "./utils/AxiosFunctions";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { email, setEmail, password, setPassword } = useContext(AuthContext);
  const [failedLogin, setFailedLogin] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Preencha todos os campos");
    try {
      const { access_token } = await requestLogin("/login", {
        email,
        password,
      });
      setToken(access_token);
      localStorage.setItem("token", access_token);
      localStorage.setItem("email", email);
      router.push("/chat");
    } catch (error: any) {
      setPassword("");
      setFailedLogin(true);
    }
  };

  const platinumColor = 'rgb(var(--platinum))';

  const divStyle = {
    backgroundColor: platinumColor,
  }

  return (
    <main className="flex flex-col lg:flex-row items-center justify-center h-screen">
      <div 
      className="lg:w-2/5 rounded-lg bg-white bg-opacity-75 backdrop-blur-md p-8 flex flex-col items-center justify-center h-5/6"
      style={divStyle}>
        <div className="w-full h-full text-center flex flex-col items-center justify-start">
          <div className="mt-20">
            <Image
              src="/images/undraw_online_chat_re_c4lx.svg"
              alt="Picture of the author"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h1 className="text-3xl font-bold mt-14">Seja bem vindo!</h1>
            <p className="text-gray-600 mt-4">Faça login para continuar</p>
          </div>
          <div>
            <form
              className="flex flex-col items-center mt-20"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <TextField
                className="mb-8 w-60"
                id="standard-basic"
                type="email"
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className="mb-8 w-60"
                type="password"
                id="standard-basic"
                label="Password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="outlined" type="submit">
                Entrar
              </Button>
            </form>
          </div>
          {failedLogin && (
            <>
              <span className="text-red-500 mt-4">
                Email or password incorrect
              </span>
            </>
          )}
        </div>
        <span className="mb-10 text- text-gray-500">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </span>
      </div>
    </main>
  );
}
