'use server';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function login(formData: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn('credentials', { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials.' };
        default:
          return { error: 'Invalid login.' };
      }
    }

    throw error;
  }
}
