import { SearchInput } from "../inputs";
import UploadButton from "./UploadButton";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-end md:justify-between px-4 md:px-20 h-[8%]  border-b">
      <SearchInput />
      <div className="flex gap-5 ml-16 ">
        <UploadButton
          radius="sm"
          className="text-default-500 flex items-center justify-between 2xl:min-w-[130px] min-h-[44px] bg-black"
        />
      </div>
    </nav>
  );
}
