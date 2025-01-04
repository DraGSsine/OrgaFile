import React, { ReactNode } from "react";
import PricingCard from "@/components/pricing/PricingCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pricing',
  description: "Choose the perfect plan to organize and categorize your files automatically with Orgafile's AI-powered sorting system.",
}

const Pricing = () => {
  const plans = [
    {
      productId: "price_1Q3MfoHbzmnInIZ1CsBh5rGj",
      type: "Basic",
      price: "$7.99",
      subscription: "month",
      description: "Perfect for individuals who need help organizing their personal files and documents automatically.",
      mostpopular: false,
      features: [
        "100 Files/month",
        "5GB Storage",
        "Unlimited custom categories",
        "Advanced AI categorization",
        "Smart folder suggestions",
        "Batch processing",
        "24/7 Support",
      ],
    },
    {
      productId: "price_1Q3Mh3HbzmnInIZ1QvC4glTC",
      type: "Standard",
      price: "$9.99",
      subscription: "month",
      description: "Ideal for professionals who need more credits and storage for their file organization needs.",
      active: true,
      mostpopular: true,
      features: [
        "500 Files/month",
        "25GB Storage",
        "Unlimited custom categories",
        "Advanced AI categorization",
        "Smart folder suggestions",
        "Batch processing",
        "24/7 Support",
      ],
    },
    {
      productId: "price_1Q3MiPHbzmnInIZ1kdQAFHqH",
      type: "Gold",
      price: "$29.99",
      subscription: "month",
      description: "Complete solution for users with extensive file organization needs requiring maximum credits and storage.",
      mostpopular: false,
      features: [
        "1000 Files/month",
        "50GB Storage",
        "Unlimited custom categories",
        "Advanced AI categorization",
        "Smart folder suggestions",
        "Batch processing",
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
                <span className="bg-primary-100 border-primary-200 border text-primary-color rounded-full text-xs font-medium px-3 py-1">
                  PRICING
                </span>
                <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                  Choose Your Plan
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  All plans include our full suite of AI-powered organization features. Simply choose the credit and storage amount that fits your needs.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
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