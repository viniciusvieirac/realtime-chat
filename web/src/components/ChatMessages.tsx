import Image from "next/image";
import { IMsgData } from "@/interfaces/MessagesInterface";
import { formatarHorarioISO8601 } from "../app/utils/formattedHours";

interface ChatMessageProps {
  message: IMsgData;
  userId: string | undefined;
}

const ChatMessages: React.FC<ChatMessageProps> = ({ message, userId }) => {
  const isUserMessage = message.senderId === Number(userId);
  const messageContainerClasses = `p-3 rounded-lg text-black text-sm ${isUserMessage ? "bg-blue-500 text-white ml-auto" : "bg-gray-300"}`;

  return (
    <div className={`flex items-start mb-3 ${isUserMessage ? "justify-end" : ""}`}>
      <div>
        {!isUserMessage && (
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <Image
              src={message.sender?.imageUrl || "/images/avatar.png"}
              alt="Profile Image"
              width={32}
              height={32}
            />
          </div>
        )}
      </div>
      <div className={`${messageContainerClasses} ${isUserMessage ? "ml-auto" : ""}`}>
        <h4 className="m-0 text-lg font-bold">{message.sender?.name}</h4>
        <p className={`m-0 ${isUserMessage ? "text-white" : "text-black"}`}>{message.content}</p>
        <div className="text-xs text-gray-600">
          <span>{formatarHorarioISO8601(message.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;