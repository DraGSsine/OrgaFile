"use client";

import { PasswordForm } from "./PasswordForm";
import { DeleteAccount } from "./DeleteAccount";

export function SecuritySettings() {
  return (
    <div className="space-y-6 mt-6">
      <PasswordForm />
      <DeleteAccount />
    </div>
  );
}