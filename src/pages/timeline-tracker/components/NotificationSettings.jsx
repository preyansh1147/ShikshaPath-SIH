import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const NotificationSettings = ({ isOpen, onClose, onSave, currentSettings }) => {
  const [settings, setSettings] = useState(currentSettings || {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    reminderTiming: {
      applications: '7', // days before
      exams: '14',
      scholarships: '10',
      counseling: '3',
      documents: '5'
    },
    dailyDigest: true,
    weeklyReport: true,
    urgentAlerts: true
  });

  const reminderOptions = [
    { value: '1', label: '1 day before' },
    { value: '3', label: '3 days before' },
    { value: '5', label: '5 days before' },
    { value: '7', label: '1 week before' },
    { value: '14', label: '2 weeks before' },
    { value: '30', label: '1 month before' }
  ];

  const eventTypes = [
    { key: 'applications', label: 'College Applications', icon: 'FileText' },
    { key: 'exams', label: 'Entrance Exams', icon: 'BookOpen' },
    { key: 'scholarships', label: 'Scholarship Deadlines', icon: 'Award' },
    { key: 'counseling', label: 'Counseling Sessions', icon: 'Users' },
    { key: 'documents', label: 'Document Submissions', icon: 'Folder' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReminderTimingChange = (eventType, value) => {
    setSettings(prev => ({
      ...prev,
      reminderTiming: {
        ...prev?.reminderTiming,
        [eventType]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center" >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-card rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto card-shadow" style={{marginTop:"70px"}}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Bell" size={24} />
            <span>Notification Settings</span>
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Notification Channels */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Notification Channels</h3>
          <div className="space-y-4">
            <Checkbox
              label="Email Notifications"
              description="Receive notifications via email"
              checked={settings?.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e?.target?.checked)}
            />
            
            <Checkbox
              label="Push Notifications"
              description="Receive browser push notifications"
              checked={settings?.pushNotifications}
              onChange={(e) => handleSettingChange('pushNotifications', e?.target?.checked)}
            />
            
            <Checkbox
              label="SMS Notifications"
              description="Receive notifications via SMS (charges may apply)"
              checked={settings?.smsNotifications}
              onChange={(e) => handleSettingChange('smsNotifications', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Reminder Timing */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Reminder Timing</h3>
          <div className="space-y-4">
            {eventTypes?.map(eventType => (
              <div key={eventType?.key} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name={eventType?.icon} size={20} />
                  <span className="font-medium text-foreground">{eventType?.label}</span>
                </div>
                <div className="w-48">
                  <Select
                    options={reminderOptions}
                    value={settings?.reminderTiming?.[eventType?.key]}
                    onChange={(value) => handleReminderTimingChange(eventType?.key, value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Additional Settings</h3>
          <div className="space-y-4">
            <Checkbox
              label="Daily Digest"
              description="Receive a daily summary of upcoming events"
              checked={settings?.dailyDigest}
              onChange={(e) => handleSettingChange('dailyDigest', e?.target?.checked)}
            />
            
            <Checkbox
              label="Weekly Report"
              description="Receive a weekly report of your progress"
              checked={settings?.weeklyReport}
              onChange={(e) => handleSettingChange('weeklyReport', e?.target?.checked)}
            />
            
            <Checkbox
              label="Urgent Alerts"
              description="Receive immediate alerts for high-priority deadlines"
              checked={settings?.urgentAlerts}
              onChange={(e) => handleSettingChange('urgentAlerts', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;