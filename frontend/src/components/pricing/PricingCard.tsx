import { PricingShape } from "../../../public/svgShapes";

type PricingCardProps = {
  children: React.ReactNode;
  description: string;
  price: string;
  type: string;
  subscription: string;
  buttonText: string;
  active?: boolean;
  mostpopular?: boolean;
};

const PricingCard = ({
  children,
  description,
  price,
  type,
  subscription,
  buttonText,
  active,
  mostpopular,
}: PricingCardProps) => {
  return (
    <>
      <div className={` relative w-[400px] p-1 rounded-xl bg-blue-200 ${mostpopular && " bg-gradient-to-br from-[#4b81f7] via-[#4bf79b] to-[#4b81f7]"}  `}>
        {mostpopular && (
          <div className=" text-center absolute z-20 -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
            Most Popular
          </div>
        )}
        <div className="relative z-10  overflow-hidden rounded-[10px] bg-white px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
          <span className="mb-3 block text-lg font-semibold text-primary">
            {type}
          </span>
          <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-white">
            {price}
            <span className="text-base font-medium text-body-color dark:text-dark-6">
              / {subscription}
            </span>
          </h2>
          <p className="mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
            {description}
          </p>
          <div className="mb-9 flex flex-col gap-[14px]">{children}</div>
          <a
            href="/#"
            className={` ${
              active
                ? "block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90"
                : "block w-full rounded-md border border-stroke bg-transparent p-3 text-center text-base font-medium text-primary transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3"
            } `}
          >
            {buttonText}
          </a>
          <div>
            <span className="absolute right-0 top-7 z-[-1]">
              <svg
                width={77}
                height={172}
                viewBox="0 0 77 172"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={86} cy={86} r={86} fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1={86}
                    y1={0}
                    x2={86}
                    y2={172}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3056D3" stopOpacity="0.09" />
                    <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="absolute right-4 top-4 z-[-1]">
              <PricingShape />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingCard;
