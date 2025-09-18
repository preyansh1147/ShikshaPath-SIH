import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PauseModal = ({ 
  isOpen, 
  onClose, 
  onResume, 
  onSaveAndExit,
  currentProgress,
  className = "" 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className={`relative bg-card border border-border rounded-lg shadow-elevated max-w-md w-full mx-4 ${className}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Pause" size={20} className="text-warning" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Quiz Paused
              </h2>
              <p className="text-sm text-muted-foreground">
                Your progress has been saved
              </p>
            </div>
          </div>

          {/* Progress Info */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Current Progress
              </span>
              <span className="text-sm text-primary">
                {currentProgress}% Complete
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>

          {/* Information */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="Save" size={16} className="text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Auto-saved
                </p>
                <p className="text-xs text-muted-foreground">
                  Your answers are automatically saved
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Clock" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Resume anytime
                </p>
                <p className="text-xs text-muted-foreground">
                  You can continue from where you left off
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-3">
            <Button
              variant="default"
              size="default"
              iconName="Play"
              iconPosition="left"
              onClick={onResume}
              fullWidth
            >
              Resume Quiz
            </Button>
            
            <Button
              variant="outline"
              size="default"
              iconName="Save"
              iconPosition="left"
              onClick={onSaveAndExit}
              fullWidth
            >
              Save & Exit to Dashboard
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              fullWidth
              className="text-muted-foreground"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PauseModal;