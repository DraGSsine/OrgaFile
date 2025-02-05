
import Upgrade from "./Upgrade";

type PricingCardProps = {
  description: string;
  price: string;
  type: string;
  subscription: string;
  active?: boolean;
  mostpopular?: boolean;
  features: string[];
};

const PricingCard = ({
  description,
  price,
  type,
  subscription,
  active,
  mostpopular,
  features
}: PricingCardProps) => {
  return (
    <>
      <div
        className={`  relative w-[400px] p-1 rounded-xl bg-blue-200 ${
          mostpopular &&
          " bg-gradient-to-br from-primary-color via-secondary-color to-primary-color "
        }  `}
      >
        {mostpopular && (
          <div className="  text-center absolute z-20 -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-primary-color to-primary-color px-3 py-2 text-sm font-medium text-white">
            Most Popular
          </div>
        )}
        <div className="relative z-10 h-full  overflow-hidden rounded-[10px] bg-white px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
          <div className="border-b border-stroke h-[250px]">
            <span className="mb-3 block text-lg font-semibold text-primary">
              {type}
            </span>
            <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-white">
              {price}
              <span className="text-base font-medium text-body-color dark:text-dark-6">
                / {subscription}
              </span>
            </h2>
            <p className="mb-8  text-base text-body-color  dark:text-dark-6">
              {description}
            </p>
          </div>
          <div className="mb-9 pt-12 flex flex-col gap-[14px]">
              <p className="text-base text-body-color dark:text-dark-6">{features[0]}</p>
              <p className="text-base text-body-color dark:text-dark-6">{features[1]}</p>
              <p className="text-base text-body-color dark:text-dark-6">{features[2]}</p>
              <p className="text-base text-body-color dark:text-dark-6">{features[3]}</p>
              <p className="text-base text-body-color dark:text-dark-6">{features[4]}</p>
          </div>
        <Upgrade plan={type}/>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingCard;
