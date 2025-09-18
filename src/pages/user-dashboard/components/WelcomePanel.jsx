import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomePanel = ({ user, profileCompletion, assessmentCompleted }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getCompletionStatus = () => {
    if (profileCompletion === 100 && assessmentCompleted) {
      return { text: 'Profile Complete', color: 'text-success', icon: 'CheckCircle' };
    }
    if (profileCompletion >= 50) {
      return { text: 'Almost There', color: 'text-warning', icon: 'Clock' };
    }
    return { text: 'Getting Started', color: 'text-error', icon: 'AlertCircle' };
  };

  const status = getCompletionStatus();

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            {getGreeting()}, {user?.name}!
          </h1>
          <p className="text-muted-foreground mb-4">
            Welcome back to your career guidance journey. Let's continue building your future.
          </p>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name={status?.icon} size={16} className={status?.color} />
              <span className={`text-sm font-medium ${status?.color}`}>
                {status?.text}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Profile: {profileCompletion}% complete
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {!assessmentCompleted && (
            <Button 
              variant="default" 
              iconName="Brain" 
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Take Assessment
            </Button>
          )}
          <Button 
            variant="outline" 
            iconName="User" 
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Update Profile
          </Button>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm text-muted-foreground">{Math.round((profileCompletion + (assessmentCompleted ? 100 : 0)) / 2)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.round((profileCompletion + (assessmentCompleted ? 100 : 0)) / 2)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePanel;