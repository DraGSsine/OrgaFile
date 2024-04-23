import React from 'react'
import Image from 'next/image'
const File = () => {
  const file = {
    path: '/pdf.png',
    content: 'Basic ui design for beginer how to be one of them',
    color:"bg-[#ff000a]/20"
  }
  return (
    <div className=' hover:scale-[100.5%] transition-all ease-in cursor-pointer shadow-sm w-full flex items-center bg-white p-4 rounded-lg'>
        <div className='px-6'>
            <Image src={file.path} alt='file icon' width={40} height={40} />
        </div>
        <div className='flex justify-between flex-grow' >
          <p className='text-sm text-center capitalize font-medium'>{file.content}</p>
          <span>24 MB</span>
          <span>3 Days ago </span>
          <span className={`rounded-lg px-2 py-1 text-xs ${file.color}`}>New</span>
        </div>
    </div>
  )
}

export default File