import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuizNavigation = ({ 
  currentQuestion,
  totalQuestions,
  canGoNext,
  canGoPrevious,
  onPrevious,
  onNext,
  onPause,
  onSubmit,
  isLastQuestion,
  hasUnansweredQuestions,
  className = "" 
}) => {
  const handleSubmit = () => {
    if (hasUnansweredQuestions) {
      const confirmSubmit = window.confirm(
        "You have unanswered questions. Are you sure you want to submit the quiz?"
      );
      if (!confirmSubmit) return;
    }
    onSubmit();
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Left Side - Previous Button */}
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="default"
          iconName="ChevronLeft"
          iconPosition="left"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="min-w-[120px]"
        >
          Previous
        </Button>
        
        <Button
          variant="ghost"
          size="default"
          iconName="Pause"
          iconPosition="left"
          onClick={onPause}
          className="text-muted-foreground hover:text-foreground"
        >
          Pause Quiz
        </Button>
      </div>

      {/* Center - Question Counter */}
      <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg">
        <Icon name="FileText" size={16} className="text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">
          {currentQuestion} of {totalQuestions}
        </span>
      </div>

      {/* Right Side - Next/Submit Button */}
      <div className="flex items-center space-x-3">
        {isLastQuestion ? (
          <Button
            variant="default"
            size="default"
            iconName="CheckCircle"
            iconPosition="right"
            onClick={handleSubmit}
            className="min-w-[120px] bg-success hover:bg-success/90 text-success-foreground"
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            variant="default"
            size="default"
            iconName="ChevronRight"
            iconPosition="right"
            onClick={onNext}
            disabled={!canGoNext}
            className="min-w-[120px]"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizNavigation;