"use client";
import { loadFolders } from "@/redux/slices/foldersSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@nextui-org/button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LoadFolders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { folders } = useSelector(
    (state: RootState) => state.folders.loadFolders
  );

  return (
    <div>
      <Button onClick={() => dispatch(loadFolders())}>Load folders</Button>
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="flex justify-between items-center border-b border-gray-200 py-4"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <i className="fas fa-folder"></i>
            </div>
            <p className="pl-4">{folder.name}</p>
          </div>
          <p>{folder.numberOfFiles} files</p>
        </div>
      ))}
    </div>
  );
};

export default LoadFolders;
