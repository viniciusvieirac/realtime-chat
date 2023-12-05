import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

interface ChatFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit, text, setText }) => {
  return (
    <div className="mt-4 w-[80%] max-w-lg">
      <form onSubmit={onSubmit} className="flex">
        <TextField
          className="bg-slate-100 flex-grow"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="filled-basic"
          label="Envie sua mensagem"
          variant="filled"
        />
        <Button variant="contained" endIcon={<SendIcon />} type="submit">Enviar</Button>
      </form>
    </div>
  );
};

export default ChatForm;
