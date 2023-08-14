'use client'
import Image from "next/image"
import { useState } from "react"
import Pusher from 'pusher-js'
import { useRef,useEffect } from "react"

interface Props {
    data: {
        User: {
            image: string | null,
            name: string | null,
        },
        message: string,
    }[],
}

const Chat = ({data}: Props) => {
 
  const end = useRef<HTMLInputElement>(null)

  const [comments, setComments] = useState(data)  
  //inlocuieste aici ala din chat
 
  useEffect(() => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string , {
        cluster: 'eu',
      })
    
      var channel = pusher.subscribe('chat')
      channel.bind('channel', function(data: any){
        const parsedComment = JSON.parse(data.message)
        setComments((prev) => [...prev,parsedComment])
      })

      return () => {
        pusher.unsubscribe('chat')
      }
  },[]) 

  const scrollBottom = () => {
    end.current?.scrollIntoView({behavior: 'smooth'})
  }
  useEffect(() => {
    scrollBottom()
  },[comments])

  return (
    <div className='flex-grow p-5 max-h-screen overflow-y-auto py-32'>
        {comments.map((comment,idx) => (
            <div key={idx}>
                <div className='flex items-center mt-5'>
                    <div>
                        <Image 
                                src={comment.User.image as string}
                                alt='profile_pic_user'
                                className='w-12 h-12 object-cover rounded-lg mr-3'
                                width={50}
                                height={50}
                        />
                        <p className='text-gray-400 text-[9px] mt-1'>{comment.User.name}</p>
                    </div>
                    <h4 className='shadow-md self-start p-3'>{comment.message}</h4>
                </div>
            </div>
        ))}
        <div ref={end}></div>
    </div>
  )
}

export default Chat