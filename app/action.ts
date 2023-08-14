'use server'

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"

export async function postData(formData: FormData){
    'use server'
    const Pusher = require('pusher')
    const message = formData.get('message')
    const session = await getServerSession(authOptions)
    const data = await prisma.message.create({
    
        data: {
            message: message as string,
            email: session?.user?.email as string
        },
        include: {
            User: {
                select: {
                    name: true,
                    image: true,
                }
            }
        }
    })
    const pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.NEXT_PUBLIC_PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: 'eu',
        useTLS: true,
    })
    await pusher.trigger('chat','channel', {
        message: `${JSON.stringify(data)}\n\n`,
    })
}