import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState('child1');

  const childrenData = [
    {
      id: 'child1',
      name: 'Arjun Sharma',
      class: 'Class 12 - Science',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      assessmentProgress: 85,
      lastActivity: '2 hours ago',
      interests: ['Engineering', 'Technology', 'Mathematics'],
      recommendedStreams: ['Computer Science', 'Mechanical Engineering', 'Data Science']
    },
    {
      id: 'child2',
      name: 'Priya Sharma',
      class: 'Class 10',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      assessmentProgress: 60,
      lastActivity: '1 day ago',
      interests: ['Arts', 'Literature', 'Psychology'],
      recommendedStreams: ['Humanities', 'Psychology', 'Mass Communication']
    }
  ];

  const currentChild = childrenData?.find(child => child?.id === selectedChild);

  const progressInsights = [
    {
      title: 'Assessment Completion',
      value: `${currentChild?.assessmentProgress}%`,
      description: 'Career aptitude and interest assessment progress',
      icon: 'Target',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'College Shortlisted',
      value: '12',
      description: 'Colleges added to wishlist based on preferences',
      icon: 'BookOpen',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Guidance Sessions',
      value: '3',
      description: 'One-on-one counseling sessions completed',
      icon: 'MessageCircle',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Resources Accessed',
      value: '28',
      description: 'Study materials and career guides downloaded',
      icon: 'Download',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      activity: 'Completed Personality Assessment',
      time: '2 hours ago',
      icon: 'CheckCircle',
      color: 'text-green-600'
    },
    {
      id: 2,
      activity: 'Explored Computer Science Careers',
      time: '1 day ago',
      icon: 'Search',
      color: 'text-blue-600'
    },
    {
      id: 3,
      activity: 'Added IIT Delhi to Wishlist',
      time: '2 days ago',
      icon: 'Heart',
      color: 'text-red-600'
    },
    {
      id: 4,
      activity: 'Downloaded JEE Preparation Guide',
      time: '3 days ago',
      icon: 'Download',
      color: 'text-purple-600'
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'JEE Main Registration',
      date: '2025-01-15',
      daysLeft: 124,
      priority: 'high',
      description: 'Last date for JEE Main 2025 registration'
    },
    {
      id: 2,
      title: 'NEET Application',
      date: '2025-02-28',
      daysLeft: 168,
      priority: 'medium',
      description: 'NEET 2025 application form submission'
    },
    {
      id: 3,
      title: 'Board Exam Preparation',
      date: '2025-03-01',
      daysLeft: 169,
      priority: 'high',
      description: 'Class 12 board examination preparation milestone'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Child Selection */}
      <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Select Child</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {childrenData?.map((child) => (
            <div
              key={child?.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedChild === child?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
              }`}
              onClick={() => setSelectedChild(child?.id)}
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={child?.avatar}
                  alt={child?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-text-primary">{child?.name}</h3>
                  <p className="text-sm text-text-secondary">{child?.class}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Progress Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {progressInsights?.map((insight, index) => (
          <div key={index} className="bg-surface rounded-xl p-6 shadow-elevation-1">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${insight?.bgColor}`}>
                <Icon name={insight?.icon} size={20} className={insight?.color} />
              </div>
              <span className="text-2xl font-bold text-text-primary">{insight?.value}</span>
            </div>
            <h3 className="font-medium text-text-primary mb-1">{insight?.title}</h3>
            <p className="text-xs text-text-secondary">{insight?.description}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Child's Interests & Recommendations */}
        <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            {currentChild?.name}'s Profile
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-text-primary mb-2">Identified Interests</h4>
              <div className="flex flex-wrap gap-2">
                {currentChild?.interests?.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-2">Recommended Career Paths</h4>
              <div className="space-y-2">
                {currentChild?.recommendedStreams?.map((stream, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="ArrowRight" size={16} className="text-emerald-600" />
                    <span className="text-sm text-text-secondary">{stream}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
              Schedule Family Discussion
            </Button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Recent Activities</h3>
            <Button variant="ghost" size="sm" iconName="ExternalLink">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentActivities?.map((activity) => (
              <div key={activity?.id} className="flex items-start space-x-3">
                <Icon name={activity?.icon} size={16} className={activity?.color} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{activity?.activity}</p>
                  <p className="text-xs text-text-secondary">{activity?.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Upcoming Deadlines */}
      <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Important Deadlines</h3>
          <Button variant="outline" size="sm" iconName="Calendar">
            View Calendar
          </Button>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingDeadlines?.map((deadline) => (
            <div
              key={deadline?.id}
              className={`p-4 rounded-lg border-l-4 ${
                deadline?.priority === 'high' ?'border-red-500 bg-red-50' :'border-yellow-500 bg-yellow-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-text-primary">{deadline?.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  deadline?.priority === 'high' ?'bg-red-100 text-red-700' :'bg-yellow-100 text-yellow-700'
                }`}>
                  {deadline?.daysLeft} days
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-2">{deadline?.description}</p>
              <p className="text-xs text-text-secondary">Due: {deadline?.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;