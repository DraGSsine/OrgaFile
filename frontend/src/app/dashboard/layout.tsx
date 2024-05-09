import NavBar from "@/components/dashboard/NavBar";
import { RightSideBar } from "@/components/dashboard/RightSideBar";
import SideBar from "@/components/dashboard/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" mx-auto flex">
            <SideBar/>
            <div className="flex flex-grow h-screen flex-col">
                <NavBar/>
                <main className=" scrollbar-webkit scrollbar-thin flex-grow bg-slate-50 px-10 pt-10 max-h-screen overflow-y-scroll  ">
                    {children}
                </main>
            </div>
            <RightSideBar/>
        </div>
    )
}