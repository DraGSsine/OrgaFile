import { Button } from "@nextui-org/button";
import { PlusIcon, UploadDocumentIcon } from "../../../public/icons";
import { SearchInput } from "../inputs";
import UploadButton from "./UploadButton";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-around h-[10vh]  border-b">
      <div>
        <SearchInput />
      </div>
      <div className="flex gap-5 ml-16 ">
        <Button
          radius="sm"
          variant="bordered"
          className="text-default-500 flex items-center justify-between min-w-[130px] min-h-[55px]"
        >
          <PlusIcon
            width={70}
            height={70}
            className="flex-shrink-0 stroke-zinc-400 "
          />
          <span className=" font-medium text-zinc-400 text-base ">Create</span>
        </Button>
        <UploadButton
          radius="sm"
          variant="flat"
          className="text-default-500 flex items-center justify-between min-w-[130px] min-h-[55px] bg-black"
        />
      </div>
    </nav>
  );
}
