'use server';

import { getUserByEmail } from '@/data/user';
import prisma from '@/lib/db';
import { RegisterSchema } from '@/schemas';
import bcryt from 'bcryptjs';
import { z } from 'zod';

export async function register(formData: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(formData);
  console.log(validatedFields);
  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcryt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: 'Email already in use.' };
  }

  await prisma.user.create({ data: { name, email, password: hashedPassword } });

  // TODO: Send verification token email.

  return { success: 'User created!' };
}
