import React, { ReactNode } from "react";
import PricingCard from "@/components/pricing/PricingCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pricing',
  description: "Whether you're new to our service or looking to level up your experience, we've got solutions that fit just right.",

}
const Pricing = () => {
  const plans = [
    {
      productId: "price_1Q3MfoHbzmnInIZ1CsBh5rGj",
      type: "Basic",
      price: "$9.99",
      subscription: "month",
      description: "Ideal for individuals or small groups requiring fundamental file management and straightforward sorting.",
      mostpopular: false,
      features: [
        "Upload 20 files simultaneously",
        "100 Credits/month",
        "Basic AI Sorting Algorithm",
        "5GB Storage",
        "24/7 Support",
      ],
    },
    {
      productId: "price_1Q3Mh3HbzmnInIZ1QvC4glTC",
      type: "Standard",
      price: "$14.99",
      subscription: "month",
      description: "Ideal for individuals or small teams seeking enhanced file organization and efficient sorting capabilities.",
      active: true,
      mostpopular: true,
      features: [
        "Upload 50 files simultaneously",
        "500 Credits/month",
        "Gold AI Sorting Algorithm",
        "25GB Storage",
        "24/7 Support",
      ],
    },
    {
      productId: "price_1Q3MiPHbzmnInIZ1kdQAFHqH",
      type: "Gold",
      price: "$29.99",
      subscription: "month",
      description: "The ultimate solution for extensive file management needs, offering advanced sorting capabilities and customization options.",
      mostpopular: false,
      features: [
        "Upload 100 files simultaneously",
        "1000 Credits/month",
        "Gold AI Sorting Algorithm",
        "50GB Storage",
        "24/7 Support",
      ],
    },
   ]
  return (
    <MaxWidthWrapper>
      <section className="relative z-10 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] space-y-6 max-w-[510px] text-center">
                <span className="bg-primary-100 border-primary-200 border text-primary-600 rounded-full text-xs font-medium px-3 py-1 ">
                  PRICING
                </span>
                <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                  Our Pricing Plan
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  Whether you&apos;re new to our service or looking to level up
                  your experience, we&apos;ve got solutions that fit just right.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 ">
            {plans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Pricing;
