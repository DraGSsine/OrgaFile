import React from "react";
import { User, Link } from "@nextui-org/react";
const Avatar = ({ className }: { className: string }) => {
  return (
    <User
      className={`${className} text-white`}
      name="Yassine Ouchen"
      description={
        <Link
          className=" text-gray-200"
          href="https://x.com/Yassin_ouchn"
          size="sm"
          isExternal
        >
          @DraGSsine
        </Link>
      }
      avatarProps={{
        src: "/images/person.png",
      }}
    />
  );
};

export default Avatar;
