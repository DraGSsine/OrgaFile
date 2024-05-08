import { ProgressBar } from "../ProgresBar"
import { ProgressCircle } from "../ProgressCircle"
import UserProfile from "../User"

export const RightSideBar = () => {
    return (
        <div className="min-w-[25vw] border-l">
            <div className=" pl-5 items-center flex h-[10vh] border-b justify-between ">
                <div className=" flex flex-col">
                    <span className=" font-semibold">Yassine ouchen</span>
                    <span className=" text-primary">@Youchen</span>
                </div>
                <UserProfile />
            </div>
            <div>
                <div>
                    <span className=" font-semibold text-lg pl-5">Usage</span>
                    <ProgressBar value={50} />
                </div>
            </div>
        </div>
    )
}