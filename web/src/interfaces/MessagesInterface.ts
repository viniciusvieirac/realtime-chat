export interface IMsgDataTypes {
  content: string;
  imageUrl?: string;
  createdAt?: String;
  email?: string;
}
export interface Sender {
  name: string;
}
export interface IMsgData {
  content: string;
  createdAt?: string;
  imageUrl?: string;
  id?: number;
  sender: Sender;
}