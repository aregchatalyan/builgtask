'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetcher } from '@/utils/fetcher';
import { getReviews } from '@/lib/review/getReviews';

const formSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  company_name: z.string().min(2).max(50),
  company_address: z.string().min(2).max(100)
});

export const updateUser = async (prevState: any, formData: any) => {
  const authToken = cookies().get('jwt')?.value;
  if (!authToken) return redirect('/login');

  const STRAPI_URL = process.env.STRAPI_URL;
  if (!STRAPI_URL) throw new Error('Missing STRAPI_URL environment variable.');

  const validatedFields = formSchema.safeParse({
    firstname: formData.get('firstname'),
    lastname: formData.get('lastname'),
    company_name: formData.get('company_name'),
    company_address: formData.get('company_address')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update user.'
    }
  }

  const { firstname, lastname, company_name, company_address } = validatedFields.data;

  const users_url = `${ STRAPI_URL }/api/users`;
  const companies_url = `${ STRAPI_URL }/api/companies`;
  const reviews_url = `${ STRAPI_URL }/api/reviews`;

  try {
    let company_id;

    if (prevState.company) {
      await fetcher(companies_url + `/${ prevState.company.id }`, 'PUT', {
        data: {
          name: company_name,
          address: company_address
        }
      }, {
        Authorization: 'Bearer ' + authToken
      });
    } else {
      const { name, full_address, reviews_data } = await getReviews(company_name);

      if (name && full_address) {
        const new_company = await fetcher(companies_url, 'POST', {
          data: {
            name: name,
            address: full_address,
            users_permissions_user: {
              connect: [ { id: prevState.id } ]
            }
          }
        }, {
          Authorization: 'Bearer ' + authToken
        });

        company_id = new_company.data.id;

        for await (const {
          author_id,
          author_title,
          author_image,
          review_text,
          review_rating,
          review_timestamp
        } of reviews_data) {
          await fetcher(reviews_url, 'POST', {
            data: {
              author_id,
              author_title,
              author_image,
              review_text,
              review_rating,
              review_timestamp,
              company: {
                connect: [ { id: company_id } ]
              }
            }
          }, {
            Authorization: 'Bearer ' + authToken
          });
        }
      }
    }

    const user_payload = !company_id
      ? { firstname, lastname }
      : {
        firstname, lastname,
        company: { connect: [ { id: company_id } ] }
      }

    const user = await fetcher(users_url + `/${ prevState.id }`, 'PUT', {
      ...user_payload
    }, {
      Authorization: 'Bearer ' + authToken
    });

    if (user.error) return { ...prevState, message: user.error.message, errors: null }
  } catch (error) {
    console.log(error);
    return { error: 'Server error please try again later.' };
  }
  redirect('/dashboard');
}
