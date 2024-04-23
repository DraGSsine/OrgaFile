import NavBar from "@/components/dashboard/NavBar";
import { RightSideBar } from "@/components/dashboard/RightSideBar";
import SideBar from "@/components/dashboard/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" max-w-[2444px] mx-auto pl-5 flex">
            <SideBar/>
            <div className="flex flex-grow h-screen flex-col">
                <NavBar/>
                <main className="flex-grow bg-slate-50 p-10">
                    {children}
                </main>
            </div>
            <RightSideBar/>
        </div>
    )
}