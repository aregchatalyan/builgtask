'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetcher } from '@/utils/fetcher';

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email().min(2).max(50),
  password: z.string().min(6).max(100)
});

export async function register(prevState: any, formData: any) {
  const STRAPI_URL = process.env.STRAPI_URL;
  if (!STRAPI_URL) throw new Error('Missing STRAPI_URL environment variable.');

  const url = `${ STRAPI_URL }/api/auth/local/register`;

  const validatedFields = formSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Login.'
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    const data = await fetcher(url,
      'POST',
      { username, email, password }
    );

    if (data.error) return { ...prevState, message: data.error.message, errors: null };
    if (data.jwt) cookies().set('jwt', data.jwt);
  } catch (error) {
    console.log(error);
    return { error: 'Server error please try again later.' };
  }
  redirect('/profile');
}
