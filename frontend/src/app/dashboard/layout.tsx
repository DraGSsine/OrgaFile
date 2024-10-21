import NavBar from "@/components/dashboard/NavBar";
import { RightSideBar } from "@/components/dashboard/rightSideBar/RightSideBar";
import SideBar from "@/components/dashboard/SideBar";
import LogOutModal from "@/components/LogOutModal";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" mx-auto flex">
      <SideBar />
      <div className="flex flex-grow h-screen flex-col">
        <NavBar />
        <main className=" flex-grow scrollbar-webkit scrollbar-thin bg-gray-50 px-10 pt-10 max-h-screen overflow-y-scroll  ">
          {children}
        </main>
      </div>
      <RightSideBar />
      <LogOutModal />
    </div>
  );
}
