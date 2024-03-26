'use server';

import qs from 'qs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetcher } from '@/utils/fetcher';

const OUTSCRAPPER_URL = process.env.OUTSCRAPPER_URL;
const OUTSCRAPPER_TOKEN = process.env.OUTSCRAPPER_TOKEN;

export async function getReviews(name: string) {
  const authToken = cookies().get('jwt')?.value;
  if (!authToken) return redirect('/login');

  const query_obj = {
    query: name, // 'The NoMad Restaurant, NY, USA',
    fields: 'name,full_address,reviews_data',
    sort: 'newest',
    reviewsLimit: 50,
    async: false
  }

  const query = qs.stringify(query_obj);

  try {
    const data = await fetcher(`${ OUTSCRAPPER_URL }?${ query }`, 'GET', null, {
      'X-API-KEY': OUTSCRAPPER_TOKEN!
    });

    if (data.status !== 'Success') {
      console.log('Company not found');
      return;
    }

    return data.data[0];
  } catch (error) {
    throw new Error('Failed to fetch reviews data.');
  }
}
