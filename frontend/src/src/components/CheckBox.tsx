import React from "react";
import { Checkbox } from "@nextui-org/react";
import { colorType } from "@/types/types";
const CheckBox = ({
  color,
  text,
}: {
  color: colorType;
  calssName: string;
  text: string;
}) => {
  return (
    <Checkbox required  color={color} className="flex items-center" defaultSelected radius="full">
        <p className=" font-normal text-gray-500 text-sm" >{text}</p>
    </Checkbox>
  );
};

export default CheckBox;
