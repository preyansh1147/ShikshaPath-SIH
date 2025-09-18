import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ assessmentCompleted }) => {
  const actions = [
    {
      id: 1,
      title: 'Take Assessment',
      description: 'Discover your strengths and interests',
      icon: 'Brain',
      path: '/aptitude-assessment-quiz',
      variant: assessmentCompleted ? 'outline' : 'default',
      disabled: false
    },
    {
      id: 2,
      title: 'Explore Streams',
      description: 'Find the right academic path',
      icon: 'Compass',
      path: '/stream-exploration',
      variant: 'outline',
      disabled: false
    },
    {
      id: 3,
      title: 'Compare Colleges',
      description: 'Make informed decisions',
      icon: 'GitCompare',
      path: '/college-comparison',
      variant: 'outline',
      disabled: false
    },
    {
      id: 4,
      title: 'Career Pathways',
      description: 'Visualize your future',
      icon: 'TrendingUp',
      path: '/career-pathways',
      variant: 'outline',
      disabled: true
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Zap" size={20} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <div key={action?.id} className="group">
            {action?.disabled ? (
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border bg-muted/50 opacity-60 cursor-not-allowed">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={action?.icon} size={20} className="text-muted-foreground" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-muted-foreground">{action?.title}</h3>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </div>
                <Icon name="Lock" size={16} className="text-muted-foreground" />
              </div>
            ) : (
              <Link to={action?.path} className="block">
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group-hover:shadow-soft">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon name={action?.icon} size={20} className="text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {action?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{action?.description}</p>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;