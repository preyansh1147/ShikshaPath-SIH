import Icon from '../../../components/AppIcon';
import React from 'react';

const LoginBenefits = () => {
  const benefits = [
    {
      icon: 'Target',
      title: 'Personalized Guidance',
      description: 'Get career recommendations tailored to your interests, skills, and academic performance'
    },
    {
      icon: 'BookOpen',
      title: 'Stream Selection Help',
      description: 'Make informed decisions about Arts, Science, Commerce, or Vocational streams'
    },
    {
      icon: 'School',
      title: 'College Discovery',
      description: 'Explore government colleges with detailed information about courses and facilities'
    },
    {
      icon: 'TrendingUp',
      title: 'Progress Tracking',
      description: 'Monitor your academic journey and receive timely notifications about opportunities'
    },
    {
      icon: 'Users',
      title: 'Expert Support',
      description: 'Access guidance from experienced counselors and education professionals'
    },
    {
      icon: 'Award',
      title: 'Scholarship Alerts',
      description: 'Never miss scholarship opportunities and important admission deadlines'
    }
  ];



  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Your Career Journey Starts Here
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of students who have found their perfect academic path with ShikshaPath. 
          Our AI-powered platform provides personalized guidance to help you make confident decisions 
          about your future.
        </p>
      </div>
      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {benefits?.map((benefit, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-smooth"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={benefit?.icon} size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">
                  {benefit?.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default LoginBenefits;