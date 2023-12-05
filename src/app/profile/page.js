"use client";
import Image from 'next/image';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast'

export default function ProfilePage() {


    const session = useSession();
    console.log({session})
    const [userName , setUserName] = useState('')
    const [saved , setSaved]  = useState(false)
    const [isSaving , setIsSaving] = useState(false)
    const [phone , setPhone] = useState('')
    const [streetAddress , setStreetAddress] = useState('')
    const [postalCode , setPostalCode] = useState('')
    const [city , setCity] = useState('')
    const [country , setCountry] = useState('')
    const {status} = session


    useEffect(() => {
        if(status === 'authenticated'){
            setUserName(session.data.user.name)
            const response = fetch('/api/profile').then(response => response.json().then(data => {
                setPhone(data.phone);
                setCity(data.city)
                setCountry(data.country)
                setStreetAddress(data.streetAddress)
                setPostalCode(data.postalCode)
            }))
            
        }
    } , [session , status])

    
    async function handleProfileInfoUpdate (ev) {
        ev.preventDefault();
        setSaved(false)
        setIsSaving(true)
        const response = await fetch('/api/profile'  ,{
            method : "PUT",
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify({
                 name : userName,
                 streetAddress,
                 phone,
                 postalCode,
                 city,
                 country
                })
        })
        setIsSaving(false)
        if(response.ok) {
            toast.success('Profile saved!')
        }
    }
    
    async function handleFileChange (ev) {
        const files = ev.target.files;
        if(files?.length === 1){
            const data = new FormData;
            data.set('files' , files[0]);
            await fetch('/api/upload' , {
                method : "POST",
                body : data,
            })
            toast.success('Upload Compete')
        }
    }
    

    if(status === 'loading') {
        return 'Loading...';
    }


    if(status === 'unauthenticated'){
        return redirect('/login')
    }


    const userImage = session.data.user.image

    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-semibold my-4">Profile</h1>
            <div className="max-w-md mx-auto ">
                {saved && (
                  <h2 className='text-center bg-green-100 rounded-lg border-2 border-green-300 p-4 my-4'>
                    Profile saved!
                  </h2>
                )}
                <div className='flex gap-4'>
                    <div>
                        <div>
                            <Image  className='rounded-lg mb-4' src={userImage} width={80} height={80} alt='avatar' />
                            <label>
                               <input type='file' className='hidden' onChange={handleFileChange} />
                               <span className='border border-gray-300 cursor-pointer rounded-lg p-2 mt-3 text-center'>Edit</span>
                            </label>
                       </div>
                    </div>
                    <form className='flex flex-col items-center gap-[7px]' onSubmit={handleProfileInfoUpdate}>
                        <input type='text' placeholder='First and last name' value={userName} onChange={ev => setUserName(ev.target.value)}  />
                        <input type='email' disabled value={session.data.user.email} />
                        <input value={phone} onChange={ev => setPhone(ev.target.value)} type='tel' placeholder='Phone Number'/>
                        <input value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} type='text' placeholder='Street Address'/>
                        <div className='flex gap-4 items-center'>
                          <input value={postalCode} onChange={ev => setPostalCode(ev.target.value)} type='text' placeholder='Postal code'/>
                          <input value={city} onChange={ev => setCity(ev.target.value)} type='text' placeholder='city'/>
                        </div>
                        <input value={country} onChange={ev => setCountry(ev.target.value)} type='text' placeholder='Country'/>
                        <button type='submit'>{isSaving ? "Saving..." :  "save"}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}


