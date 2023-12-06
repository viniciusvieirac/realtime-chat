import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(3).nonempty('Por favor, insira um nome de usuário válido'),
  email: z.string().email('Por favor, insira um email válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});