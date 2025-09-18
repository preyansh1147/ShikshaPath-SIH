import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingDeadlines = ({ events, onEventClick, onSetReminder }) => {
  const getUpcomingEvents = () => {
    const today = new Date();
    const upcoming = events?.filter(event => {
        const eventDate = new Date(event.date);
        const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 30 && !event?.completed;
      })?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 5);
    
    return upcoming;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-error bg-error/5';
      case 'medium':
        return 'border-warning bg-warning/5';
      case 'low':
        return 'border-success bg-success/5';
      default:
        return 'border-muted bg-muted/5';
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
      month: 'short'
    });
  };

  const getDaysRemaining = (date) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Clock" size={20} />
          <span>Upcoming Deadlines</span>
        </h3>
        <span className="text-sm text-muted-foreground">Next 30 days</span>
      </div>
      {/* Events List */}
      {upcomingEvents?.length > 0 ? (
        <div className="space-y-4">
          {upcomingEvents?.map((event, index) => {
            const daysRemaining = getDaysRemaining(event?.date);
            const isUrgent = daysRemaining <= 7;
            const isToday = daysRemaining === 0;

            return (
              <div
                key={event?.id}
                className={`flex items-center justify-between p-4 border-l-4 rounded-lg cursor-pointer hover-scale smooth-transition ${getPriorityColor(event?.priority)}`}
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-center space-x-4">
                  {/* Event Icon */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    event?.priority === 'high' ? 'bg-error/20 text-error' :
                    event?.priority === 'medium'? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                  }`}>
                    <Icon name={getEventTypeIcon(event?.type)} size={18} />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{event?.title}</h4>
                    <p className="text-sm text-muted-foreground">{event?.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(event?.date)} • {event?.time}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {event?.location}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Days Remaining & Actions */}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      isToday ? 'text-error' : isUrgent ?'text-warning': 'text-foreground'
                    }`}>
                      {isToday ? 'Today' : `${daysRemaining} days`}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event?.priority} priority
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Bell"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onSetReminder(event);
                    }}
                    className="opacity-0 group-hover:opacity-100 smooth-transition"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="CheckCircle2" size={48} className="text-success mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">All Caught Up!</h4>
          <p className="text-muted-foreground">No upcoming deadlines in the next 30 days.</p>
        </div>
      )}
      {/* View All Button */}
      {upcomingEvents?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <Button
            variant="outline"
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
          >
            View All Deadlines
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingDeadlines;