'use client';
import { Button } from '@mui/material';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState('John Doe');
  const [description, setDescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  const [image, setImage] = useState('/placeholder-image.jpg'); // Defina a URL da imagem do perfil aqui
  const [previewImage, setPreviewImage] = useState(null);

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white text-slate-900 rounded-lg shadow-lg p-6">
        <div className="mb-4 text-center">
          <Image
            src={image}
            alt="Imagem do perfil"
            width={128}
            height={128}
            className="rounded-full mx-auto mb-2"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">{name}</h1>
        <p className="text-sm mb-4">{description}</p>
        <Button
          variant="contained"
          color="primary"
          className="w-full mb-4 bg-black"
          onClick={handleEditProfile}
        >
          Editar Perfil
        </Button>
      </div>
    </div>
  );
}
