'use client';

import { FC, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-hot-toast';
import { updateUser } from '@/lib/user/updateUser';
import { ReviewData } from '@/components/review';

interface Company {
  name: string;
  address: string;
  reviews: ReviewData[]
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  company_name: string;
  company_address: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  company?: Company;
}

interface ProfileEditProps {
  data: User;
}

export const ProfileEdit: FC<ProfileEditProps> = ({ data }) => {
  const [ state, dispatch ] = useFormState(updateUser, data);
  const [ sync, setSync ] = useState<boolean>(!!(data?.company?.name || data?.company?.address));

  if (state.message) {
    toast.error(state.message);
  }

  const onSync = () => {
    setSync(prevState => !prevState);
  }

  return (
    <div className="flex flex-col mt-48">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="text-3xl text-center">
            { data.username }
          </h1>

          <div className="flex items-center justify-center mb-3">
            <input
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={ sync } onChange={ onSync }/>

            <label className="inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="flexSwitchCheckDefault">
              Google Sync
            </label>
          </div>

          <form action={ dispatch }>
            <input type="text" className="block border w-full p-3 rounded mb-4" name="firstname"
                   placeholder="First Name"
                   defaultValue={ data.firstname }/>

            { state?.errors?.firstname ? (
              <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-red-500">
                { state.errors.firstname.map((error: string) => (
                  <p key={ error }>{ error }</p>
                )) }
              </div>
            ) : null }

            <input type="text" className="block border w-full p-3 rounded mb-4" name="lastname"
                   placeholder="Last Name"
                   defaultValue={ data.lastname }/>

            { state?.errors?.lastname ? (
              <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-red-500">
                { state.errors.lastname.map((error: string) => (
                  <p key={ error }>{ error }</p>
                )) }
              </div>
            ) : null }

            <input type="text" className="block border w-full p-3 rounded mb-4" name="company_name"
                   placeholder="Company Name"
                   defaultValue={ data?.company?.name }
                   disabled={ !sync }/>

            { state?.errors?.company_name ? (
              <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-red-500">
                { state.errors.company_name.map((error: string) => (
                  <p key={ error }>{ error }</p>
                )) }
              </div>
            ) : null }

            <input type="text" className="block border w-full p-3 rounded mb-4" name="company_address"
                   placeholder="Company Address"
                   defaultValue={ data?.company?.address }
                   disabled={ !sync }/>

            { state?.errors?.company_address ? (
              <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-red-500">
                { state.errors.company_address.map((error: string) => (
                  <p key={ error }>{ error }</p>
                )) }
              </div>
            ) : null }

            <button
              className="w-full text-center py-3 rounded bg-color-5 text-white hover:bg-color-4 focus:outline-none my-1">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
