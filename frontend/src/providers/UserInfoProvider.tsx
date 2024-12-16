"use client";
import { GetUserInfo } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

function GetUserInfoProvider({ children }: { children: ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(GetUserInfo());
    }, []);

    return (
        <>
            {children}
        </>
    );
}

export default GetUserInfoProvider
