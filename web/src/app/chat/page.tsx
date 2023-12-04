"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AuthContext from "@/context/auth/AuthContext";
import { IMsgData, IMsgDataTypes } from "@/interfaces/MessagesInterface";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { formatarHorarioISO8601 } from "../utils/formattedHours";

const socket = io("http://localhost:3000");

export default function Chat() {
  const {user, getUser} = useContext(AuthContext);
  const [chat, setChat] = useState<IMsgData[]>([]);
  const [text, setText] = useState("");
  const [newMessage, setNewMessage] = useState<IMsgData | null>(null);

  useEffect(() => {
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
    getUser();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <div>
        {user && (
          <div>
            <Link href="/profile">
            {user.avatarUrl && (
              <Image
                src={user.avatarUrl}
                alt="avatar"
                width={100}
                height={100}
                className="mx-auto"
              />
            )}
            <p>{user.name}</p>
            </Link>
          </div>
        )}

        </div>
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
