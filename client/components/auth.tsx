'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth/login';
import { register } from '@/lib/auth/register';

interface AuthProps {
  mode: boolean;
}

// mode === true => Sign Up
export const Auth: FC<AuthProps> = ({ mode }) => {
  const router = useRouter();
  const action = mode ? register : login;
  const [ state, dispatch ] = useFormState(action, {});

  return (
    <div className="flex flex-col mt-48">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">
            { mode ? 'Sign Up' : 'Sign In' }
          </h1>

          <form action={ dispatch }>
            { mode
              ? (
                <>
                  <input type="text" className="block border w-full p-3 rounded mb-4" name="email" placeholder="Email"/>

                  { state?.errors?.email ? (
                    <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-red-500">
                      { state.errors.email.map((error: string) => (
                        <p key={ error }>{ error }</p>
                      )) }
                    </div>
                  ) : null }

                  <input type="text" className="block border w-full p-3 rounded mb-4" name="username"
                         placeholder="Username"/>

                  { state?.errors?.username ? (
                    <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-red-500">
                      { state.errors.username.map((error: string) => (
                        <p key={ error }>{ error }</p>
                      )) }
                    </div>
                  ) : null }
                </>
              )
              : (
                <>
                  <input type="text" className="block border w-full p-3 rounded mb-4" name="identifier"
                         placeholder="Email"/>

                  { state?.errors?.identifier ? (
                    <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-red-500">
                      { state.errors.identifier.map((error: string) => (
                        <p key={ error }>{ error }</p>
                      )) }
                    </div>
                  ) : null }
                </>
              )
            }

            <input type="password" className="block border w-full p-3 rounded mb-4" name="password"
                   placeholder="Password"/>

            { state?.errors?.password ? (
              <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-red-500">
                { state.errors.password.map((error: string) => (
                  <p key={ error }>{ error }</p>
                )) }
              </div>
            ) : null }

            <button
              className="w-full text-center py-3 rounded bg-color-5 text-white hover:bg-color-4 focus:outline-none my-1">
              { mode ? 'Sign Up' : 'Sign In' }
            </button>
          </form>

          { state?.message ? (
            <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-red-500">
              <p>{ state.message }</p>
            </div>
          ) : null }

          <div className="text-color-6 mt-6 text-center">
            <span>Already have an account?&nbsp;</span>

            <button className="text-color-5" onClick={ () => {
              mode
                ? router.push('/login')
                : router.push('/register');
            } }>
              { mode ? 'Sign In.' : 'Sign Up.' }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
