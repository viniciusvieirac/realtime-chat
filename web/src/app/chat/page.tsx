"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AuthContext from "@/context/auth/AuthContext";
import { IMsgData, IMsgDataTypes } from "@/interfaces/MessagesInterface";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { formatarHorarioISO8601 } from "../utils/formattedHours";

const socket = io("http://localhost:3000");

export default function Chat() {
  const { user, getUser } = useContext(AuthContext);
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
      setChat(prevChat => [...prevChat, newMessage]); // Utiliza a função de atualização do estado
    }
  }, [newMessage]);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = user?.email;
 
    if (text.trim() !== "") {
      const msgData: IMsgDataTypes = {
        content: text,
        email: email as string,
      };
      socket.emit("createMessage", msgData);
  
      const newMsg = {
        content: text,
        createdAt: new Date().toISOString(),
        sender: {
          name: user?.name || "Anonymous",
          imageUrl: user?.imageUrl || "",
        },
        senderId: userId,
      };
  
     
      const updatedChat = [...chat];
      updatedChat.push(newMsg);
  
      setChat(updatedChat);
      setText("");
    }
  };
  

  useEffect(() => {
    getUser();
  }, []);

  const userId = user?.id;

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-[80%] max-w-lg h-[70vh] overflow-y-auto">
          {chat.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col items-${msg.senderId === userId ? "end" : "start"} space-y-1`}
            >
              <div className={`flex items-${msg.senderId === userId ? "end" : "start"} mb-1`}>
                {msg.senderId !== userId && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <Image
                      src={msg.sender.imageUrl || "/images/avatar.png"}
                      alt="Profile Image"
                      width={32}
                      height={32}
                    />
                  </div>
                )}
                <div className={`p-3 rounded-lg text-black text-sm ${msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
                  <h4 className="m-0 text-lg font-bold">{msg.sender.name}</h4>
                  <p className={`m-0 ${msg.senderId === userId ? "text-white" : "text-black"}`}>{msg.content}</p>
                  <div className="text-xs text-gray-600 ml-auto">
                    <span>{formatarHorarioISO8601(msg.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 w-[80%] max-w-lg">
          <form onSubmit={(e) => sendData(e)} className="flex">
            <TextField
              className="bg-slate-100 flex-grow"
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