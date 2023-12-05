"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AuthContext from "@/context/auth/AuthContext";
import { IMsgData, IMsgDataTypes } from "@/interfaces/MessagesInterface";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { formatarHorarioISO8601 } from "../utils/formattedHours";
import { useRouter } from "next/navigation";

const socket = io("http://localhost:3000");

export default function Chat() {
  const { user, getUser } = useContext(AuthContext);
  const router = useRouter();
  const [chat, setChat] = useState<IMsgData[]>([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
    if (newMessage && newMessage.content && newMessage.content.trim() !== "") {
      setChat(prevChat => [...prevChat, newMessage]);
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
  
      setText("");
  
    
      if (text.trim() !== "") {
        setChat(prevChat => [...prevChat, newMsg]);
      }
    } else {
    
    
      console.log('Por favor, insira uma mensagem antes de enviar.');
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chat]);

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Você foi deslogado com sucesso!');
    router.push('/');
  };

  const userId = user?.id;

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md w-[80%] max-w-lg h-[70vh] overflow-y-auto">
  {chat.map((msg) => (
    <div
      key={msg.id}
      className={`flex flex-col ${msg.senderId === userId ? "items-end" : "items-start"} space-y-1`}
    >
      <div className={`flex items-center ${msg.senderId === userId ? "justify-end" : "justify-start"} mb-1`}>
        {msg.senderId !== userId && (
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <Image
              src={msg.sender?.imageUrl || "/images/avatar.png"}
              alt="Profile Image"
              width={32}
              height={32}
            />
          </div>
        )}
        <div className={`p-3 rounded-lg text-black text-sm ${msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
          <h4 className="m-0 text-lg font-bold">{msg.sender?.name}</h4>
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
            <Button variant="contained" type="submit">Enviar</Button>
          </form>
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
          </div>
            <Image
              src={user?.imageUrl || "/images/avatar.png"}
              alt="Profile Image"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
              onClick={() => router.push('/profile')}
            />
        </div>
      </div>
    </ProtectedRoute>
  );
}