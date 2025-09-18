import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'deadline',
      title: 'Application Deadline Alert',
      message: 'IIT JEE Advanced registration closes in 5 days. Don\'t miss out!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
      priority: 'high',
      actionText: 'Apply Now',
      actionUrl: '/applications'
    },
    {
      id: 2,
      type: 'scholarship',
      title: 'New Scholarship Opportunity',
      message: 'Merit-based scholarship for Engineering students - Up to ₹2,00,000',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      priority: 'medium',
      actionText: 'View Details',
      actionUrl: '/scholarships'
    },
    {
      id: 3,
      type: 'recommendation',
      title: 'New College Matches Found',
      message: 'Based on your assessment, we found 3 new college recommendations',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      priority: 'low',
      actionText: 'View Matches',
      actionUrl: '/recommendations'
    },
    {
      id: 4,
      type: 'update',
      title: 'Profile Completion Reminder',
      message: 'Complete your profile to get better recommendations (75% done)',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: true,
      priority: 'medium',
      actionText: 'Complete Profile',
      actionUrl: '/profile'
    }
  ]);

  const unreadCount = notifications?.filter(n => !n?.isRead)?.length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'deadline': return 'Clock';
      case 'scholarship': return 'Award';
      case 'recommendation': return 'Lightbulb';
      case 'update': return 'Info';
      default: return 'Bell';
    }
  };

  const getPriorityColor = (priority, isRead) => {
    if (isRead) return 'text-muted-foreground';
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-primary';
      default: return 'text-foreground';
    }
  };

  const getPriorityBg = (priority, isRead) => {
    if (isRead) return 'bg-muted/50';
    switch (priority) {
      case 'high': return 'bg-error/10';
      case 'medium': return 'bg-warning/10';
      case 'low': return 'bg-primary/10';
      default: return 'bg-muted';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const dismissNotification = (notificationId) => {
    setNotifications(prev => 
      prev?.filter(notification => notification?.id !== notificationId)
    );
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Icon name="Bell" size={20} className="text-primary" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
          <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAllAsRead}
            className="text-primary hover:text-primary/80"
          >
            Mark all read
          </Button>
        )}
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {notifications?.length > 0 ? (
          notifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`relative p-4 rounded-lg border transition-all duration-200 hover:shadow-soft ${
                notification?.isRead 
                  ? 'border-border bg-muted/30' :'border-primary/20 bg-primary/5'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${getPriorityBg(notification?.priority, notification?.isRead)}`}>
                  <Icon 
                    name={getNotificationIcon(notification?.type)} 
                    size={16} 
                    className={getPriorityColor(notification?.priority, notification?.isRead)}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium ${
                      notification?.isRead ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {notification?.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(notification?.timestamp)}
                      </span>
                      <button
                        onClick={() => dismissNotification(notification?.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {notification?.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      onClick={() => markAsRead(notification?.id)}
                    >
                      {notification?.actionText}
                    </Button>
                    
                    {!notification?.isRead && (
                      <button
                        onClick={() => markAsRead(notification?.id)}
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>

                {!notification?.isRead && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">All caught up!</h3>
            <p className="text-sm text-muted-foreground">
              No new notifications at the moment.
            </p>
          </div>
        )}
      </div>
      {notifications?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left">
            Notification Settings
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;