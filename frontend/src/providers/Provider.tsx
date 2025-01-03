"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import ConfirmDelete from "@/components/dashboard/ConfirmeDelete";
import RenderDocs from "@/components/renderdocs/RenderDocs";
function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <RenderDocs />
      <ConfirmDelete />
      <Toaster position="top-right"/>
      {children}
    </Provider>
  );
}

export default Providers;
