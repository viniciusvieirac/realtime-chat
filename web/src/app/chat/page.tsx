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

export default function Chat() {
  const [user, setUser] = useState<UserData | null>(null);
  const [chat, setChat] = useState<IMsgData[]>([]);
  const [text, setText] = useState("");
  const [newMessage, setNewMessage] = useState<IMsgData | null>(null);

  useEffect(() => {
    console.log("useEffect triggered");
    socket.emit("findAllMessages");
    socket.on("allMessages", (data: IMsgData[]) => {
      setChat(data);
    });

    socket.on("message", (message: IMsgData) => {
      setNewMessage(message);
    });

    return () => {
      socket.off("allMessages");
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    if (newMessage) {
      setChat([...chat, newMessage]); // Adiciona a nova mensagem à lista existente
    }
  }, [newMessage]);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = user?.email;
    if (text !== "") {
      const msgData: IMsgDataTypes = {
        content: text,
        email: email as string,
      };

      socket.emit("createMessage", msgData);

      setChat([
        ...chat,
        {
          content: text,
          createdAt: new Date().toISOString(),
          sender: {
            name: user?.name || "Anonymous",
          },
        },
      ]);

      setText("");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUser = async () => {
      if (token) {
        const data = await getUserByToken("/user/data", token);
        setUser(data as UserData);
      }
    };
    getUser();
  }, []);

  function formatarHorarioISO8601(createdAt: string | undefined) {
    if (!createdAt) return ""; // Tratar valores undefined

    const dateObject = new Date(createdAt);
    if (isNaN(dateObject.getTime())) {
      return ""; // Tratar valores de data inválidos
    }

    const horas = dateObject.getHours();
    const minutos = dateObject.getMinutes();
    const horarioFormatado = `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}`;
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
              <p>
                {msg.sender && <strong>{msg.sender.name}:</strong>}{" "}
                {msg.content}
              </p>
              {msg.createdAt && <p>{formatarHorarioISO8601(msg.createdAt)}</p>}
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
