import { Button } from "@nextui-org/button";
import { FilterSearchIcon, PlusIcon, UploadDocumentIcon } from "../../../public/icons";
import { SearchInput } from "../inputs";
import UploadButton from "./UploadButton";


export default function NavBar() {
  return (
    <nav className="flex h-[10vh] items-center justify-center border-b">
      <div className="flex gap-5 items-center">
        <SearchInput />
        <Button isIconOnly variant="bordered" aria-label="filter your search" style={{height:55,width:100}}>
          <FilterSearchIcon width={30} height={30} className="flex-shrink-0" stroke={"gray"} />
        </Button>
        <div className="flex gap-5 ml-16 ">
          <Button
            radius="sm"
            variant="bordered"
            className="text-default-500 flex items-center justify-between min-w-[130px] min-h-[55px]"
          >
            <PlusIcon width={70} height={70} className="flex-shrink-0" />
            <span className=" font-semibold text-base ">Create</span>

          </Button>
          <UploadButton
          radius="sm"
          variant="flat"
          className="text-default-500 flex items-center justify-between min-w-[130px] min-h-[55px] bg-black"

          />
        </div>
      </div>
    </nav>
  )
}
