import NavBar from "@/components/dashboard/NavBar";
import { RightSideBar } from "@/components/dashboard/rightSideBar/RightSideBar";
import Sidebar from "@/components/dashboard/sidebar/sideBar";

import SignoutModal from "@/components/LogOutModal";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto grid grid-cols-16 ">
      <Sidebar />
      <div className=" col-start-1 md:col-start-2 xl:col-start-3 col-end-17 xl:col-end-15 flex flex-grow h-screen flex-col">
        <NavBar />
        <main className=" flex-grow scrollbar-webkit scrollbar-thin bg-gray-50 px-1 md:px-10  max-h-screen overflow-y-scroll  ">
          {children}
        </main>
      </div>
      <RightSideBar />
      <SignoutModal />
    </div>
  );
}
