"use client";
import Mycloud from '@/components/dashboard/main/Mycloud'
import RecentFiles from '@/components/dashboard/main/RecentFiles'
import { Button } from '@nextui-org/button';
import axios from 'axios';
import React, { use } from 'react'
import Cookie from 'js-cookie'
import {useRouter} from "next/navigation"
const Dashboard = () => {
  const router = useRouter()
  const handleSubs = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/create-checkout-session`,{
        plan:"Basic",
        price:"19",
        user_id:"664b8461c7430fdd838c240f"
      },{headers:{
        Authorization:`Bearer ${Cookie.get('token')}`
      }})
      router.push(res.data.url)
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='flex flex-col gap-4 '>
      <Button variant='solid' color='primary' onClick={()=>handleSubs()} >Subscribe</Button>
      <Mycloud />
      {/* <AnalyticChart /> */}
      <RecentFiles/>
    </div>
  )
}

export default Dashboard