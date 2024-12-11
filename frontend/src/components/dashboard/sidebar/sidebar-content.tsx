"use client";

import { usePathname } from "next/navigation";
import { navigation } from "./navigation";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";

interface SidebarContentProps {
  isCollapsed: boolean;
  isMobile?: boolean;
  onToggleCollapse?: () => void;
}

export function SidebarContent({ 
  isCollapsed, 
  isMobile = false,
  onToggleCollapse 
}: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-[8vh] items-center justify-center xl:justify-start xl:px-4 gap-2">
        <Logo isCollapsed={isCollapsed} />
      </div>
      <nav className="flex-1 space-y-2 px-2">
        {navigation.map((item) => (
          <NavItem
            key={item.name}
            href={item.href}
            name={item.name}
            icon={item.icon}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </div>
  );
}