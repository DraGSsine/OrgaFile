import { Button } from "@nextui-org/button";
import { PlusIcon, UploadDocumentIcon } from "../../../public/icons";
import { SearchInput } from "../inputs";
import UploadButton from "./UploadButton";
import { PlusCircle } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-20 h-[8vh]  border-b">
        <SearchInput />
      <div className="flex gap-5 ml-16 ">
        <UploadButton
          radius="sm"
          className="text-default-500 flex items-center justify-between min-w-[130px] min-h-[44px] bg-black"
        />
      </div>
    </nav>
  );
}
 