import NavBar from "@/components/dashboard/NavBar";
import RightSidebar from "@/components/dashboard/rightSideBar/RightSideBar";
import Sidebar from "@/components/dashboard/sidebar/sideBar";

import SignoutModal from "@/components/LogOutModal";
import GetUserInfoProvider from "@/providers/UserInfoProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GetUserInfoProvider>
      <div className="mx-auto grid grid-cols-16">
        <Sidebar />
        <div className=" min-h-[1200px] col-start-1 md:col-start-2 xl:col-start-3 col-end-17 xl:col-end-15 flex flex-grow h-screen flex-col">
          <NavBar />
          <main className=" h-[92%]  scrollbar-webkit scrollbar-thin bg-gray-50 px-1 md:px-10">
            {children}
          </main>
        </div>
        <RightSidebar />
        <SignoutModal />
      </div>
    </GetUserInfoProvider>
  );
}
