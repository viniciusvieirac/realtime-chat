"use client";

import { useState, ReactNode, useMemo } from "react";
import AuthContext from "./AuthContext";
import { getUserByToken } from "@/app/utils/AxiosFunctions";

interface AuthContextValues {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({} as AuthContextValues);

  const values: AuthContextValues = useMemo(
    () => {
      const getUser = async () => {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await getUserByToken("/user/data", token);
          setUser(data);
        }
      };

      return {
        email,
        setEmail,
        password,
        setPassword,
        user,
        setUser,
        getUser,
      };
    },
    [email, setEmail, password, setPassword, user, setUser]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
