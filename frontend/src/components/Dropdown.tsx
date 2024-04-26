import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import { Ellipsis } from "../../public/icons";

function handleAction({ key, fileId }: { key: string | number; fileId: string }) {
  const {token} = JSON.parse(Cookies?.get("userInfo") as string);
  console.log(token);
  if (key === "delete")
  {
    fetch(`http://127.0.0.1:9010/api/files/remove?fileid=${fileId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
}

export const DropDown = ({fileId}:{fileId:string}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="flat" disableAnimation className=" bg-zinc-100 " size="sm" >
          <Ellipsis width={20} height={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key) => handleAction({key,fileId})}
      >
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
