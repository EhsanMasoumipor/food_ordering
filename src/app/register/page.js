'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [userCreated , setUserCreated] = useState(false);
    const [creatingUser , setCreatingUser ] = useState(false)
    const [error , setError] = useState(false)

   async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
      setUserCreated(true);
    }
    else {
      setError(true);
    }
    setCreatingUser(false);
  }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl my-10">Register</h1>
            {userCreated && (
                <div className='my-4 text-center text-gray-700'>Register Successfully . new you can 
                <Link href='/login'>Login</Link>
                </div>
            )}
            {error && (
                <div className='my-4 text-center'>Error . <br />
                Please try again later
                </div>
            )}
            <form onSubmit={handleFormSubmit} className="block max-w-xs mx-auto ">
                <input  type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={creatingUser}/>
                <input type="password" placeholder="password" value={password} onChange={ev  => setPassword(ev.target.value)} disabled={creatingUser} />
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">or login with provider
                </div>
                <button className='flex gap-4 justify-center items-center'>
                    <Image src={'/google.png'} alt={'google'} width={24} height={24} />
                    Login with Google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                  Existing account?{' '}
                 <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
         
        </section>
    )
}