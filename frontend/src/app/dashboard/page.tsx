import CloudCards from '@/components/dashboard/cloudCards/CloudCards'
import RecentFiles from '@/components/dashboard/main/RecentFiles'
const Dashboard = () => {
  return (
    <div className='h-full grid grid-rows-16'>
        <CloudCards />
        <RecentFiles />
    </div>
  )
}

export default Dashboard