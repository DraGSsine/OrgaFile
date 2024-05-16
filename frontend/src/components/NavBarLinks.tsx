"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const NavBarLinks = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [activeTab, setActiveTab] = useState<string | number>("/");

  useEffect(() => {
    setActiveTab(pathName);
  }, [pathName]);

  const handleSelectedTab = (key: string | number) => {
    setActiveTab(key);
    router.push(key as string);
  };

  return (
    <nav>
      <Tabs
        color="primary"
        selectedKey={activeTab}
        onSelectionChange={(key) => handleSelectedTab(key)}
        aria-label="Tabs colors"
        radius="full"
      >
        <Tab key="/" title="Home" />
        <Tab key="/about" title="About" />
        <Tab key="/pricing" title="Pricing" />
        <Tab key="/contact" title="Contact" />
      </Tabs>
    </nav>
  );
};

export default NavBarLinks;
