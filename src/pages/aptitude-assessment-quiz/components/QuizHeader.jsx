import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizHeader = ({ 
  title = "Aptitude Assessment Quiz",
  subtitle = "Discover your strengths and interests",
  onExit,
  showExitButton = true,
  className = "" 
}) => {
  const handleExit = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit the quiz? Your progress will be saved."
    );
    if (confirmExit && onExit) {
      onExit();
    }
  };

  return (
    <div className={`bg-card border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Left Side - Title and Subtitle */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-3">
            {/* Help Button */}
            <Button
              variant="ghost"
              size="sm"
              iconName="HelpCircle"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="hidden sm:inline">Help</span>
            </Button>

            {/* Exit Button */}
            {showExitButton && (
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                iconPosition="left"
                onClick={handleExit}
                className="text-muted-foreground hover:text-foreground border-border"
              >
                <span className="hidden sm:inline">Exit Quiz</span>
              </Button>
            )}
          </div>
        </div>

        {/* Quiz Instructions */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-foreground mb-2">
                Instructions:
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Answer all questions honestly for accurate results</li>
                <li>• You can bookmark questions for review</li>
                <li>• Your progress is automatically saved</li>
                <li>• Take your time - there's no strict time limit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;