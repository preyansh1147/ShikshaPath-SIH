import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const EventDetailsModal = ({ event, isOpen, onClose, onSetReminder, onMarkComplete }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !event) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning';
      case 'low':
        return 'text-success bg-success/10 border-success';
      default:
        return 'text-muted-foreground bg-muted/10 border-muted';
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (date) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'requirements', label: 'Requirements', icon: 'CheckSquare' },
    { id: 'preparation', label: 'Preparation', icon: 'BookOpen' },
    { id: 'reminders', label: 'Reminders', icon: 'Bell' }
  ];

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Event Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
            <p className="text-foreground">{formatDate(event?.date)} at {event?.time}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Location</label>
            <p className="text-foreground">{event?.location}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Priority</label>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(event?.priority)}`}>
              {event?.priority?.charAt(0)?.toUpperCase() + event?.priority?.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Days Remaining</label>
            <p className="text-foreground font-semibold">{getDaysRemaining(event?.date)} days</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Status</label>
            <p className="text-foreground">
              {event?.completed ? 'Completed' : 'Pending'}
            </p>
          </div>
          
          {event?.progress !== undefined && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Progress</label>
              <ProgressIndicator progress={event?.progress} className="mt-2" />
            </div>
          )}
        </div>
      </div>
      
      {/* Description */}
      <div>
        <label className="text-sm font-medium text-muted-foreground">Description</label>
        <p className="text-foreground mt-1">{event?.description}</p>
      </div>
      
      {/* Additional Info */}
      {event?.additionalInfo && (
        <div>
          <label className="text-sm font-medium text-muted-foreground">Additional Information</label>
          <div className="mt-2 p-4 bg-muted/50 rounded-lg">
            <p className="text-foreground">{event?.additionalInfo}</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderRequirementsTab = () => (
    <div className="space-y-4">
      {event?.requirements && event?.requirements?.length > 0 ? (
        <div className="space-y-3">
          {event?.requirements?.map((requirement, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon name="CheckCircle2" size={20} className="text-success mt-0.5" />
              <div className="flex-1">
                <p className="text-foreground">{requirement}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="CheckSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No specific requirements listed for this event.</p>
        </div>
      )}
    </div>
  );

  const renderPreparationTab = () => (
    <div className="space-y-4">
      {event?.preparationSteps && event?.preparationSteps?.length > 0 ? (
        <div className="space-y-3">
          {event?.preparationSteps?.map((step, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-foreground">{step}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No preparation steps available for this event.</p>
        </div>
      )}
    </div>
  );

  const renderRemindersTab = () => (
    <div className="space-y-4">
      <div className="p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Active Reminders</h4>
        {event?.reminders && event?.reminders?.length > 0 ? (
          <div className="space-y-2">
            {event?.reminders?.map((reminder, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-card rounded">
                <span className="text-foreground">{reminder?.message}</span>
                <span className="text-sm text-muted-foreground">{reminder?.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reminders set for this event.</p>
        )}
      </div>
      
      <Button
        variant="outline"
        iconName="Plus"
        iconPosition="left"
        onClick={() => onSetReminder(event)}
        fullWidth
      >
        Add New Reminder
      </Button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden card-shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${getPriorityColor(event?.priority)}`}>
              <Icon name={getEventTypeIcon(event?.type)} size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{event?.title}</h2>
              <p className="text-sm text-muted-foreground">{event?.type?.charAt(0)?.toUpperCase() + event?.type?.slice(1)}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-8 px-6">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm smooth-transition ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab(tab?.id)}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'details' && renderDetailsTab()}
          {activeTab === 'requirements' && renderRequirementsTab()}
          {activeTab === 'preparation' && renderPreparationTab()}
          {activeTab === 'reminders' && renderRemindersTab()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              iconName="Bell"
              iconPosition="left"
              onClick={() => onSetReminder(event)}
            >
              Set Reminder
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            {!event?.completed && (
              <Button
                variant="success"
                iconName="Check"
                iconPosition="left"
                onClick={() => onMarkComplete(event)}
              >
                Mark Complete
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;