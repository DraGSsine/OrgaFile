import CloudCards from '@/components/dashboard/cloudCards/CloudCards'
import Mycloud from '@/components/dashboard/main/Mycloud'
import RecentFiles from '@/components/dashboard/main/RecentFiles'
import GetUserInfoProvider from '@/providers/UserInfoProvider'
const Dashboard = () => {
  return (
    <div className='h-full grid grid-rows-16'>
        <CloudCards />
        <RecentFiles />
    </div>
  )
}

export default Dashboard