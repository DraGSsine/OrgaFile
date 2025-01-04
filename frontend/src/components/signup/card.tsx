import React from "react";
export const Card = () => {
  return (
    <div className="bg-primary-forground-color rounded-lg p-6 relative">
      <div className="absolute left-4 top-4 text-4xl text-white/20">"</div>
      <p className="text-white font-light lg:text-lg pt-6 pb-4 px-4 italic">
        Transform your file management with OrgaFile. Experience unmatched
        productivity and organization
      </p>
      <div className="absolute right-4 bottom-4 text-4xl text-white/20 rotate-180">
        "
      </div>
    </div>
  );
};
