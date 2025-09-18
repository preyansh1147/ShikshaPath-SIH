import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssessmentCard = ({ assessment, onStart, isCompleted = false, progress = 0 }) => {
  const getProgressColor = () => {
    if (progress === 100) return 'bg-success';
    if (progress > 0) return 'bg-warning';
    return 'bg-muted';
  };

  const getStatusIcon = () => {
    if (isCompleted) return 'CheckCircle';
    if (progress > 0) return 'Clock';
    return 'Play';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:shadow-elevation-2 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${assessment?.bgColor}`}>
            <Icon name={assessment?.icon} size={24} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
              {assessment?.title}
            </h3>
            <p className="text-sm text-text-secondary">{assessment?.duration}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon 
            name={getStatusIcon()} 
            size={20} 
            className={`${isCompleted ? 'text-success' : progress > 0 ? 'text-warning' : 'text-muted-foreground'}`}
          />
        </div>
      </div>
      <p className="text-text-secondary mb-4 line-clamp-2">
        {assessment?.description}
      </p>
      <div className="space-y-3">
        {/* Progress Bar */}
        {progress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">Progress</span>
              <span className="text-text-primary font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {assessment?.features?.map((feature, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-text-secondary"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <Button
          variant={isCompleted ? "outline" : "default"}
          fullWidth
          iconName={isCompleted ? "RotateCcw" : progress > 0 ? "Play" : "ArrowRight"}
          iconPosition="right"
          onClick={() => onStart(assessment?.id)}
          className="mt-4"
        >
          {isCompleted ? "Retake Assessment" : progress > 0 ? "Continue" : "Start Assessment"}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentCard;