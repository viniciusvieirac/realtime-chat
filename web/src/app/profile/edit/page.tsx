'use client';
import { updateUser } from '@/app/utils/AxiosFunctions';
import { TextField } from '@mui/material';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useRouter } from "next/navigation";


export default function EditProfile() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      console.log(imageUrl);
      setSelectedImage(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if(token){
       await updateUser(token, { description, imageUrl: selectedImage?.toString() });
    }
    alert('Perfil atualizado com sucesso!');
    router.push('/profile');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white text-slate-900 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Perfil</h1>
        {selectedImage && (
          <div className="mb-4 text-center">
            <Image
              src={selectedImage}
              alt="Imagem do perfil"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full mx-auto mb-2"
            />
          </div>
        )}
        <div className="mb-4">
          <TextField
            id="filled-basic"
            label="Adicione uma descrição"
            variant="filled"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-semibold mb-1">Imagem de Perfil</label>
          <input
            type="file"
            id="image"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
