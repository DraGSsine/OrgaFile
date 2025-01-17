import React from "react";
import { Metadata } from "next";
import {
  ArrowRight01Icon,
  CreditCardIcon,
  Shield01Icon,
  Tick01Icon,
  ZapIcon,
} from "hugeicons-react";
import Upgrade from "@/components/pricing/Upgrade";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, predictable pricing for organizing your files with AI.",
};

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$4.99",
      period: "month",
      description:
        "Perfect for students and personal use to keep your files organized.",
      features: [
        "100 credits per month",
        "10GB Storage",
        "Email support",
        "AI-powered organization",
        "Customizable folder rules",
      ],
      highlight: false,
      cta: "Get Started",
      savings: "Save $12 yearly",
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "month",
      description:
        "Ideal for professionals and small teams who need more organization power.",
      features: [
        "400 credits per month",
        "20GB Storage",
        "Priority support",
        "AI-powered organization",
        "Customizable folder rules",
      ],
      highlight: true,
      cta: "Get Started",
      savings: "Save $24 yearly",
    },
    {
      name: "Business",
      price: "$14.99",
      period: "month",
      description: "For power users and businesses with high-volume needs.",
      features: [
        "800 credits per month",
        "40GB Storage",
        "24/7 Priority support",
        "AI-powered organization",
        "Customizable folder rules",
      ],
      highlight: false,
      cta: "Get Started",
      savings: "Save $36 yearly",
    },
  ];

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <div className="relative text-center max-w-3xl mx-auto mb-20">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ZapIcon size={16} className="text-blue-500" />
              Special Launch Pricing
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
              Simple, transparent pricing for everyone
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              No hidden fees. No complicated tiers. Just pick the plan that
              matches your needs and start organizing your files instantly.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield01Icon size={16} className="text-blue-500" />
                <span>Money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCardIcon size={16} className="text-blue-500" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2">
                <ZapIcon size={16} className="text-blue-500" />
                <span>Instant access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative group rounded-3xl ${
                plan.highlight
                  ? "bg-primary-color  text-white shadow-xl"
                  : "bg-white text-slate-900 shadow-lg hover:shadow-xl"
              } p-8 transition-all duration-300 `}
            >
              {/* {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className=" text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )} */}

              {/* Plan Header */}
              <div className="mb-8">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.highlight ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span
                    className={`text-4xl font-bold ${
                      plan.highlight ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={
                      plan.highlight ? "text-blue-200" : "text-slate-500"
                    }
                  >
                    /{plan.period}
                  </span>
                </div>
                <p
                  className={
                    plan.highlight ? "text-blue-100" : "text-slate-600"
                  }
                >
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Tick01Icon
                      size={20}
                      className={
                        plan.highlight
                          ? "text-blue-300 mt-0.5"
                          : "text-blue-500 mt-0.5"
                      }
                    />
                    <span
                      className={
                        plan.highlight ? "text-blue-100" : "text-slate-600"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div>
                <Upgrade plan={plan.name} />
                {/* <p className={`text-center text-sm mt-3 ${
                  plan.highlight ? 'text-blue-200' : 'text-slate-500'
                }`}>
                  {plan.savings}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
