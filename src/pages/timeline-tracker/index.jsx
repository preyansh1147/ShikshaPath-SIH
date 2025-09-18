import React, { useEffect, useState } from 'react';

import Button from '../../components/ui/Button';
import CalendarView from './components/CalendarView';
import EventDetailsModal from './components/EventDetailsModal';
import EventFilters from './components/EventFilters';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import NotificationSettings from './components/NotificationSettings';
import QuickActionButton from '../../components/ui/QuickActionButton';
import TimelineEvent from './components/TimelineEvent';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import { useNavigate } from 'react-router-dom';

const TimelineTracker = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('timeline'); // 'timeline' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState({
    type: 'all',
    priority: 'all',
    status: 'all',
    timeRange: 'all',
    search: ''
  });
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  // Mock events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "JEE Main Application Deadline",
      description: "Last date to submit JEE Main application form with late fee",
      type: "application",
      priority: "high",
      date: "2025-01-15",
      time: "11:59 PM",
      location: "Online Portal",
      completed: false,
      progress: 75,
      requirements: [
        "Class 12 marksheet or equivalent",
        "Category certificate (if applicable)",
        "Passport size photographs",
        "Application fee payment",
        "Valid email ID and mobile number"
      ],
      preparationSteps: [
        "Gather all required documents",
        "Create account on official website",
        "Fill application form carefully",
        "Upload documents in specified format",
        "Pay application fee",
        "Take printout of confirmation page"
      ],
      additionalInfo: "Late fee of ₹1000 applicable after regular deadline. Ensure all documents are in PDF format and within size limits.",
      reminders: [
        { message: "Application deadline in 3 days", time: "2025-01-12 09:00 AM" }
      ]
    },
    {
      id: 2,
      title: "NEET UG Registration Opens",
      description: "Registration for NEET UG 2025 examination begins",
      type: "exam",
      priority: "high",
      date: "2025-01-20",
      time: "10:00 AM",
      location: "Online Portal",
      completed: false,
      progress: 0,
      requirements: [
        "Class 12 passing certificate",
        "Date of birth certificate",
        "Category certificate (if applicable)",
        "PwD certificate (if applicable)",
        "Passport size photographs"
      ],
      preparationSteps: [
        "Check eligibility criteria",
        "Prepare required documents",
        "Create account on NTA website",
        "Keep application fee ready",
        "Read instructions carefully"
      ],
      additionalInfo: "Registration will be open for 4 weeks. Early registration recommended to avoid last-minute rush."
    },
    {
      id: 3,
      title: "State Scholarship Application",
      description: "Apply for state government merit-cum-means scholarship",
      type: "scholarship",
      priority: "medium",
      date: "2025-01-25",
      time: "05:00 PM",
      location: "State Portal",
      completed: false,
      progress: 40,
      requirements: [
        "Income certificate (latest)",
        "Caste certificate (if applicable)",
        "Previous year marksheet",
        "Bank account details",
        "Aadhar card copy"
      ],
      preparationSteps: [
        "Check income eligibility",
        "Obtain income certificate",
        "Gather academic documents",
        "Open bank account if needed",
        "Fill application online"
      ],
      additionalInfo: "Scholarship amount varies from ₹10,000 to ₹50,000 based on family income and academic performance."
    },
    {
      id: 4,
      title: "College Counseling Session",
      description: "Attend mandatory counseling session for admission process",
      type: "counseling",
      priority: "medium",
      date: "2025-01-30",
      time: "02:00 PM",
      location: "Government College, Delhi",
      completed: false,
      progress: 20,
      requirements: [
        "Counseling call letter",
        "Original certificates",
        "Photocopies of all documents",
        "Counseling fee receipt",
        "Choice filling form"
      ],
      preparationSteps: [
        "Download counseling letter",
        "Prepare document checklist",
        "Research college preferences",
        "Plan travel arrangements",
        "Carry sufficient copies"
      ],
      additionalInfo: "Counseling will be conducted in multiple rounds. Bring original documents for verification."
    },
    {
      id: 5,
      title: "Document Verification",
      description: "Submit original documents for verification at admission office",
      type: "document",
      priority: "low",
      date: "2025-02-05",
      time: "11:00 AM",
      location: "Admission Office",
      completed: true,
      progress: 100,
      requirements: [
        "Class 10 certificate",
        "Class 12 certificate",
        "Transfer certificate",
        "Character certificate",
        "Migration certificate"
      ],
      preparationSteps: [
        "Collect all original certificates",
        "Make photocopies",
        "Arrange documents in order",
        "Carry document checklist",
        "Reach venue on time"
      ],
      additionalInfo: "Document verification completed successfully. Admission confirmed."
    },
    {
      id: 6,
      title: "CUET Application Deadline",
      description: "Last date to apply for Common University Entrance Test",
      type: "application",
      priority: "high",
      date: "2025-02-10",
      time: "11:59 PM",
      location: "Online Portal",
      completed: false,
      progress: 60,
      requirements: [
        "Class 12 marksheet",
        "Category certificate",
        "Passport size photo",
        "Signature image",
        "Application fee"
      ],
      preparationSteps: [
        "Choose subjects and universities",
        "Prepare required documents",
        "Fill application form",
        "Upload documents",
        "Pay application fee"
      ],
      additionalInfo: "CUET is mandatory for admission to central universities. Choose subjects carefully."
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    reminderTiming: {
      applications: '7',
      exams: '14',
      scholarships: '10',
      counseling: '3',
      documents: '5'
    },
    dailyDigest: true,
    weeklyReport: true,
    urgentAlerts: true
  });

  // Filter events based on current filters
  const getFilteredEvents = () => {
    return events?.filter(event => {
      // Type filter
      if (filters?.type !== 'all' && event?.type !== filters?.type) return false;
      
      // Priority filter
      if (filters?.priority !== 'all' && event?.priority !== filters?.priority) return false;
      
      // Status filter
      if (filters?.status !== 'all') {
        const today = new Date();
        const eventDate = new Date(event.date);
        const isOverdue = eventDate < today && !event?.completed;
        
        if (filters?.status === 'completed' && !event?.completed) return false;
        if (filters?.status === 'pending' && event?.completed) return false;
        if (filters?.status === 'overdue' && !isOverdue) return false;
      }
      
      // Time range filter
      if (filters?.timeRange !== 'all') {
        const today = new Date();
        const eventDate = new Date(event.date);
        const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
        
        if (filters?.timeRange === 'today' && diffDays !== 0) return false;
        if (filters?.timeRange === 'week' && (diffDays < 0 || diffDays > 7)) return false;
        if (filters?.timeRange === 'month' && (diffDays < 0 || diffDays > 30)) return false;
        if (filters?.timeRange === 'upcoming' && diffDays < 0) return false;
      }
      
      // Search filter
      if (filters?.search && !event?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && 
          !event?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };

  // Get event counts for filter display
  const getEventCounts = () => {
    const today = new Date();
    return {
      total: events?.length,
      filtered: getFilteredEvents()?.length,
      today: events?.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate?.toDateString() === today?.toDateString();
      })?.length,
      week: events?.filter(event => {
        const eventDate = new Date(event.date);
        const diffDays = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 7;
      })?.length,
      highPriority: events?.filter(event => event?.priority === 'high')?.length,
      overdue: events?.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate < today && !event?.completed;
      })?.length
    };
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleSetReminder = (event) => {
    // Mock reminder functionality
    console.log('Setting reminder for:', event?.title);
    // In a real app, this would integrate with notification system
  };

  const handleMarkComplete = (event) => {
    setEvents(prev => prev?.map(e => 
      e?.id === event?.id ? { ...e, completed: true, progress: 100 } : e
    ));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      priority: 'all',
      status: 'all',
      timeRange: 'all',
      search: ''
    });
  };

  const handleSaveNotificationSettings = (settings) => {
    setNotificationSettings(settings);
    // In a real app, this would save to backend
    console.log('Notification settings saved:', settings);
  };

  const filteredEvents = getFilteredEvents();
  const eventCounts = getEventCounts();

  return (
    <div className="min-h-screen bg-background mt-5 pt-5">
      <Header />
      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Timeline Tracker</h1>
            <p className="text-muted-foreground">
              Stay on top of your academic deadlines and important milestones
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* View Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={activeView === 'timeline' ? 'default' : 'ghost'}
                size="sm"
                iconName="List"
                iconPosition="left"
                onClick={() => setActiveView('timeline')}
              >
                Timeline
              </Button>
              <Button
                variant={activeView === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => setActiveView('calendar')}
              >
                Calendar
              </Button>
            </div>
            
            {/* Notification Settings */}
            <Button
              variant="outline"
              iconName="Settings"
              iconPosition="left"
              onClick={() => setShowNotificationSettings(true)}
            >
              Notifications
            </Button>
          </div>
        </div>

        {/* Filters */}
        <EventFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          eventCounts={eventCounts}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Primary Content */}
          <div className="lg:col-span-2">
            {activeView === 'timeline' ? (
              <div className="space-y-6">
                {filteredEvents?.length > 0 ? (
                  filteredEvents?.map(event => (
                    <TimelineEvent
                      key={event?.id}
                      event={event}
                      onViewDetails={handleViewDetails}
                      onSetReminder={handleSetReminder}
                      onMarkComplete={handleMarkComplete}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Calendar" size={64} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No Events Found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or add new events to your timeline.
                    </p>
                    <Button
                      variant="default"
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => navigate('/personalized-dashboard')}
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <CalendarView
                events={events}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                onEventClick={handleViewDetails}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <UpcomingDeadlines
              events={events}
              onEventClick={handleViewDetails}
              onSetReminder={handleSetReminder}
            />

            {/* Quick Stats */}
            <div className="bg-card rounded-lg p-6 card-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Events</span>
                  <span className="font-semibold text-foreground">{eventCounts?.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">This Week</span>
                  <span className="font-semibold text-foreground">{eventCounts?.week}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">High Priority</span>
                  <span className="font-semibold text-error">{eventCounts?.highPriority}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Overdue</span>
                  <span className="font-semibold text-warning">{eventCounts?.overdue}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-lg p-6 card-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  iconName="FileText"
                  iconPosition="left"
                  fullWidth
                  onClick={() => navigate('/college-comparison')}
                >
                  Compare Colleges
                </Button>
                <Button
                  variant="outline"
                  iconName="BookOpen"
                  iconPosition="left"
                  fullWidth
                  onClick={() => navigate('/course-recommendations')}
                >
                  View Courses
                </Button>
                <Button
                  variant="outline"
                  iconName="Library"
                  iconPosition="left"
                  fullWidth
                  onClick={() => navigate('/resource-library')}
                >
                  Study Resources
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <NotificationSettings
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
        onSave={handleSaveNotificationSettings}
        currentSettings={notificationSettings}
      />
      <EventDetailsModal
        event={selectedEvent}
        isOpen={showEventDetails}
        onClose={() => setShowEventDetails(false)}
        onSetReminder={handleSetReminder}
        onMarkComplete={handleMarkComplete}
      />
      {/* Quick Action Button */}
      <QuickActionButton />
    </div>
  );
};

export default TimelineTracker;