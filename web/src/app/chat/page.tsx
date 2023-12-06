"use client";

import ChatForm from "@/components/ChatForm";
import ChatMessages from "@/components/ChatMessages";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthContext from "@/context/auth/AuthContext";
import { IMsgData, IMsgDataTypes } from "@/interfaces/MessagesInterface";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://desafio-play-for-a-cause-production.up.railway.app/");

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
        senderId: userId,
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
            <Button variant="contained" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleLogout}>Logout</Button>
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