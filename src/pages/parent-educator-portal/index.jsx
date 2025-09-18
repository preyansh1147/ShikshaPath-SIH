import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import WelcomeSection from './components/WelcomeSection';
import ParentDashboard from './components/ParentDashboard';
import EducatorDashboard from './components/EducatorDashboard';
import ResourceLibrary from './components/ResourceLibrary';
import WebinarSection from './components/WebinarSection';
import SupportCenter from './components/SupportCenter';

const ParentEducatorPortal = () => {
  const [userType, setUserType] = useState('parent');
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigationTabs = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: 'LayoutDashboard',
      description: userType === 'parent' ? 'Monitor your child\'s progress' : 'Manage your classes'
    },
    { 
      id: 'resources', 
      name: 'Resources', 
      icon: 'BookOpen',
      description: 'Access guides and materials'
    },
    { 
      id: 'webinars', 
      name: 'Webinars', 
      icon: 'Video',
      description: 'Professional development sessions'
    },
    { 
      id: 'support', 
      name: 'Support', 
      icon: 'HelpCircle',
      description: 'Get help and find answers'
    }
  ];

  const quickStats = {
    parent: [
      { label: 'Children Tracked', value: '2', icon: 'Users', color: 'text-blue-600' },
      { label: 'Assessments Completed', value: '5', icon: 'CheckCircle', color: 'text-green-600' },
      { label: 'Resources Downloaded', value: '12', icon: 'Download', color: 'text-purple-600' },
      { label: 'Guidance Sessions', value: '3', icon: 'MessageCircle', color: 'text-orange-600' }
    ],
    educator: [
      { label: 'Students Guided', value: '135', icon: 'Users', color: 'text-blue-600' },
      { label: 'Classes Managed', value: '3', icon: 'School', color: 'text-green-600' },
      { label: 'Resources Used', value: '28', icon: 'BookOpen', color: 'text-purple-600' },
      { label: 'Webinars Attended', value: '7', icon: 'Video', color: 'text-orange-600' }
    ]
  };

  const currentStats = quickStats?.[userType];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return userType === 'parent' ? <ParentDashboard /> : <EducatorDashboard />;
      case 'resources':
        return <ResourceLibrary userType={userType} />;
      case 'webinars':
        return <WebinarSection userType={userType} />;
      case 'support':
        return <SupportCenter userType={userType} />;
      default:
        return userType === 'parent' ? <ParentDashboard /> : <EducatorDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Welcome Section */}
        <WelcomeSection userType={userType} onUserTypeChange={setUserType} />

        {/* Quick Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {currentStats?.map((stat, index) => (
              <div key={index} className="bg-surface rounded-xl p-6 shadow-elevation-1 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat?.value}</p>
                    <p className="text-sm text-text-secondary">{stat?.label}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <Icon name={stat?.icon} size={24} className={stat?.color} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="bg-surface rounded-xl p-6 shadow-elevation-1 border border-border mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4 sm:mb-0">
                {userType === 'parent' ? 'Parent Portal' : 'Educator Portal'}
              </h2>
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary capitalize">{userType} Account</span>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-border mb-6">
              <nav className="flex space-x-8 overflow-x-auto">
                {navigationTabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Description */}
            <div className="mb-6">
              <p className="text-text-secondary">
                {navigationTabs?.find(tab => tab?.id === activeTab)?.description}
              </p>
            </div>

            {/* Tab Content */}
            <div>
              {renderTabContent()}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-6 lg:mb-0 text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  {userType === 'parent' ?'Ready to Support Your Child\'s Future?' :'Enhance Your Guidance Skills?'
                  }
                </h3>
                <p className="opacity-90 max-w-2xl">
                  {userType === 'parent' ?'Join thousands of parents who are actively supporting their children\'s career decisions with data-driven insights and expert guidance.' :'Access professional development resources and connect with a community of educators dedicated to student success.'
                  }
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Button 
                  variant="outline" 
                  className="bg-white text-primary hover:bg-white/90"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  {userType === 'parent' ? 'Schedule Family Session' : 'Book Training Session'}
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white text-primary hover:bg-white/90"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Get Expert Guidance
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <p className="text-text-secondary text-sm">
                  Need to explore other sections of ShikshaPath ?
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/homepage-educational-technology-platform">
                  <Button variant="ghost" size="sm" iconName="Home" iconPosition="left">
                    Home
                  </Button>
                </Link>
                <Link to="/career-discovery-portal">
                  <Button variant="ghost" size="sm" iconName="Compass" iconPosition="left">
                    Career Discovery
                  </Button>
                </Link>
                <Link to="/college-intelligence-dashboard">
                  <Button variant="ghost" size="sm" iconName="GraduationCap" iconPosition="left">
                    College Intelligence
                  </Button>
                </Link>
                <Link to="/personal-guidance-center">
                  <Button variant="ghost" size="sm" iconName="Users" iconPosition="left">
                    Personal Guidance
                  </Button>
                </Link>
                <Link to="/resource-timeline-hub">
                  <Button variant="ghost" size="sm" iconName="BookOpen" iconPosition="left">
                    Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-text-secondary text-sm">
              © {new Date()?.getFullYear()} ShikshaPath . Empowering families and educators to guide the next generation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ParentEducatorPortal;