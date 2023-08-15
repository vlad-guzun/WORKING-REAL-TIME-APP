'use client'

import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import Link from "next/link"


export default function Home() {

  const {data: session} = useSession()
  
  return (
    <div className='flex items-center justify-center md:mt-32 mt-24'>
      {session && session.user? (
        <Link className='font-bold text-white bg-teal-500 p-2 hover:bg-teal-600 transition-all' href='/chat'>Click me to chat</Link>
        ) : (
          <div>
            <button className='px-2 bg-teal-500 hover:bg-teal-600 text-white font-bold' onClick={() => signIn()}>Login</button>
        </div>
      )}
    </div>
  )
}
