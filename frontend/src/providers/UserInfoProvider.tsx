"use client";
import { GetUserInfo, SignOutAction } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function GetUserInfoProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const [allowRender, setAllowRender] = useState(false);
  useEffect(() => {
    dispatch(GetUserInfo())
      .then(() => {
        setAllowRender(true);
        console.log("GetUserInfoProvider: GetUserInfo dispatched");
      })
      .catch((error) => {
        setAllowRender(false);
        dispatch(SignOutAction());
      });
  }, []);
    if (!allowRender) return null;
  return <>{children}</>;
}

export default GetUserInfoProvider;
