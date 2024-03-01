import React, { ChangeEvent, ChangeEventHandler, HtmlHTMLAttributes } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function SelectSkill({handleSelectionChange}:{handleSelectionChange:(e:any)=>void}) {
  const skills = [
    { label: "Web Developer", value: "web_development" },
    { label: "Graphic Designer", value: "graphic_design" },
    { label: "Data Analyst", value: "data_analysis" },
    { label: "Digital Marketer", value: "digital_marketing" },
    { label: "Project Manager", value: "project_management" },
    { label: "Accountant", value: "accounting" }
  ];

  const myFilter = (textValue: string, inputValue: string) => {
    if (inputValue.length === 0) {
      return true;
    }

    textValue = textValue.normalize("NFC").toLocaleLowerCase();
    inputValue = inputValue.normalize("NFC").toLocaleLowerCase();

 
    return textValue.slice(0, inputValue.length) === inputValue;
  };

  return (
    <Autocomplete
      defaultSelectedKey="web_development"
      className="max-w-full"
      defaultFilter={myFilter}
      defaultItems={skills}
      label="Search an field"
      variant="bordered"
      onSelectionChange={handleSelectionChange}
    >
      {(item) => (
        <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
