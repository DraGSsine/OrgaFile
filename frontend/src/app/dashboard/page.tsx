import Mycloud from '@/components/dashboard/main/Mycloud'
import RecentFiles from '@/components/dashboard/main/RecentFiles'
const Dashboard = () => {
  return (
    <div className='flex h-full flex-col gap-4 '>
      <Mycloud />
      <RecentFiles/>
    </div>
  )
}

export default Dashboard