
import FolderCards from '@/components/dashboard/FolderCards/FolderCards'
import RecentFiles from '@/components/dashboard/main/RecentFiles'
const Dashboard = () => {
  return (
    <div className='h-full grid grid-rows-24 gap-4'>
        <FolderCards />
        <RecentFiles />
    </div>
  )
}

export default Dashboard