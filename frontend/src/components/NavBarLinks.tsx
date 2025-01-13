"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type TabItem = {
  key: string;
  title: string;
};

const tabItems: TabItem[] = [
  { key: "/", title: "Home" },
  { key: "/pricing", title: "Pricing" },
  { key: "/legal", title: "Legal" },
  { key: "/demo", title: "Demo" },
];

const NavBarLinks = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [activeTab, setActiveTab] = useState<string | number>(pathName || "/");

  useEffect(() => {
    setActiveTab(pathName || "/");
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
        onSelectionChange={handleSelectedTab}
        aria-label="Tabs colors"
        radius="full"
        classNames={{
          tabContent: "text-gray-900",
        }}
      >
        {tabItems.map((item) => (
          <Tab key={item.key} title={item.title} />
        ))}
      </Tabs>
    </nav>
  );
};

export default NavBarLinks;
