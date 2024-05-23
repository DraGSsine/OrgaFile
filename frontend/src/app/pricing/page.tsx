import React, { ReactNode } from "react";
import PricingCard from "@/components/pricing/PricingCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Pricing = () => {
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

          <div className="-mx-4 flex flex-wrap justify-center space-x-6">
            <PricingCard
              type="Basic"
              price="$9"
              subscription="month"
              description="Ideal for individuals or small groups requiring fundamental file management and straightforward sorting."
              mostpopular={false}
            >
              <List>Upload 20 files simultaneously </List>
              <List>100 Credits/monthh</List>
              <List>Basic AI Sorting Algorithm</List>
              <List>5Gb Storage</List>
              <List>24/7 Support</List>
            </PricingCard>

            <PricingCard
              type=" Standard"
              price="$19"
              subscription="year"
              description="Ideal for individuals or small teams seeking enhanced file organization and efficient sorting capabilities."
              active
              mostpopular={true}
            >
              <List>Upload 40 files simultaneously </List>
              <List>300 Credits/monthh</List>
              <List>Premium AI Sorting Algorithm</List>
              <List>15Gb Storage</List>
              <List>24/7 Support</List>
            </PricingCard>

            <PricingCard
              type=" Premium"
              price="$39"
              subscription=" month"
              description="The ultimate solution for extensive file management needs, offering advanced sorting capabilities and customization options."
              mostpopular={false}
            >
              <List>Upload 50 files simultaneously </List>
              <List>400 Credits/monthh</List>
              <List>Premium AI Sorting Algorithm</List>
              <List>20Gb Storage</List>
              <List>24/7 Support</List>
            </PricingCard>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Pricing;

const List = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-base text-body-color dark:text-dark-6">{children}</p>
  );
};
