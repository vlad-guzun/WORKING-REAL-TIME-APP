'use client'

import { postData } from "@/app/action"
import { useRef } from "react"
import {HTMLFormElement} from 'react'

const Form = () => {
    const formRef = useRef<HTMLFormElement>(null)
  return (
    <form action={async(formData) => {
        await postData(formData)
        formRef.current?.reset()
    }} className='flex flex-wrap gap-4 p-0.5 fixed bottom-6 left-0 w-full border-b border-gray-300 mb-4'>
      <input 
        name='message'
        placeholder='Type and send..'
        className='flex-grow py-2 px-4 outline-none w-full sm:w-auto hover:text-teal-400'
      />
      <button className='px-4 bg-teal-400 hover:bg-teal-500 text-white transition-all'>send</button>
    </form>
  )
}

export default Form;
