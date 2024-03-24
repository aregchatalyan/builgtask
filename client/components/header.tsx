import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { logout } from '@/lib/auth/logout';

export const Header = () => {
  const token = cookies().get('jwt')?.value;

  return (
    <header className="flex h-24 w-full items-center justify-between bg-white px-16 sm:px-12">
      <Link href={ !token ? '/' : '/dashboard'}>
        <Image src="/logo.svg" alt="logo" width={ 184 } height={ 40 } priority/>
      </Link>

      <nav className="flex gap-4">
        { token
          ? (
            <>
              <Link href="/profile" className="flex h-12 w-12 items-center justify-center rounded-full bg-color-1">
                <Image src="user.svg" alt="user" width={ 24 } height={ 24 }/>
              </Link>

              <form action={ async () => {
                'use server';
                await logout();
              } }>
                <button
                  className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                  <div>Sign Out</div>
                </button>
              </form>
            </>
          )
          : (
            <>
              <Link href="/login" className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                Sign In
              </Link>
              <Link href="/register" className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                Sign Up
              </Link>
            </>
          )
        }
      </nav>
    </header>
  );
}
