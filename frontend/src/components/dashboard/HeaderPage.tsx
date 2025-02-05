"use client";


export interface HeaderPageProps {
  icon: any;
  title: string;
  description: string;
}

export function HeaderPage({icon, title, description}:HeaderPageProps) {
  return (
    <div className="flex items-center gap-3 pb-2 2xl:pb-4 row-start-1 row-end-2 ">
      <div className=" p-1 2xl:p-2 rounded-lg bg-primary-100">
        {icon}
      </div>
      <div>
        <h1 className=" text-lg xl:text-xl 2xl:text-[1.5rem] font-bold capitalize">{title}</h1>
        <p className="text-default-500 capitalize">{description}</p>
      </div>
    </div>
  );
}