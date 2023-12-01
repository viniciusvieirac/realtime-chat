'use client';

import { useState, ReactNode, useMemo } from "react";
import AuthContext from "./AuthContext";

interface AuthContextValues {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const values: AuthContextValues = useMemo(
    () => ({
      email,
      setEmail,
      password,
      setPassword
    }),
    [email, setEmail, password, setPassword]
  );

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
