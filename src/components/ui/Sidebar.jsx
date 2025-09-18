import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Button from './Button';
import Icon from '../AppIcon';

const Sidebar = ({ isCollapsed = false, onToggle, className = '' }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      name: 'Dashboard', 
      path: '/homepage-educational-technology-platform',
      icon: 'LayoutDashboard',
      description: 'Overview & insights'
    },
    { 
      name: 'Career Discovery', 
      path: '/career-discovery-portal',
      icon: 'Compass',
      description: 'Explore career paths'
    },
    { 
      name: 'College Intelligence', 
      path: '/college-intelligence-dashboard',
      icon: 'GraduationCap',
      description: 'College insights & data'
    },
    { 
      name: 'Personal Guidance', 
      path: '/personal-guidance-center',
      icon: 'Users',
      description: 'Mentorship & support'
    },
    { 
      name: 'Resources Hub', 
      path: '/resource-timeline-hub',
      icon: 'BookOpen',
      description: 'Learning materials'
    },
    { 
      name: 'Parent Portal', 
      path: '/parent-educator-portal',
      icon: 'UserCheck',
      description: 'Family dashboard'
    },
    { 
        name: 'User Login', 
        path: '/user-login',
        icon: 'User',
        description: 'User login'
    }
  ];

  const quickActions = [
    { name: 'Take Assessment', icon: 'Target', action: 'assessment' },
    { name: 'Schedule Call', icon: 'Phone', action: 'schedule' },
    { name: 'View Progress', icon: 'TrendingUp', action: 'progress' }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement quick action handlers
  };

  const Logo = () => (
    <Link to="/homepage-educational-technology-platform" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-elevation-2 group-hover:shadow-elevation-3 transition-all duration-300">
          <Icon name="Navigation" size={16} color="white" strokeWidth={2.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
          <Icon name="Sparkles" size={6} color="white" strokeWidth={3} />
        </div>
      </div>
      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-lg font-bold text-text-primary font-inter tracking-tight">
            ShikshaPath 
          </span>
          <span className="text-xs text-text-secondary font-medium -mt-1">
            Career Guidance
          </span>
        </div>
      )}
    </Link>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Logo />
        {!isCollapsed && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-200 lg:hidden"
          >
            <Icon name="PanelLeftClose" size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="space-y-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-elevation-1'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
              title={isCollapsed ? item?.name : ''}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`}
              />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="truncate">{item?.name}</div>
                  <div className={`text-xs truncate ${
                    isActivePath(item?.path) 
                      ? 'text-primary-foreground/80' 
                      : 'text-text-secondary group-hover:text-text-primary/80'
                  }`}>
                    {item?.description}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="pt-6">
            <div className="px-3 mb-3">
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Quick Actions
              </h3>
            </div>
            <div className="space-y-1">
              {quickActions?.map((action) => (
                <button
                  key={action?.action}
                  onClick={() => handleQuickAction(action?.action)}
                  className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-all duration-200 group"
                >
                  <Icon name={action?.icon} size={16} className="mr-3 flex-shrink-0" />
                  <span className="truncate">{action?.name}</span>
                  <Icon 
                    name="ArrowRight" 
                    size={14} 
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed ? (
          <div className="space-y-3">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="MessageCircle"
              iconPosition="left"
              className="justify-center text-xs"
            >
              Get Help
            </Button>
            <Button
              variant="default"
              size="sm"
              fullWidth
              iconName="Zap"
              iconPosition="left"
              className="justify-center text-xs bg-action hover:bg-action/90"
            >
              Upgrade Plan
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              className="w-full p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-200"
              title="Get Help"
            >
              <Icon name="MessageCircle" size={18} className="mx-auto" />
            </button>
            <button
              className="w-full p-2 rounded-lg text-action hover:bg-action/10 transition-colors duration-200"
              title="Upgrade Plan"
            >
              <Icon name="Zap" size={18} className="mx-auto" />
            </button>
          </div>
        )}
        
        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className={`w-full mt-3 p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-200 hidden lg:block ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon 
            name={isCollapsed ? "PanelLeftOpen" : "PanelLeftClose"} 
            size={18} 
            className={isCollapsed ? 'mx-auto' : 'mr-2'} 
          />
          {!isCollapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex-col bg-surface border-r border-border shadow-elevation-2 transition-all duration-300 ${
          isCollapsed ? 'lg:w-16' : 'lg:w-64'
        } ${className}`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border shadow-elevation-4">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed bottom-4 left-4 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-elevation-3 lg:hidden"
        aria-label="Open sidebar"
      >
        <Icon name="Menu" size={20} />
      </button>
    </>
  );
};

export default Sidebar;