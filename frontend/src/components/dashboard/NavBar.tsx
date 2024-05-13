import { Button } from "@nextui-org/button";
import { PlusIcon, UploadDocumentIcon } from "../../../public/icons";
import { SearchInput } from "../inputs";
import UploadButton from "./UploadButton";
import { PlusCircle } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-around min-h-[10vh] max-h-[10vh]  border-b">
      <div>
        <SearchInput />
      </div>
      <div className="flex gap-5 ml-16 ">
        {/* <Button
          radius="sm"
          variant="bordered"
          className="text-default-500 flex items-center justify-between min-w-[130px] min-h-[44px]"
        >
          <PlusCircle size={24} className="flex-shrink-0 stroke-gray-400 " />
          <span className=" font-medium text-gray-400 text-base ">Create</span>
        </Button> */}
        <UploadButton
          radius="sm"
          className="text-default-500 flex items-center justify-between min-w-[130px] min-h-[44px] bg-black"
        />
      </div>
    </nav>
  );
}
