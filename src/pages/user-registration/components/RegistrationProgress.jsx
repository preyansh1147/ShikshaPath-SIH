import Icon from '../../../components/AppIcon';
import React from 'react';

const RegistrationProgress = ({ currentStep = 1, totalSteps = 3 }) => {
  const steps = [
    { id: 1, title: 'Account Setup', icon: 'UserPlus', description: 'Create your profile' },
    { id: 2, title: 'Email Verification', icon: 'Mail', description: 'Verify your email' },
    { id: 3, title: 'Complete Profile', icon: 'CheckCircle', description: 'Finish setup' }
  ];

  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-8">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          Create Your Account
        </h2>
        <span className="text-sm font-medium text-primary">
          {percentage}% Complete
        </span>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {/* Step Indicators - Desktop */}
      <div className="hidden md:flex items-center justify-between relative">
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={step?.id} className="flex flex-col items-center relative z-10">
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                ${isCompleted 
                  ? 'bg-success border-success text-success-foreground shadow-soft' 
                  : isCurrent 
                    ? 'bg-primary border-primary text-primary-foreground shadow-soft' 
                    : 'bg-background border-border text-muted-foreground'
                }
              `}>
                {isCompleted ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step?.icon} size={20} />
                )}
              </div>
              <div className="mt-3 text-center">
                <h3 className={`
                  text-sm font-medium
                  ${isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}
                `}>
                  {step?.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-24">
                  {step?.description}
                </p>
              </div>
              {/* Connection Line */}
              {/* {index < steps?.length - 1 && (
                <div 
                  className={`
                    absolute top-6 left-6 w-full h-0.5 transition-colors duration-300
                    ${isCompleted ? 'bg-success' : 'bg-border'}
                  `}
                  style={{ 
                    width: 'calc(100vw / 3 - 48px)',
                    maxWidth: '374px'
                  }}
                />
              )} */}
            </div>
          );
        })}
      </div>
      {/* Step Indicators - Mobile (Simplified) */}
      <div className="flex md:hidden items-center justify-center space-x-3">
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={step?.id} className="flex flex-col items-center">
              <div
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${isCompleted 
                    ? 'bg-success' 
                    : isCurrent 
                      ? 'bg-primary' :'bg-border'
                  }
                `}
              />
              <span className={`
                text-xs mt-2 font-medium
                ${isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}
              `}>
                {step?.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegistrationProgress;