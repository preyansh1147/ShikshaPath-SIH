import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Button from './Button';
import Icon from '../AppIcon';

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      name: 'Home', 
      path: '/homepage-educational-technology-platform',
      icon: 'Home'
    },
    { 
      name: 'Career Discovery', 
      path: '/career-discovery-portal',
      icon: 'Compass'
    },
    { 
      name: 'College Intelligence', 
      path: '/college-intelligence-dashboard',
      icon: 'GraduationCap'
    },
    { 
      name: 'Personal Guidance', 
      path: '/personal-guidance-center',
      icon: 'Users'
    },
    { 
      name: 'Resources', 
      path: '/resource-timeline-hub',
      icon: 'BookOpen'
    }
  ];

  const secondaryItems = [
    { 
      name: 'Parent Portal', 
      path: '/parent-educator-portal',
      icon: 'UserCheck'
    },
    { 
        name: 'User Login', 
        path: '/user-login',
        icon: 'User',
    },
    {
        name: 'Timeline Tracker',
        path: '/timeline-tracker',
        icon: 'Calendar',
    },
    {
        name: 'User Dashboard',
        path: '/user-dashboard',
        icon: 'User',
    },
    {
        name: "Aptitude Assessment Quiz",
        path: '/aptitude-assessment-quiz',
        icon: 'Target',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <Link to="/homepage-educational-technology-platform" className="flex items-center space-x-3 group">
      {/* <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-elevation-2 group-hover:shadow-elevation-3 transition-all duration-300">
          <Icon name="Navigation" size={20} color="white" strokeWidth={2.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
          <Icon name="Sparkles" size={8} color="white" strokeWidth={3} />
        </div>
      </div> */}
      <img src="/assets/images/shikshapath-logo.png" alt="ShikshaPath" className="w-20 h-20" />
      <div className="flex flex-col">
        <span className="text-xl font-bold text-text-primary font-inter tracking-tight">
          ShikshaPath
        </span>
        <span className="text-xs text-text-secondary font-medium -mt-1">
          Taleem Se Tarakki Tak
        </span>
      </div>
    </Link>
  );
  const navigate = useNavigate();

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-surface/95 backdrop-blur-custom shadow-elevation-2 border-b border-border' 
          : 'bg-surface/80 backdrop-blur-sm'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-all duration-200">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface rounded-lg shadow-elevation-3 border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                        isActivePath(item?.path)
                          ? 'bg-primary/10 text-primary font-medium' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              className="text-text-secondary hover:text-text-primary"
            >
              Get Guidance
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate('/aptitude-assessment-quiz')}
              iconName="ArrowRight"
              iconPosition="right"
              className="bg-action hover:bg-action/90"
            >
              Start Assessment
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div 
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100' :'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-surface border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* Secondary Items */}
            <div className="pt-2 border-t border-border">
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-elevation-1'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </div>
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3">
              <Button
                variant="outline"
                fullWidth
                iconName="MessageCircle"
                iconPosition="left"
                className="justify-center"
              >
                Get Guidance
              </Button>
              <Button
                variant="default"
                fullWidth
                onClick={() => navigate('/aptitude-assessment-quiz')}
                iconName="ArrowRight"
                iconPosition="right"
                className="justify-center bg-action hover:bg-action/90"
              >
                Start Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;