import React from "react";
import { User, Link } from "@nextui-org/react";
const Avatar = ({ className }: { className: string }) => {
  return (
    <User
      className={`${className} text-white`}
      name="Adam akbil"
      description={
        <Link
          className=" text-gray-200"
          href="https://twitter.com/jrgarciadev"
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
