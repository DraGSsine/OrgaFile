
import React from "react";
import { User, Link } from "@nextui-org/react";

export default function UserProfile() {
    return (
        <User
            name=""
            avatarProps={{
                size: "lg",
                src: "https://avatars.githubusercontent.com/u/30373425?v=4"
            }}
        />
    );
}
