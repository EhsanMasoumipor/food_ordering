"use client";
import Image from 'next/image';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const session = useSession();
    const [userName , setUserName] = useState('')
    const {status} = session

    useEffect(() => {
        if(status === 'authenticated'){
            setUserName(session.data.user.name)
        }
    } , [session , status])

    if(status === 'loading') {
        return 'Loading...';
    }
    async function handleProfileInfoUpdate (ev) {
        ev.preventDefault();
        const response = await fetch('/api/profile'  ,{
            method : "PUT",
            headers : {
                'Content-type' : "application/json"
            },
            body : JSON.stringify({ name : userName})
        })
    }

    if(status === 'unauthenticated'){
        return redirect('/login')
    }
    const userImage = session.data.user.image

    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-semibold my-4">Profile</h1>
            <div className="max-w-md mx-auto ">
                <div className='flex gap-2 items-center'>
                    <div>
                        <div>
                            <Image className='rounded-lg' src={userImage} width={80} height={80} alt='avatar' />
                            <button>Edit</button>
                       </div>
                    </div>
                    <form className='grow' onSubmit={handleProfileInfoUpdate}>
                        <input type='text' placeholder='First and last name' value={userName} onChange={ev => setUserName(ev.target.value)}  />
                        <input type='email' disabled value={session.data.user.email} />
                        <button type='submit'>save</button>
                    </form>
                </div>
            </div>
        </section>
    )
}