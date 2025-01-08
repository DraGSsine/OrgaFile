"use client";
import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setActiveStep } from '@/redux/slices/landingSlice';
import { AppDispatch, RootState } from '@/redux/store';

interface HowItWorkCardProps {
  step: string;
  feature: string;
  description: string;
  icon: ReactNode;
}

const HowItWorkCard: React.FC<HowItWorkCardProps> = ({
  step,
  feature,
  description,
  icon,
}) => {
  const { activeStep } = useSelector((state: RootState) => state.landing);
  const dispatch = useDispatch<AppDispatch>();
  const isActive = activeStep === step;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{ scale: isActive ? 1.05 : 1 }}
      transition={{ duration: 0.2 }}
      onClick={() => dispatch(setActiveStep(step))}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          dispatch(setActiveStep(step));
        }
      }}
      className={`
        relative max-w-[350px] cursor-pointer 
        rounded-xl border transition-all duration-300 ease-in-out
        ${isActive 
          ? 'bg-white border-primary-200 shadow-lg shadow-primary-100/50' 
          : 'border-transparent hover:border-primary-100 hover:bg-slate-50/80'
        }
        p-6 md:p-7
      `}
      aria-pressed={isActive}
    >
      {/* Step indicator */}
      <div className="absolute z-50 -top-3 left-6 bg-primary-100 text-primary-color px-3 py-1 rounded-full text-sm font-medium">
      {step}
      </div>

      {/* Icon container */}
      <div className={`
        mb-5 rounded-xl p-3 w-12 h-12 flex items-center justify-center
        ${isActive 
          ? 'bg-primary-color text-white' 
          : 'bg-primary-50 text-primary-600'
        }
        transition-colors duration-300
      `}>
        {icon}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className={`
          text-xl font-semibold transition-colors duration-300
          ${isActive ? 'text-primary-700' : 'text-gray-900'}
        `}>
          {feature}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-0 border-2 border-primary-500 rounded-xl"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.div>
  );
};

export default HowItWorkCard;