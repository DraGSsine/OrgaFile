"use client"
import React from "react";
import Cookies from "js-cookie";
const UserOverview = () => {
  const email = Cookies.get("email");
  console.log(email);
  return (
    <div className=" flex flex-col">
      <span className=" font-semibold">{email}</span>
      <span className=" text-primary">@{email?.split('@')[0]}</span>
    </div>
  );
};

export default UserOverview;
