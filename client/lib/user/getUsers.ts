'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetcher } from '@/utils/fetcher';

const STRAPI_URL = process.env.STRAPI_URL;

export async function getUsers() {
  const authToken = cookies().get('jwt')?.value;
  if (!authToken) return redirect('/login');

  try {
    return await fetcher(STRAPI_URL + '/api/users?populate=company,company.reviews',
      'GET',
      null,
      {
        Authorization: 'Bearer ' + authToken
      });

  } catch (error) {
    throw new Error('Failed to fetch users data.');
  }
}
