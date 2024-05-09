import AnalyticChart from '@/components/dashboard/main/AnalyticChart'
import Mycloud from '@/components/dashboard/main/Mycloud'
import RecentFiles from '@/components/dashboard/main/RecentFiles'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-4 '>
      <Mycloud />
      {/* <AnalyticChart /> */}
      <RecentFiles/>
    </div>
  )
}

export default Dashboard