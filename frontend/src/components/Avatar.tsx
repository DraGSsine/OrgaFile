import React from 'react'
import {User, Link} from "@nextui-org/react";
const Avatar = ({ className }: { className: string }) => {
    return (
        <User
          className={`${className} text-white`}
          name="Junior Garcia"
          description={(
            <Link className=' text-gray-200' href="https://twitter.com/jrgarciadev" size="sm" isExternal>
              @jrgarciadev
            </Link>
          )}
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4"
          }}
        />
      );
}

export default Avatar