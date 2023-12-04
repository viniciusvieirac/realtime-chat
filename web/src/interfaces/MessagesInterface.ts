interface IMsgDataTypes {
  content: string;
  imageUrl?: string;
  createdAt?: String;
  email?: string;
}

interface Sender {
  name: string;
}

interface IMsgData {
  content: string;
  createdAt?: string;
  imageUrl?: string;
  id?: number;
  sender: Sender;
}