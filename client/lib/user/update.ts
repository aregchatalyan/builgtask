'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  company_name: z.string().min(2).max(50),
  company_address: z.string().min(2).max(100)
});

export const update = async (prevState: any, formData: any) => {
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

  const headers = {
    Authorization: 'Bearer ' + authToken,
    'Content-Type': 'application/json'
  }

  const users_url = `${ STRAPI_URL }/api/users`;
  const companies_url = `${ STRAPI_URL }/api/companies`;

  try {
    let company_id;

    if (prevState.company) {
      await fetch(companies_url + `/${ prevState.company.id }`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          data: {
            name: company_name,
            address: company_address
          }
        }),
        cache: 'no-cache'
      });
    } else {
      if (company_name && company_address) {
        const response = await fetch(companies_url, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            data: {
              name: company_name,
              address: company_address,
              users_permissions_user: {
                connect: [ { id: prevState.id } ]
              }
            }
          }),
          cache: 'no-cache'
        });

        company_id = (await response.json()).data.id;
      }
    }

    const response: any = await fetch(users_url + `/${ prevState.id }`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        ...(company_id
          ? {
            firstname, lastname,
            company: { connect: [ { id: company_id } ] }
          }
          : { firstname, lastname })
      }),
      cache: 'no-cache'
    });

    const data = await response.json();
    if (!response.ok && data.error) return { ...prevState, message: data.error.message, errors: null }
  } catch (error) {
    console.log(error);
    return { error: 'Server error please try again later.' };
  }
  redirect('/dashboard');
}
