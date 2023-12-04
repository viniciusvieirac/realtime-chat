"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { getUserByToken } from "../utils/Auth";
import { Button, TextField } from "@mui/material";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

interface UserData {
  name: string;
  email: string;
}

interface IMsgDataTypes {
  content: string;
  imageUrl?: string;
  createdAt?: String;
  email?: string;
}

interface IMsgData {
  content: string;
  createdAt?: String;
  imageUrl?: string;
  id?: number;
  senderId?: number;
}

export default function Chat() {
  const [user, setUser] = useState<UserData | null>(null);
  const [chat, setChat] = useState<IMsgData[]>([]);
  const [text, setText] = useState("");

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = user?.email;
    if (text !== "") {
      const msgData: IMsgDataTypes = {
        content: text,
        email: email as string,
      };
      socket.emit("createMessage", msgData);
      setText("");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUser = async () => {
      if (token) {
        const data = await getUserByToken("/user/data", token);
        if (data && typeof data === "object" && !Array.isArray(data)) {
          setUser(data as UserData);
        } else {
          console.log("Data received is not in the expected format:", data);
        }
      } else {
        console.log("Token not found");
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    socket.emit("findAllMessages");

    socket.on("allMessages", (data: IMsgData[]) => {
      setChat(data);
    });

    return () => {
      socket.off("allMessages");
    };
  }, [chat]);

  useEffect(() => {
    socket.on("newMessage", (data: IMsgData) => {
      setChat(prevChat => [...prevChat, data]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  function formatarHorarioISO8601(createdAt: string) {
    const dateObject = new Date(createdAt);
    const horas = dateObject.getHours();
    const minutos = dateObject.getMinutes();
    const horarioFormatado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    return horarioFormatado;
  }
  
  return (
    <ProtectedRoute>
      <div>
        <h1>Teste</h1>
        {user && (
          <div>
            <p>Nome do Usuário: {user.name}</p>
            <p>Email do Usuário: {user.email}</p>
          </div>
        )}
        <div>
          {chat.map((msg) => (
            <div key={msg.id}>
              <p>{msg.content}</p>
              <p>{formatarHorarioISO8601(msg.createdAt as string)}</p>
            </div>
          ))}
        </div>
        <div>
          <form onSubmit={(e) => sendData(e)}>
            <TextField
              className="bg-slate-100"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              id="filled-basic"
              label="Envie sua mensagem"
              variant="filled"
            />
            <Button type="submit">Enviar</Button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
