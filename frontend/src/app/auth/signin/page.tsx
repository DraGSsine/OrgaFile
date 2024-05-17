import {SignInPage} from '@/components/signIn/signInPage'
import Discover from '@/components/signup/discover'
import React from 'react'

const Page = () => {
  return (
    <div className=' min-h-[100vh] w-[100vw] flex items-center bg-gray-200 justify-center '>
        <div className=' p-4 items-center h-[80vh] w-[80vw] md:w-[100vw] lg:w-[80vw] bg-white flex max-w-[1200px] rounded-2xl'>
            <Discover/>
            <SignInPage/>
        </div>
    </div>
  )
}

export default Page