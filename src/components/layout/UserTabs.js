'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
export default function UserTabs({isAdmin}) {
    const path = usePathname();
    return (
        <div className='flex mx-auto tabs justify-center gap-2'>
                <Link  className={path === '/profile' ? "active"  : ""} href={'/profile'}>Profile</Link >
                {isAdmin && (
                 <>
                    <Link className={path === '/categories' ? "active"  : ""}   href={'/categories'}>Categories</Link >
                    <Link className={path === '/menu-items' ? "active"  : ""}  href={'/menu-items'}>Menu Items</Link >
                    <Link className={path === '/users' ? "active"  : ""}  href={'/users'}>users</Link >
                 </>
                 )}
        </div>
    )
}