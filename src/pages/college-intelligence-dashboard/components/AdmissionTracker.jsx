import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdmissionTracker = ({ applications, onUpdateStatus, onAddDeadline }) => {
  const [activeTab, setActiveTab] = useState('deadlines');

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'waitlisted': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-300 bg-gray-50';
    }
  };

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', color: 'text-red-600' };
    if (diffDays === 0) return { text: 'Today', color: 'text-red-600' };
    if (diffDays === 1) return { text: '1 day left', color: 'text-orange-600' };
    if (diffDays <= 7) return { text: `${diffDays} days left`, color: 'text-orange-600' };
    if (diffDays <= 30) return { text: `${diffDays} days left`, color: 'text-blue-600' };
    return { text: `${diffDays} days left`, color: 'text-green-600' };
  };

  const upcomingDeadlines = applications?.filter(app => new Date(app.deadline) > new Date())?.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))?.slice(0, 5);

  const recentUpdates = applications?.filter(app => app?.lastUpdated)?.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))?.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-elevation-2 border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-text-primary">Admission Tracker</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={onAddDeadline}
        >
          Add Deadline
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('deadlines')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'deadlines' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="Clock" size={16} className="inline mr-2" />
          Upcoming Deadlines
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'applications' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="FileText" size={16} className="inline mr-2" />
          Application Status
        </button>
        <button
          onClick={() => setActiveTab('updates')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'updates' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="Bell" size={16} className="inline mr-2" />
          Recent Updates
        </button>
      </div>
      {/* Content */}
      <div className="p-6">
        {activeTab === 'deadlines' && (
          <div className="space-y-4">
            {upcomingDeadlines?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No Upcoming Deadlines</h3>
                <p className="text-text-secondary">Add your college application deadlines to track them here</p>
              </div>
            ) : (
              upcomingDeadlines?.map((app, index) => {
                const timeRemaining = getTimeRemaining(app?.deadline);
                return (
                  <div
                    key={index}
                    className={`border-l-4 p-4 rounded-r-lg ${getPriorityColor(app?.priority)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary">{app?.collegeName}</h4>
                        <p className="text-sm text-text-secondary">{app?.course}</p>
                        <p className="text-xs text-text-secondary mt-1">
                          Deadline: {new Date(app.deadline)?.toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${timeRemaining?.color}`}>
                          {timeRemaining?.text}
                        </div>
                        <div className="text-xs text-text-secondary mt-1">
                          {app?.documentsRequired} docs required
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex space-x-2">
                        {app?.documents?.map((doc, docIndex) => (
                          <span
                            key={docIndex}
                            className={`px-2 py-1 text-xs rounded-full ${
                              doc?.submitted 
                                ? 'bg-green-100 text-green-800' :'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {doc?.name}
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="xs"
                        iconName="ExternalLink"
                        iconPosition="right"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-4">
            {applications?.map((app, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-text-primary">{app?.collegeName}</h4>
                    <p className="text-sm text-text-secondary">{app?.course}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app?.status)}`}>
                    {app?.status?.charAt(0)?.toUpperCase() + app?.status?.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Application ID:</span>
                    <span className="ml-2 font-mono">{app?.applicationId}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Submitted:</span>
                    <span className="ml-2">{new Date(app.submittedDate)?.toLocaleDateString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Fee Paid:</span>
                    <span className="ml-2">₹{app?.applicationFee}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Next Step:</span>
                    <span className="ml-2">{app?.nextStep}</span>
                  </div>
                </div>

                {app?.status === 'accepted' && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <Icon name="CheckCircle" size={16} className="text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        Congratulations! You've been accepted.
                      </span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Confirm your admission by {new Date(app.confirmationDeadline)?.toLocaleDateString('en-IN')}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="space-y-4">
            {recentUpdates?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Bell" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No Recent Updates</h3>
                <p className="text-text-secondary">Application status updates will appear here</p>
              </div>
            ) : (
              recentUpdates?.map((update, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Bell" size={16} className="text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary">{update?.collegeName}</h4>
                    <p className="text-sm text-text-secondary">{update?.updateMessage}</p>
                    <p className="text-xs text-text-secondary mt-1">
                      {new Date(update.lastUpdated)?.toLocaleDateString('en-IN')} at{' '}
                      {new Date(update.lastUpdated)?.toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionTracker;