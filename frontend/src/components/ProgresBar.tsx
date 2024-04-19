import React from "react";
import {Progress} from "@nextui-org/react";

export  const ProgressBar = ({value}:{value:number}) => {

  return (
    <Progress
      aria-label="Downloading..."
      size="md"
      value={value}
      color="success"
      showValueLabel={true}
      className="max-w-md"
    />
  );
}
