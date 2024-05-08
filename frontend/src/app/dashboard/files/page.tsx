"use client";
import AllUserFiles from "@/components/dashboard/files/AllUserFiles";
import ConfirmDelete from "@/components/dashboard/files/ConfirmeDelete";
import { Server } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div>
      <AllUserFiles />
      <ConfirmDelete />
    </div>
  );
};

export default page;
