import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineEvent = ({ event, onViewDetails, onSetReminder, onMarkComplete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-error bg-error/10 text-error';
      case 'medium':
        return 'border-warning bg-warning/10 text-warning';
      case 'low':
        return 'border-success bg-success/10 text-success';
      default:
        return 'border-muted bg-muted/10 text-muted-foreground';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'application':
        return 'FileText';
      case 'exam':
        return 'BookOpen';
      case 'scholarship':
        return 'Award';
      case 'counseling':
        return 'Users';
      case 'document':
        return 'Folder';
      default:
        return 'Calendar';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (date) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(event?.date);
  const isOverdue = daysRemaining < 0;
  const isToday = daysRemaining === 0;
  const isUrgent = daysRemaining <= 7 && daysRemaining > 0;

  return (
    <div className={`relative bg-card border-l-4 ${getPriorityColor(event?.priority)} rounded-lg p-6 card-shadow hover-scale smooth-transition`}>
      {/* Event Status Indicator */}
      <div className="absolute top-4 right-4">
        {event?.completed ? (
          <div className="flex items-center justify-center w-8 h-8 bg-success rounded-full">
            <Icon name="Check" size={16} color="white" />
          </div>
        ) : (
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            isOverdue ? 'bg-error text-error-foreground' :
            isToday ? 'bg-warning text-warning-foreground': isUrgent ?'bg-warning/20 text-warning': 'bg-muted text-muted-foreground'
          }`}>
            {isOverdue ? 'Overdue' : isToday ?'Today' : 
             isUrgent ? `${daysRemaining} days left` : 
             `${daysRemaining} days`}
          </div>
        )}
      </div>
      {/* Event Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${getPriorityColor(event?.priority)}`}>
          <Icon name={getEventTypeIcon(event?.type)} size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{event?.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{event?.description}</p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{formatDate(event?.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{event?.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{event?.location}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Event Details */}
      {event?.requirements && event?.requirements?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Requirements:</h4>
          <ul className="space-y-1">
            {event?.requirements?.slice(0, 3)?.map((req, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="CheckCircle2" size={14} />
                <span>{req}</span>
              </li>
            ))}
            {event?.requirements?.length > 3 && (
              <li className="text-sm text-primary cursor-pointer" onClick={() => onViewDetails(event)}>
                +{event?.requirements?.length - 3} more requirements
              </li>
            )}
          </ul>
        </div>
      )}
      {/* Progress Bar */}
      {event?.progress !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{event?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full smooth-transition"
              style={{ width: `${event?.progress}%` }}
            />
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(event)}
          >
            View Details
          </Button>
          {!event?.completed && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              iconPosition="left"
              onClick={() => onSetReminder(event)}
            >
              Set Reminder
            </Button>
          )}
        </div>
        {!event?.completed && (
          <Button
            variant="success"
            size="sm"
            iconName="Check"
            iconPosition="left"
            onClick={() => onMarkComplete(event)}
          >
            Mark Complete
          </Button>
        )}
      </div>
    </div>
  );
};

export default TimelineEvent;