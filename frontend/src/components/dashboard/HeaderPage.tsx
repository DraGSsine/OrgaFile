"use client";


export interface HeaderPageProps {
  icon: any;
  title: string;
  description: string;
}

export function HeaderPage({icon, title, description}:HeaderPageProps) {
  return (
    <div className="flex items-center gap-3 pb-4">
      <div className="p-2 rounded-lg bg-primary-100">
        {icon}
      </div>
      <div>
        <h1 className="text-3xl font-bold capitalize">{title}</h1>
        <p className="text-default-500 capitalize">{description}</p>
      </div>
    </div>
  );
}