import Icon from '../../../components/AppIcon';
import React from 'react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: 'Target',
      title: 'Personalized Career Guidance',
      description: 'Get tailored recommendations based on your interests, skills, and academic performance'
    },
    {
      icon: 'BookOpen',
      title: 'Stream & Subject Selection',
      description: 'Make informed decisions about your academic path with detailed course comparisons'
    },
    {
      icon: 'School',
      title: 'Government College Directory',
      description: 'Access comprehensive information about government colleges with admission details'
    },
    {
      icon: 'TrendingUp',
      title: 'Career Path Mapping',
      description: 'Visualize your journey from current education to future career opportunities'
    },
    {
      icon: 'Bell',
      title: 'Important Notifications',
      description: 'Never miss admission deadlines, scholarship applications, or exam dates'
    },
    {
      icon: 'Users',
      title: 'Expert Support',
      description: 'Connect with career counselors and get guidance from education experts'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Why Choose ShikshaPath?
        </h2>
        <p className="text-muted-foreground">
          Join thousands of students who have found their perfect career path
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits?.map((benefit, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-card border border-border rounded-lg hover:shadow-soft transition-smooth"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={benefit?.icon} size={20} className="text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground mb-1">
                {benefit?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Trust Indicators */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <div className="flex items-center justify-center space-x-6 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 text-success mb-1">
              <Icon name="Shield" size={16} />
              <span className="text-sm font-medium">Secure</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your data is protected
            </p>
          </div>
          
          <div className="w-px h-8 bg-border" />
          
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 text-primary mb-1">
              <Icon name="Award" size={16} />
              <span className="text-sm font-medium">Trusted</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Government certified
            </p>
          </div>
          
          <div className="w-px h-8 bg-border" />
          
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 text-accent mb-1">
              <Icon name="Users" size={16} />
              <span className="text-sm font-medium">50,000+</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Students helped
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;