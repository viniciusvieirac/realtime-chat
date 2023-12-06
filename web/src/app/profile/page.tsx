"use client";

import AuthContext from "@/context/auth/AuthContext";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Profile() {
  const router = useRouter();
  const { user, getUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
  }, [getUser]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white text-slate-900 rounded-lg shadow-lg p-6">
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/chat")}
          className="w-full mb-4 bg-black"
        >
          Voltar
        </Button>
        <div className="mb-4 text-center">
          {user.imageUrl && (
            <Image
              src={user.imageUrl}
              alt="Imagem do perfil"
              width={128}
              height={128}
              className="rounded-full mx-auto mb-2"
            />
          )}
        </div>
        <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
        <p className="text-sm mb-4">{user.description}</p>
        <Button
          variant="contained"
          color="primary"
          className="w-full mb-4 bg-black"
          onClick={() => router.push("/profile/edit")}
        >
          Editar Perfil
        </Button>
      </div>
    </div>
  );
}
