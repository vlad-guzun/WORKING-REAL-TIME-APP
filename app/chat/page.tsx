import {useSession} from 'next-auth/react'
import {signIn} from 'next-auth/react'
import Form from '../../components/Form'
import Chat from '@/components/Chat'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Fragment } from 'react'

async function getData(){
    const data = await prisma.message.findMany({
        select: {
            message: true,
            id: true,
            User: {
                select: {
                    name: true,
                    image: true,
                }
            }
        },
        orderBy: {
            createdAt: 'asc',
        },
        take: 100
    })
    return data
  }
export const dynamic = 'force-dynamic'
const ChatHome = async() => {

  const session = await getServerSession(authOptions)
  const data = await getData()


  if(!session){
    return <div className='flex flex-col items-center mt-[20%]'>
                <h1 className='text-red-700 font-bold'>Please, log in</h1>
                <button className='bg-teal-300 px-2 text-white mt-2'>Login</button>
            </div> 
    }

  

 
  return (
   
    <div className='h-screen flex flex-col'>
        <Chat data={data as any}/>
        <Form />
        <Fragment>
            <button className='bg-teal-300 px-2 text-white mt-2' onClick={() => signIn()}>Login</button>
        </Fragment>
    </div>
  )
}

export default ChatHome 
