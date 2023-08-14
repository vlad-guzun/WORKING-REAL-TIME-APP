'use client'

import {FiGithub} from 'react-icons/fi'
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import {signIn,signOut} from 'next-auth/react'


const Navbar = () => {

    const {data: session} = useSession() 

  return (
    <nav className='flex p-3 bg-gray-400 shadow-sm items-center text-white justify-between'>
        <div className='flex items-center'>
            <FiGithub />
            <h1>/vlad-guzun</h1>
        </div>
        {session && session.user?.email ? (
            <div>
                <Image  className='rounded-full'
                        alt='profile_pic'
                        height={50}
                        width={50}
                        src={session.user.image as string}
                />
                <h1>{session.user.name}</h1>
                <button 
                        onClick={() => {signOut()}}
                        className={'p-1 bg-teal-400'}
                
                >Logout</button>
            </div>
        ) : <button 
                    onClick={() => {signIn()}}
                    className={'px-2 bg-teal-400 hover:bg-teal-500 transition-all'}>
                        Login
                    </button>}
    </nav>
  )
}

export default Navbar