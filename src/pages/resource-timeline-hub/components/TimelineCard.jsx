import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineCard = ({ item, onMarkComplete, onViewDetails }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-accent bg-accent/10 border-accent/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'upcoming': return 'Calendar';
      default: return 'Circle';
    }
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(item?.deadline);
  const isOverdue = daysRemaining < 0;
  const isUrgent = daysRemaining <= 7 && daysRemaining >= 0;

  return (
    <div className={`bg-surface border rounded-lg p-4 transition-all duration-200 hover:shadow-elevation-2 ${
      item?.status === 'completed' ? 'opacity-75' : ''
    } ${isOverdue ? 'border-error/30 bg-error/5' : isUrgent ? 'border-warning/30 bg-warning/5' : 'border-border'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            item?.status === 'completed' ? 'bg-success/10 text-success' : 
            isOverdue ? 'bg-error/10 text-error': isUrgent ?'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
          }`}>
            <Icon name={getStatusIcon(item?.status)} size={16} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary text-sm">{item?.title}</h3>
            <p className="text-xs text-text-secondary mt-1">{item?.category}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item?.priority)}`}>
          {item?.priority}
        </div>
      </div>
      <p className="text-sm text-text-secondary mb-3 line-clamp-2">{item?.description}</p>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>{new Date(item.deadline)?.toLocaleDateString('en-IN')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span className={isOverdue ? 'text-error font-medium' : isUrgent ? 'text-warning font-medium' : ''}>
              {isOverdue ? `${Math.abs(daysRemaining)} days overdue` : 
               daysRemaining === 0 ? 'Due today' : 
               `${daysRemaining} days left`}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {item?.hasResources && (
            <div className="flex items-center space-x-1 text-xs text-accent">
              <Icon name="BookOpen" size={12} />
              <span>Resources</span>
            </div>
          )}
          {item?.hasReminder && (
            <div className="flex items-center space-x-1 text-xs text-primary">
              <Icon name="Bell" size={12} />
              <span>Reminder set</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            iconName="Eye"
            onClick={() => onViewDetails(item)}
          >
            View
          </Button>
          {item?.status !== 'completed' && (
            <Button
              variant="outline"
              size="xs"
              iconName="Check"
              onClick={() => onMarkComplete(item?.id)}
            >
              Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;