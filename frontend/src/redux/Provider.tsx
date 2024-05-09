"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import ConfirmDelete from "@/components/dashboard/ConfirmeDelete";
function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ConfirmDelete />
      <Toaster position="top-right" richColors />
      {children}
    </Provider>
  );
}

export default Providers;
