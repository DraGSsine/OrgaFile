import {DashboardSquare01Icon, File01Icon,Folder01Icon, Delete02Icon, Settings01Icon} from "hugeicons-react"

export const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: DashboardSquare01Icon,
  },
  {
    name: "Files",
    href: "/dashboard/files",
    icon: File01Icon,
  },
  {
    name: "Repository",
    href: "/dashboard/repository",
    icon: Folder01Icon,
  },
  {
    name: "Trash",
    href: "/dashboard/trash",
    icon: Delete02Icon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings01Icon,
  },
] as const;