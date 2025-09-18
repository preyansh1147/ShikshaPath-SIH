import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [selectedUserType, setSelectedUserType] = useState('student10');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const userTypes = [
    {
      id: 'student10',
      title: 'Class 10 Student',
      subtitle: 'Choose Your Stream',
      description: 'Discover the perfect academic path with personalized stream recommendations',
      icon: 'BookOpen',
      color: 'from-blue-500 to-indigo-600',
      route: '/career-discovery-portal'
    },
    {
      id: 'student12',
      title: 'Class 12 Student',
      subtitle: 'Find Your College',
      description: 'Explore colleges and courses that align with your career goals',
      icon: 'GraduationCap',
      color: 'from-purple-500 to-pink-600',
      route: '/college-intelligence-dashboard'
    },
    {
      id: 'parent',
      title: 'Parent/Guardian',
      subtitle: 'Support Your Child',
      description: 'Get insights and tools to guide your child\'s educational journey',
      icon: 'Users',
      color: 'from-green-500 to-emerald-600',
      route: '/parent-educator-portal'
    },
    {
      id: 'educator',
      title: 'Educator',
      subtitle: 'Empower Students',
      description: 'Access resources to better counsel and support your students',
      icon: 'UserCheck',
      color: 'from-orange-500 to-red-600',
      route: '/resource-timeline-hub'
    }
  ];

  const currentUser = userTypes?.find(user => user?.id === selectedUserType);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 cultural-pattern opacity-30"></div>
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-accent/20 to-success/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-warning/20 to-error/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main Headline */}
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Icon name="Sparkles" size={16} className="mr-2" />
                India's #1 Career Guidance Platform
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Empowered Choices,
                </span>
                <br />
                <span className="text-text-primary">Limitless Futures</span>
              </h1>
              
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                Democratizing access to quality career guidance for Indian students. 
                From stream selection to college admission - your personalized journey starts here.
              </p>
            </div>

            {/* User Type Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">I am a:</h3>
              <div className="grid grid-cols-2 gap-3">
                {userTypes?.map((user) => (
                  <button
                    key={user?.id}
                    onClick={() => setSelectedUserType(user?.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedUserType === user?.id
                        ? 'border-primary bg-primary/5 shadow-elevation-2'
                        : 'border-border hover:border-primary/50 bg-surface'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${user?.color} flex items-center justify-center`}>
                        <Icon name={user?.icon} size={20} color="white" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary text-sm">{user?.title}</div>
                        <div className="text-xs text-text-secondary">{user?.subtitle}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic CTA */}
            <div className="space-y-4">
              <p className="text-text-secondary">{currentUser?.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={currentUser?.route}>
                  <Button
                    variant="default"
                    size="lg"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="bg-gradient-to-r from-primary to-secondary hover:shadow-elevation-3 transform hover:scale-105 transition-all duration-300"
                  >
                    Start Your Journey
                  </Button>
                </Link>
                <Link to="/personal-guidance-center">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="hover:bg-primary/5"
                  >
                    Talk to Expert
                  </Button>
                </Link>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Government Certified</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Users" size={16} className="text-primary" />
                <span>50,000+ Students Guided</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Award" size={16} className="text-warning" />
                <span>98% Success Rate</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-elevation-4">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Diverse Indian students collaborating on educational technology"
                  className="w-full h-96 object-cover warm-filter"
                />
                
                {/* Overlay Cards */}
                <div className="absolute top-4 left-4 bg-surface/95 backdrop-blur-sm rounded-lg p-3 shadow-elevation-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <Icon name="TrendingUp" size={16} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-primary">Career Match</div>
                      <div className="text-xs text-success">95% Accuracy</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-surface/95 backdrop-blur-sm rounded-lg p-3 shadow-elevation-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="GraduationCap" size={16} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-primary">College Found</div>
                      <div className="text-xs text-primary">Perfect Fit</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-secondary to-warning rounded-xl p-4 shadow-elevation-3 transform rotate-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">₹2.5Cr+</div>
                  <div className="text-xs text-white/80">Scholarships Secured</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-accent to-success rounded-xl p-4 shadow-elevation-3 transform -rotate-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">15,000+</div>
                  <div className="text-xs text-white/80">College Placements</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-text-secondary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-text-secondary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;