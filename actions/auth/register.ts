'use server';

import { RegisterSchema } from '@/schemas';
import { z } from 'zod';

export async function register(formData: z.infer<typeof RegisterSchema>) {
  console.log(formData);
}
