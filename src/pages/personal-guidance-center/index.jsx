import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ChatInterface from './components/ChatInterface';
import ExpertConnect from './components/ExpertConnect';
import GroupSessions from './components/GroupSessions';
import PeerCommunity from './components/PeerCommunity';
import ParentResources from './components/ParentResources';

const PersonalGuidanceCenter = () => {
  const [activeTab, setActiveTab] = useState('chat');

  const tabs = [
    { id: 'chat', name: 'AI Chat Assistant', icon: 'Bot', description: 'Get instant answers to your queries' },
    { id: 'experts', name: 'Expert Counselors', icon: 'Users', description: 'Book sessions with certified counselors' },
    { id: 'groups', name: 'Group Sessions', icon: 'Video', description: 'Join interactive guidance sessions' },
    { id: 'community', name: 'Peer Community', icon: 'MessageSquare', description: 'Connect with fellow students' },
    { id: 'parents', name: 'Parent Resources', icon: 'Heart', description: 'Guidance materials for families' }
  ];

  const quickStats = [
    { label: 'Students Helped', value: '50,000+', icon: 'Users', color: 'text-primary' },
    { label: 'Expert Counselors', value: '200+', icon: 'UserCheck', color: 'text-secondary' },
    { label: 'Success Stories', value: '15,000+', icon: 'Trophy', color: 'text-success' },
    { label: 'Response Time', value: '<2 min', icon: 'Clock', color: 'text-accent' }
  ];

  const urgentActions = [
    { 
      id: 1, 
      title: 'JEE Main Registration Deadline', 
      description: 'Last date: September 30, 2025', 
      icon: 'AlertTriangle', 
      color: 'text-destructive',
      action: 'Register Now'
    },
    { 
      id: 2, 
      title: 'NEET Application Form', 
      description: 'Applications open until October 15, 2025', 
      icon: 'Calendar', 
      color: 'text-warning',
      action: 'Apply Now'
    },
    { 
      id: 3, 
      title: 'Scholarship Deadline Alert', 
      description: 'Merit scholarships closing soon', 
      icon: 'Award', 
      color: 'text-accent',
      action: 'View Details'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'experts':
        return <ExpertConnect />;
      case 'groups':
        return <GroupSessions />;
      case 'community':
        return <PeerCommunity />;
      case 'parents':
        return <ParentResources />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <Icon name="Sparkles" size={16} className="mr-2" />
                24/7 Guidance Support Available
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                Your Personal Guidance
                <span className="block text-primary">Support System</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                Get instant AI-powered guidance, connect with expert counselors, and join a supportive community 
                of students and parents navigating India's education landscape together.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {quickStats?.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface shadow-elevation-1 mb-3 ${stat?.color}`}>
                      <Icon name={stat?.icon} size={20} />
                    </div>
                    <div className="text-2xl font-bold text-text-primary">{stat?.value}</div>
                    <div className="text-sm text-text-secondary">{stat?.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgent Actions */}
            <div className="bg-surface rounded-xl border border-border shadow-elevation-2 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary flex items-center">
                  <Icon name="Bell" size={20} className="mr-2 text-destructive" />
                  Urgent Action Items
                </h3>
                <Button variant="outline" size="sm" iconName="Settings">
                  Manage Alerts
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {urgentActions?.map((action) => (
                  <div key={action?.id} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-surface flex items-center justify-center ${action?.color}`}>
                      <Icon name={action?.icon} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text-primary text-sm">{action?.title}</h4>
                      <p className="text-xs text-text-secondary mt-1">{action?.description}</p>
                      <Button variant="outline" size="sm" className="mt-2 text-xs">
                        {action?.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-surface border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-3 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <div className="text-left">
                    <div>{tab?.name}</div>
                    <div className="text-xs opacity-75">{tab?.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {renderTabContent()}
          </div>
        </section>

        {/* Quick Access Footer */}
        <section className="bg-gradient-to-r from-primary to-secondary py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with urgent queries about admissions, 
              deadlines, and career guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                iconName="Phone"
                iconPosition="left"
                className="bg-surface text-text-primary hover:bg-surface/90"
              >
                Call Support: 1800-123-4567
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Live Chat Support
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/80">
              <Link to="/career-discovery-portal" className="hover:text-primary-foreground transition-colors duration-200">
                Career Discovery
              </Link>
              <Link to="/college-intelligence-dashboard" className="hover:text-primary-foreground transition-colors duration-200">
                College Intelligence
              </Link>
              <Link to="/resource-timeline-hub" className="hover:text-primary-foreground transition-colors duration-200">
                Resources Hub
              </Link>
              <Link to="/parent-educator-portal" className="hover:text-primary-foreground transition-colors duration-200">
                Parent Portal
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PersonalGuidanceCenter;