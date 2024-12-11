import ManageBilling from '@/components/dashboard/settings/ManageBilling'
import React from 'react'

const Page = () => {
  return (
    <div>
      <h1 className=" font-medium text-2xl pl-2 pb-6 "> Settings </h1>
      <div className="h-[84.3vh] w-full bg-white relative rounded-t-lg p-10  shadow-small">
        <ManageBilling />
      </div>
    </div>
  )
}

export default Page