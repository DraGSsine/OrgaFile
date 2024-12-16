"use client";

import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { Shield01Icon } from "hugeicons-react";


export function DeleteAccount() {
  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log("Delete account");
  };

  return (
    <Card>
      <CardHeader className="flex gap-3">
        <Shield01Icon className="h-5 w-5 text-danger" />
        <div className="flex flex-col">
          <p className="text-md font-semibold">Account Deletion</p>
          <p className="text-small text-default-500">Permanently delete your account</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <p className="text-sm text-default-500">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button 
            color="danger" 
            variant="flat"
            className="w-full sm:w-auto"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}