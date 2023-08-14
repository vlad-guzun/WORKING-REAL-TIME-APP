
export default function Home() {
  return (
    <div>
      <div className='flex flex-col items-center justify-center border p-7 mt-20'>
        <h1 className='font-bold'>You must be <span className='text-pink-800 hover:text-pink-700 transition-all'>logged in</span></h1>
        <button className='px-2 py-1 bg-pink-800 hover:bg-pink-700 transition-all text-white mt-3'>Login</button>
      </div>
    </div>
  )
}
