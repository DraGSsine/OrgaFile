"use client";

import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { PackageIcon } from "hugeicons-react";


export function AvailablePlansCard() {
  const plans = [
    {
      name: "Basic",
      price: "$9/month",
      features: ["5GB Storage", "2 Team Members", "Basic Support"],
    },
    {
      name: "Pro",
      price: "$29/month",
      features: ["50GB Storage", "10 Team Members", "Priority Support"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Unlimited Storage", "Unlimited Team Members", "24/7 Support"],
    },
  ];

  return (
    <Card>
      <CardHeader className="flex gap-3">
        <PackageIcon className="h-5 w-5 text-primary" />
        <div className="flex flex-col">
          <p className="text-md font-semibold">Available Plans</p>
          <p className="text-small text-default-500">Choose the best plan for your needs</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name}>
              <CardHeader>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{plan.name}</p>
                  <p className="text-default-500">{plan.price}</p>
                </div>
              </CardHeader>
              <CardBody>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-4"
                  color={plan.name === "Pro" ? "primary" : "default"}
                  variant={plan.name === "Pro" ? "solid" : "bordered"}
                >
                  {plan.name === "Pro" ? "Current Plan" : "Choose Plan"}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}