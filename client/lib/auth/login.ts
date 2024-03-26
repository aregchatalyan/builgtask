'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetcher } from '@/utils/fetcher';

const formSchema = z.object({
  identifier: z.string().min(2).max(50),
  password: z.string().min(6).max(100)
});

export const login = async (prevState: any, formData: any) => {
  const STRAPI_URL = process.env.STRAPI_URL;
  if (!STRAPI_URL) throw new Error('Missing STRAPI_URL environment variable.');

  const url = `${ STRAPI_URL }/api/auth/local`;

  const validatedFields = formSchema.safeParse({
    identifier: formData.get('identifier'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Login.'
    };
  }

  const { identifier, password } = validatedFields.data;

  try {
    const data = await fetcher(url,
      'POST',
      { identifier, password }
    );

    if (data.error) return { ...prevState, message: data.error.message, errors: null };
    if (data.jwt) cookies().set('jwt', data.jwt);
  } catch (error) {
    console.log(error);
    return { error: 'Server error please try again later.' };
  }
  redirect('/profile');
}
