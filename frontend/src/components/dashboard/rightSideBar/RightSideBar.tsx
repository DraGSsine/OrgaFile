import React from 'react';
import { StorageUsage } from './StorageUsage';
import { CreditstUsage } from './ReqesutUsage';
import UserOverview from './UserOverview';
import { HelpCircleIcon } from 'hugeicons-react';

const RightSidebar = () => {
  return (
    <aside className="hidden col-start-15 col-end-17 border-l border-gray-200 dark:border-gray-800 xl:flex flex-col bg-white dark:bg-gray-900">
      {/* User Profile Section */}
      <div className=" h-[8%] border-b border-gray-200 dark:border-gray-800 dark:bg-gray-950">
        <UserOverview />
      </div>

      {/* Usage Stats Section */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Usage Overview</h2>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
        
        <div className="space-y-6">
          <StorageUsage />
          <CreditstUsage />
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
        <a 
          href="#support" 
          className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
        >
          <HelpCircleIcon className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
          <span>Visit our support center</span>
        </a>
      </div>
    </aside>
  );
};

export default RightSidebar;