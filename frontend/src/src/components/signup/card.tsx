import React from "react";
import Avatar from "../Avatar";

export const Card = () => {
  return (
    <div className="bg-dark-primary-color rounded-lg p-5 lg:p-10">
      <p className="text-white font-light lg:text-lg lg:mb-5">
      &quot;Transform your file management with OrgaFile. Experience unmatched productivity and organization&quot;
      </p>
      <Avatar className="py-5" />
    </div>
  );
};
