import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracker = ({ profileCompletion, assessmentCompleted }) => {
  const progressSteps = [
    {
      id: 1,
      title: 'Profile Setup',
      description: 'Complete your academic background',
      progress: profileCompletion,
      completed: profileCompletion === 100,
      icon: 'User',
      action: 'Complete Profile'
    },
    {
      id: 2,
      title: 'Aptitude Assessment',
      description: 'Discover your strengths and interests',
      progress: assessmentCompleted ? 100 : 0,
      completed: assessmentCompleted,
      icon: 'Brain',
      action: 'Take Assessment'
    },
    {
      id: 3,
      title: 'Stream Exploration',
      description: 'Explore academic pathways',
      progress: assessmentCompleted ? 75 : 0,
      completed: false,
      icon: 'Compass',
      action: 'Explore Streams'
    },
    {
      id: 4,
      title: 'College Research',
      description: 'Find and compare colleges',
      progress: 25,
      completed: false,
      icon: 'School',
      action: 'Research Colleges'
    }
  ];

  const overallProgress = Math.round(
    progressSteps?.reduce((sum, step) => sum + step?.progress, 0) / progressSteps?.length
  );

  const getStepStatus = (step) => {
    if (step?.completed) return { color: 'text-success', bgColor: 'bg-success', icon: 'CheckCircle' };
    if (step?.progress > 0) return { color: 'text-warning', bgColor: 'bg-warning', icon: 'Clock' };
    return { color: 'text-muted-foreground', bgColor: 'bg-muted', icon: 'Circle' };
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Progress Tracker</h2>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
          <div className="text-xs text-muted-foreground">Overall Progress</div>
        </div>
      </div>
      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Journey Completion</span>
          <span className="text-sm text-muted-foreground">{overallProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
      {/* Progress Steps */}
      <div className="space-y-4">
        {progressSteps?.map((step, index) => {
          const status = getStepStatus(step);
          
          return (
            <div key={step?.id} className="relative">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step?.completed ? 'bg-success text-success-foreground' : 
                    step?.progress > 0 ? 'bg-warning text-warning-foreground': 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon 
                      name={step?.completed ? 'Check' : step?.icon} 
                      size={16} 
                    />
                  </div>
                  {index < progressSteps?.length - 1 && (
                    <div className="absolute top-10 left-5 w-0.5 h-8 bg-border" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium ${
                      step?.completed ? 'text-success' : 
                      step?.progress > 0 ? 'text-foreground': 'text-muted-foreground'
                    }`}>
                      {step?.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {step?.progress}%
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {step?.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="w-32 bg-muted rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          step?.completed ? 'bg-success' : 
                          step?.progress > 0 ? 'bg-warning': 'bg-muted'
                        }`}
                        style={{ width: `${step?.progress}%` }}
                      />
                    </div>
                    
                    {!step?.completed && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName="ArrowRight" 
                        iconPosition="right"
                        className="text-xs"
                      >
                        {step?.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Next Steps */}
      <div className="mt-6 pt-4 border-t border-border">
        <h3 className="font-medium text-foreground mb-3">Recommended Next Steps</h3>
        <div className="space-y-2">
          {progressSteps?.filter(step => !step?.completed)?.slice(0, 2)?.map((step) => (
              <div key={step?.id} className="flex items-center space-x-2 text-sm">
                <Icon name="ArrowRight" size={14} className="text-primary" />
                <span className="text-muted-foreground">{step?.action}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;