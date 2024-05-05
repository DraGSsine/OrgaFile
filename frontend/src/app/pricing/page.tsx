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
                <span className="mb-2 block text-lg font-semibold text-primary">
                  Pricing Table
                </span>
                <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                  Our Pricing Plan
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                Whether you're new to our service or looking to level up your experience, we've got solutions that fit just right.
                </p>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="-mx-4 flex flex-wrap space-x-6">
              <PricingCard
                type="Personal"
                price="$59"
                subscription="year"
                description="Perfect for using in a personal website or a client project."
                buttonText="Choose Personal"
                mostpopular={false}
              >
                <List>1 User</List>
                <List>All UI components</List>
                <List>Lifetime access</List>
                <List>Free updates</List>
                <List>Use on 1 (one) project</List>
                <List>3 Months support</List>
              </PricingCard>
              
              <PricingCard
                type="Business"
                price="$199"
                subscription="year"
                description="Perfect for using in a personal website or a client project."
                buttonText="Choose Business"
                active
                mostpopular={true}
              >
                <List>5 User</List>
                <List>All UI components</List>
                <List>Lifetime access</List>
                <List>Free updates</List>
                <List>Use on31 (Three) project</List>
                <List>4 Months support</List>
              </PricingCard>

              <PricingCard
                type="Professional"
                price="$256"
                subscription="year"
                description="Perfect for using in a personal website or a client project."
                buttonText="Choose Professional"
                mostpopular={false}
              >
                <List>Unlimited User</List>
                <List>All UI components</List>
                <List>Lifetime access</List>
                <List>Free updates</List>
                <List>Unlimited project</List>
                <List>12 Months support</List>
              </PricingCard>
              
            </div>
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
