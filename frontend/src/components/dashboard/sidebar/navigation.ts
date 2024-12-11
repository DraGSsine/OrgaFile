import {DashboardSquare01Icon, Files01Icon,Folder01Icon, Delete01Icon, Settings01Icon} from "hugeicons-react"

export const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: DashboardSquare01Icon,
  },
  {
    name: "Files",
    href: "/dashboard/files",
    icon: Files01Icon,
  },
  {
    name: "Repository",
    href: "/dashboard/repository",
    icon: Folder01Icon,
  },
  {
    name: "Trash",
    href: "/dashboard/trash",
    icon: Delete01Icon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings01Icon,
  },
] as const;