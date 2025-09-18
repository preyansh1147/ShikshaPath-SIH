import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    placements: 0,
    scholarships: 0,
    successRate: 0
  });
  const sectionRef = useRef(null);

  const finalStats = {
    students: 52847,
    placements: 15234,
    scholarships: 25000000,
    successRate: 98
  };

  const statsData = [
    {
      key: 'students',
      label: 'Active Students',
      value: animatedStats?.students,
      suffix: '+',
      icon: 'Users',
      color: 'from-blue-500 to-indigo-600',
      description: 'Students actively using our platform'
    },
    {
      key: 'placements',
      label: 'Successful Placements',
      value: animatedStats?.placements,
      suffix: '+',
      icon: 'GraduationCap',
      color: 'from-green-500 to-emerald-600',
      description: 'Students placed in their dream colleges'
    },
    {
      key: 'scholarships',
      label: 'Scholarships Secured',
      value: `₹${(animatedStats?.scholarships / 10000000)?.toFixed(1)}Cr`,
      suffix: '+',
      icon: 'Award',
      color: 'from-orange-500 to-red-600',
      description: 'Total scholarship amount secured'
    },
    {
      key: 'successRate',
      label: 'Success Rate',
      value: animatedStats?.successRate,
      suffix: '%',
      icon: 'TrendingUp',
      color: 'from-purple-500 to-pink-600',
      description: 'Students achieving their goals'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef?.current) {
      observer?.observe(sectionRef?.current);
    }

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setAnimatedStats({
          students: Math.floor(finalStats?.students * easeOutQuart),
          placements: Math.floor(finalStats?.placements * easeOutQuart),
          scholarships: Math.floor(finalStats?.scholarships * easeOutQuart),
          successRate: Math.floor(finalStats?.successRate * easeOutQuart)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedStats(finalStats);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="cultural-pattern"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
            <Icon name="BarChart3" size={16} className="mr-2" />
            Real-Time Impact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Transforming Lives Across India
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Our platform continues to make a meaningful impact on students' educational journeys every day
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData?.map((stat, index) => (
            <div
              key={stat?.key}
              className={`relative group transition-all duration-500 delay-${index * 100} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-elevation-3">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat?.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={stat?.icon} size={24} color="white" />
                </div>

                {/* Value */}
                <div className="mb-2">
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {typeof stat?.value === 'string' ? stat?.value : stat?.value?.toLocaleString('en-IN')}
                    <span className="text-xl text-white/60">{stat?.suffix}</span>
                  </div>
                </div>

                {/* Label */}
                <div className="text-white/90 font-semibold text-lg mb-2">
                  {stat?.label}
                </div>

                {/* Description */}
                <div className="text-white/60 text-sm">
                  {stat?.description}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Updates Indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-white/60 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Live updates • Last updated: {new Date()?.toLocaleTimeString('en-IN')}</span>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">28 States</div>
            <div className="text-white/60">Pan-India Presence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">12 Languages</div>
            <div className="text-white/60">Multilingual Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/60">Expert Guidance</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;