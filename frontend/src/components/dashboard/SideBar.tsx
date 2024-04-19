"use client"
import React, { useState } from 'react';
import { DashboardIcon, DeleteIcon, DocTifyLogo, FolderIcon, LogOut, SettingsIcon, StarIcon } from '../../../public/icons';
import { Button } from '@nextui-org/button';

const SideBar = () => {
   const [activeItem, setActiveItem] = useState<string>('dashboard');
   const [animation, setAnimation] = useState<string>('-top-[11px]');

   const handleItemClick = (item: string) => {
      setActiveItem(item);
      if (item === 'dashboard') setAnimation('-top-[11px]');
      else if (item === 'privateFiles') setAnimation('top-[67px]');
      else if (item === 'favorite') setAnimation('top-[140px]');
      else if (item === 'trash') setAnimation('top-[214px]');
      else if (item === 'settings') setAnimation('top-[288px]');
   }

   const Components = [
      { name: "dashboard", component: <DashboardIcon width={35} height={35} outline={activeItem === "dashboard" ? false : true} className={"transition-colors duration-300"} /> },
      { name: "privateFiles", component: <FolderIcon width={35} height={35} outline={activeItem === "privateFiles" ? false : true} className={"transition-colors duration-300"} /> },
      { name: "favorite", component: <StarIcon width={35} height={35} outline={activeItem === "favorite" ? false : true} className={"transition-colors duration-300"} /> },
      { name: "trash", component: <DeleteIcon width={35} height={35} outline={activeItem === "trash" ? false : true} className={"transition-colors duration-300"} /> },
      { name: "settings", component: <SettingsIcon width={35} height={35} outline={activeItem === "settings" ? false : true} className={"transition-colors duration-300"} /> }
   ]

   return (
      <div className='border-r pr-5 h-screen flex flex-col'>
         <div>
            <DocTifyLogo />
         </div>
         <div className='w-[12vw] py-8 flex flex-col h-auto justify-between flex-grow'>
            <div className='gap-10 flex flex-col relative'>
               {Components.map((Component, index) => (
                  <div
                     key={index}
                     className={`flex gap-4 items-center cursor-pointer`}
                     onClick={() => handleItemClick(Component.name)}
                  >
                     {Component.component}
                     <span className={`font-semibold text-[1.1rem] ${activeItem === Component.name ? 'text-black transition-all duration-1000 ' : 'text-primary-text-color'}`}>
                        {Component.name}
                     </span>
                  </div>
               ))}
               <div
                  className={`${animation} transition-all ease-in-out -right-5 absolute h-[60px] w-[6px] rounded-l-full bg-black`}
               ></div>
            </div>
            <div className='space-y-10'>
               <div className='bg-primary flex flex-col justify-between p-4 rounded-lg gap-2'>
                  <h1 className='text-lg text-white font-semibold'>Go To Premium</h1>
                  <p className='text-sm text-white'>Get full speed and additional storage, as well as various exclusive features</p>
                  <Button radius='sm' variant='flat' className='text-lg font-semibold p-6 bg-black text-white'>
                     Upgrade
                  </Button>
               </div>
               <Button radius='sm' variant='light' className='text-black text-lg font-semibold flex justify-between'>
                  <LogOut width={30} height={30} />
                  Log Out
               </Button>
            </div>
         </div>
      </div>
   );
}

export default SideBar;