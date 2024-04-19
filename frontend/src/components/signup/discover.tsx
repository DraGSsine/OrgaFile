import React from 'react'
import { Card } from './card'

const Discover = () => {
  return (
    <div className='hidden sm:flex items-center h-screen md:flex w-[50%] lg:w-[40%] bg-primary-color rounded-2xl p-10' >
        <div className=' max-h-[80vh] flex gap-10 2xl:gap42 flex-col '>
          <h3 className=' font-bold text-white'>FLEESO</h3>
          <div className='flex flex-col justify-between gap-10'>
              <h1 className=' text-white text-2xl sm:text-[2.8rem] font-semibold leading-10 sm:leading-[3.5rem]'>Start your journey with us</h1>
              <p className=' sm:text-xl text-gray-200 font-extralight'>Discover the world&apos;s best <br/>  community offreelancers and <br/>  business owners</p>
          </div>
          <Card/>
        </div>
    </div>
  )
}

export default Discover