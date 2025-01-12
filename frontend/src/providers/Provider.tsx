"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import ConfirmDelete from "@/components/dashboard/ConfirmeDelete";
import RenderDocs from "@/components/renderdocs/RenderDocs";
import { GoogleOAuthProvider } from "@react-oauth/google";

function Providers({ children }: { children: ReactNode }) {
  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <RenderDocs />
        <ConfirmDelete />
        <Toaster position="top-right" />
        {children}
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default Providers;
