import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from './Button';

const QuickActionButton = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getContextualActions = () => {
    const path = location?.pathname;
    
    switch (path) {
      case '/personalized-dashboard':
        return [
          { label: 'Take Assessment', icon: 'ClipboardCheck', action: () => navigate('/assessment-quiz') },
          { label: 'View Courses', icon: 'BookOpen', action: () => navigate('/course-recommendations') },
          { label: 'Compare Colleges', icon: 'Building2', action: () => navigate('/college-comparison') },
        ];
      case '/assessment-quiz':
        return [
          { label: 'View Dashboard', icon: 'LayoutDashboard', action: () => navigate('/personalized-dashboard') },
          { label: 'Save Progress', icon: 'Save', action: () => console.log('Save progress') },
        ];
      case '/course-recommendations':
        return [
          { label: 'Compare Colleges', icon: 'Building2', action: () => navigate('/college-comparison') },
          { label: 'View Timeline', icon: 'Calendar', action: () => navigate('/timeline-tracker') },
          { label: 'Save Course', icon: 'Heart', action: () => console.log('Save course') },
        ];
      case '/college-comparison':
        return [
          { label: 'View Courses', icon: 'BookOpen', action: () => navigate('/course-recommendations') },
          { label: 'Add to Timeline', icon: 'Calendar', action: () => navigate('/timeline-tracker') },
          { label: 'Save Comparison', icon: 'Bookmark', action: () => console.log('Save comparison') },
        ];
      case '/timeline-tracker':
        return [
          { label: 'Add Deadline', icon: 'Plus', action: () => console.log('Add deadline') },
          { label: 'View Resources', icon: 'Library', action: () => navigate('/resource-library') },
        ];
      case '/resource-library':
        return [
          { label: 'View Dashboard', icon: 'LayoutDashboard', action: () => navigate('/personalized-dashboard') },
          { label: 'Download Resource', icon: 'Download', action: () => console.log('Download resource') },
        ];
      default:
        return [
          { label: 'Go to Dashboard', icon: 'LayoutDashboard', action: () => navigate('/personalized-dashboard') },
        ];
    }
  };

  const actions = getContextualActions();
  const primaryAction = actions?.[0];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleActionClick = (action) => {
    action?.action();
    setIsExpanded(false);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-90 ${className}`}>
      {/* Expanded Actions */}
      {isExpanded && actions?.length > 1 && (
        <div className="mb-4 space-y-2">
          {actions?.slice(1)?.reverse()?.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-end animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="mr-3 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md card-shadow whitespace-nowrap">
                {action?.label}
              </span>
              <Button
                variant="secondary"
                size="icon"
                iconName={action?.icon}
                onClick={() => handleActionClick(action)}
                className="w-12 h-12 rounded-full elevated-shadow hover-scale"
              />
            </div>
          ))}
        </div>
      )}
      {/* Main Action Button */}
      <div className="flex items-center justify-end">
        {isExpanded && (
          <span className="mr-3 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md card-shadow whitespace-nowrap animate-fade-in">
            {primaryAction?.label}
          </span>
        )}
        <div className="relative">
          <Button
            variant="default"
            size="icon"
            iconName={primaryAction?.icon}
            onClick={() => handleActionClick(primaryAction)}
            className="w-14 h-14 rounded-full elevated-shadow hover-scale"
          />
          
          {/* Expand/Collapse Button */}
          {actions?.length > 1 && (
            <Button
              variant="outline"
              size="icon"
              iconName={isExpanded ? 'X' : 'Plus'}
              onClick={toggleExpanded}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card border-2 border-background smooth-transition"
            />
          )}
        </div>
      </div>
      {/* Backdrop for mobile */}
      {isExpanded && (
        <div
          className="fixed inset-0 -z-10 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default QuickActionButton;