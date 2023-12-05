"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AuthContext from "@/context/auth/AuthContext";
import { IMsgData, IMsgDataTypes } from "@/interfaces/MessagesInterface";
import { Button, TextField  } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { formatarHorarioISO8601 } from "../utils/formattedHours";
import { useRouter } from "next/navigation";
import ChatMessages from "@/components/ChatMessages";
import ChatForm from "@/components/ChatForm";

const socket = io("http://localhost:3000");

export default function Chat() {
  const { user, getUser } = useContext(AuthContext);
  const router = useRouter();
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
    if (newMessage && newMessage.content && newMessage.content.trim() !== "") {
      setChat(prevChat => [...prevChat, newMessage]);
    }
  }, [newMessage]);
  

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = user?.email;
  
    if (text.trim() !== "") {
      const userId = user?.id;
  
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
        senderId: userId, // Usar userId aqui
      };
  
      setText("");
  
      if (text.trim() !== "") {
        setChat((prevChat) => [...prevChat, newMsg]);
      }
    }
  };

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
            <ChatMessages key={msg.id} message={msg} userId={userId} />
          ))}
        </div>
        <ChatForm onSubmit={sendData} text={text} setText={setText} />
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