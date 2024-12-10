import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { label: '購物車', step: 1 },
    { label: '確認訂單', step: 2 },
    { label: '付款', step: 3 }
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative flex justify-between w-full max-w-lg items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            {/* 數字及文字的容器 */}
            <div className="flex flex-col items-center z-10 ">

              {/* 圓形數字 */}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center
                  ${currentStep >= step.step ? 'bg-red-200' : 'bg-gray-200'}
                `}
              >
                {step.step}
              </div>

              {/* 步驟文字 */}
              <span className="mt-2 text-sm">{step.label}</span>
              
            </div>

            {/* 進度條 */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-1/3 transform -translate-y-1/2 w-full h-1
                  ${currentStep > step.step ? 'bg-red-200' : 'bg-gray-200'}
                `}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
