"use client"
import Image from 'next/image';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

export default function ProfilePage() {
    const section = useSession()
    const {status} = section

    if(status === 'loading') {
        return 'Loading...';
    }

    if(status === 'unauthenticated'){
        return redirect('/login')
    }
    const userImage = section.data.user.image
    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-semibold my-4">Profile</h1>
            <form className="max-w-md mx-auto ">
                <div className='flex gap-2 items-center'>
                    <div>
                        <div>
                            <Image className='rounded-lg' src={userImage} width={80} height={80} alt='avatar' />
                            <button>Edit</button>
                       </div>
                    </div>
                    <div className='grow'>
                        <input type='text' placeholder='First and last name' />
                        <button type='submit'>save</button>
                    </div>
                </div>
            </form>
        </section>
    )
}