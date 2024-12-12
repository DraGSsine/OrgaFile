import CloudCards from '@/components/dashboard/cloudCards/CloudCards'
import Mycloud from '@/components/dashboard/main/Mycloud'
import RecentFiles from '@/components/dashboard/main/RecentFiles'
const Dashboard = () => {
  return (
    <div className='flex h-full flex-col'>
      <CloudCards/>
      <RecentFiles/>
    </div>
  )
}

export default Dashboard