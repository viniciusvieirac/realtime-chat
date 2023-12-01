'use client';
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    
    const isUserAuthenticated = localStorage.getItem('token');

    if (!isUserAuthenticated) {
      alert('You must be logged in to access this page');
      router.push('/');
    }
  }, []);

  return <>{children}</>;
}