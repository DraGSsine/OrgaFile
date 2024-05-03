import React from "react";
import { Radio, cn } from "@nextui-org/react";

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
        classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-full xs:w-[30%] md:w-[49%] cursor-pointer rounded-lg gap-4 p-4 border-2",
          "data-[selected=true]:border-primary "
        ),
      }}
    >
      {children}
    </Radio>
  );
};

