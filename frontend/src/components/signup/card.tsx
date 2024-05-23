import React from "react";
import Avatar from "../Avatar";

export const Card = () => {
  return (
    <div className="bg-dark-primary-color rounded-2xl p-5 lg:p-10">
      <p className="text-white font-light lg:text-lg lg:mb-5">
      "Transform your file management with Doctify. Experience unmatched productivity and organization"
      </p>
      <Avatar className="py-5" />
    </div>
  );
};
