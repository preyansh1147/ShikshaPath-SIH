import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const steps = [
    {
      id: 0,
      title: 'Discover Yourself',
      subtitle: 'Comprehensive Assessment',
      description: 'Take our scientifically-designed aptitude and personality assessments to understand your strengths, interests, and natural inclinations.',
      icon: 'Target',
      color: 'from-blue-500 to-indigo-600',
      features: ['Aptitude Testing', 'Personality Analysis', 'Interest Mapping', 'Skills Assessment'],
      route: '/career-discovery-portal',
      duration: '15-20 minutes'
    },
    {
      id: 1,
      title: 'Explore Pathways',
      subtitle: 'Personalized Recommendations',
      description: 'Get customized career and stream recommendations based on your assessment results, market trends, and future opportunities.',
      icon: 'Compass',
      color: 'from-purple-500 to-pink-600',
      features: ['Career Matching', 'Stream Selection', 'Market Analysis', 'Future Trends'],
      route: '/career-discovery-portal',
      duration: 'Instant results'
    },
    {
      id: 2,
      title: 'Find Your College',
      subtitle: 'Smart College Discovery',
      description: 'Discover colleges and courses that align with your goals using our intelligent filtering system and comprehensive database.',
      icon: 'GraduationCap',
      color: 'from-green-500 to-emerald-600',
      features: ['College Database', 'Course Matching', 'Location Filter', 'Fee Comparison'],
      route: '/college-intelligence-dashboard',
      duration: 'Real-time search'
    },
    {
      id: 3,
      title: 'Get Expert Guidance',
      subtitle: 'Human + AI Support',
      description: 'Connect with expert counselors and our AI assistant for personalized guidance throughout your educational journey.',
      icon: 'Users',
      color: 'from-orange-500 to-red-600',
      features: ['Expert Counselors', 'AI Chatbot', 'Peer Community', 'Parent Support'],
      route: '/personal-guidance-center',
      duration: '24/7 availability'
    },
    {
      id: 4,
      title: 'Track Progress',
      subtitle: 'Journey Management',
      description: 'Monitor your application deadlines, track progress, and access resources to ensure you never miss important milestones.',
      icon: 'TrendingUp',
      color: 'from-teal-500 to-cyan-600',
      features: ['Deadline Tracking', 'Progress Monitor', 'Resource Library', 'Success Metrics'],
      route: '/resource-timeline-hub',
      duration: 'Ongoing support'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef?.current) {
      observer?.observe(sectionRef?.current);
    }

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps?.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isVisible, steps?.length]);

  const currentStep = steps?.[activeStep];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cultural-pattern opacity-20"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-accent/10 to-success/10 rounded-full blur-3xl"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Icon name="Route" size={16} className="mr-2" />
            Your Journey to Success
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            How ShikshaPath  Works
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Our proven 5-step process guides you from self-discovery to college admission, 
            ensuring you make informed decisions at every stage of your educational journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Timeline */}
          <div className="space-y-6">
            {steps?.map((step, index) => (
              <div
                key={step?.id}
                className={`relative cursor-pointer transition-all duration-500 ${
                  activeStep === index ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeStep === index
                    ? 'border-primary bg-primary/5 shadow-elevation-3'
                    : 'border-border bg-surface hover:border-primary/30 hover:shadow-elevation-2'
                }`}>
                  <div className="flex items-start space-x-4">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step?.color} flex items-center justify-center mb-2 ${
                        activeStep === index ? 'scale-110 shadow-elevation-2' : ''
                      } transition-all duration-300`}>
                        <Icon name={step?.icon} size={20} color="white" />
                      </div>
                      <div className="text-center">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          activeStep === index ? 'bg-primary text-white' : 'bg-muted text-text-secondary'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg font-bold ${
                          activeStep === index ? 'text-primary' : 'text-text-primary'
                        }`}>
                          {step?.title}
                        </h3>
                        <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded-full">
                          {step?.duration}
                        </span>
                      </div>
                      
                      <p className="text-sm text-text-secondary mb-3">
                        {step?.subtitle}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {step?.features?.slice(0, 3)?.map((feature, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-full ${
                              activeStep === index
                                ? 'bg-primary/10 text-primary' :'bg-muted text-text-secondary'
                            }`}
                          >
                            {feature}
                          </span>
                        ))}
                        {step?.features?.length > 3 && (
                          <span className="text-xs text-text-secondary">
                            +{step?.features?.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className={`flex-shrink-0 transition-all duration-300 ${
                      activeStep === index ? 'text-primary scale-110' : 'text-text-secondary'
                    }`}>
                      <Icon name="ChevronRight" size={20} />
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps?.length - 1 && (
                  <div className="absolute left-6 top-full w-0.5 h-6 bg-gradient-to-b from-border to-transparent"></div>
                )}
              </div>
            ))}
          </div>

          {/* Active Step Details */}
          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-surface rounded-3xl p-8 shadow-elevation-4 border border-border">
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentStep?.color} flex items-center justify-center shadow-elevation-2`}>
                  <Icon name={currentStep?.icon} size={28} color="white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">{currentStep?.title}</h3>
                  <p className="text-text-secondary">{currentStep?.subtitle}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary mb-6 leading-relaxed">
                {currentStep?.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {currentStep?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={currentStep?.route} className="flex-1">
                  <Button
                    variant="default"
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="bg-gradient-to-r from-primary to-secondary hover:shadow-elevation-3"
                  >
                    Try This Step
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  iconName="Play"
                  iconPosition="left"
                  className="sm:w-auto"
                >
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mt-6 flex justify-center space-x-2">
              {steps?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeStep === index ? 'bg-primary scale-125' : 'bg-border hover:bg-primary/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;