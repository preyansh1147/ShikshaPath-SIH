import React from 'react';

const ProgressIndicator = ({ 
  progress = 0, 
  total = 100, 
  showPercentage = true, 
  showSteps = false,
  steps = [],
  currentStep = 0,
  size = 'default',
  variant = 'default',
  className = ''
}) => {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);

  const variants = {
    default: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };

  const sizes = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3',
  };

  if (showSteps && steps?.length > 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-2">
          {steps?.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium smooth-transition ${
                  index <= currentStep
                    ? `${variants?.[variant]} text-white`
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs text-muted-foreground mt-1 text-center max-w-16">
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          {steps?.map((_, index) => (
            <React.Fragment key={index}>
              <div
                className={`flex-1 ${sizes?.[size]} rounded-full smooth-transition ${
                  index <= currentStep ? variants?.[variant] : 'bg-muted'
                }`}
              />
              {index < steps?.length - 1 && <div className="w-2" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm text-muted-foreground">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-muted rounded-full ${sizes?.[size]}`}>
        <div
          className={`${sizes?.[size]} ${variants?.[variant]} rounded-full smooth-transition`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;