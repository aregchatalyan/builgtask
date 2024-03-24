'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const STRAPI_URL = process.env.STRAPI_URL;

export async function fetchMe() {
  const authToken = cookies().get('jwt')?.value;
  if (!authToken) return redirect('/login');

  try {
    const response = await fetch(STRAPI_URL + '/api/users/me?populate=*', {
      headers: {
        Authorization: 'Bearer ' + authToken
      },
      cache: 'no-store'
    });

    return await response.json();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}
