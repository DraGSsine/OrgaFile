
import FolderCards from '@/components/dashboard/FolderCards/FolderCards'
import RecentFiles from '@/components/dashboard/main/RecentFiles'
const Dashboard = () => {
  return (
    <div className='h-full grid grid-rows-16'>
        <FolderCards />
        <RecentFiles />
    </div>
  )
}

export default Dashboard