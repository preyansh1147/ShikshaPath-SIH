import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const GroupSessions = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [registeredSessions, setRegisteredSessions] = useState([]);

  const upcomingSessions = [
    {
      id: 1,
      title: "Engineering vs Medical: Making the Right Choice",
      description: "Comprehensive comparison of engineering and medical careers, including scope, opportunities, and preparation strategies.",
      instructor: "Dr. Priya Sharma & Prof. Rajesh Kumar",
      date: "September 15, 2025",
      time: "6:00 PM - 7:30 PM",
      duration: "90 minutes",
      participants: 45,
      maxParticipants: 100,
      price: "Free",
      level: "Class 10-12",
      topics: ["Career Comparison", "Entrance Exams", "Future Scope", "Salary Prospects"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Studying Abroad on a Budget",
      description: "Learn about affordable study abroad options, scholarships, and financial planning for international education.",
      instructor: "Ms. Anita Desai",
      date: "September 18, 2025",
      time: "7:00 PM - 8:00 PM",
      duration: "60 minutes",
      participants: 32,
      maxParticipants: 75,
      price: "₹199",
      level: "Class 12 & Above",
      topics: ["Scholarship Applications", "Budget Planning", "Country Selection", "Visa Process"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Alternative Career Paths After 12th",
      description: "Explore unconventional career options beyond traditional engineering and medical fields.",
      instructor: "Mr. Suresh Patel",
      date: "September 20, 2025",
      time: "5:30 PM - 6:30 PM",
      duration: "60 minutes",
      participants: 28,
      maxParticipants: 60,
      price: "₹149",
      level: "Class 12",
      topics: ["Creative Careers", "Digital Marketing", "Entrepreneurship", "Skill Development"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
      status: "upcoming"
    },
    {
      id: 4,
      title: "JEE Main 2026: Preparation Strategy",
      description: "Expert guidance on JEE Main preparation, time management, and effective study techniques.",
      instructor: "Dr. Amit Verma",
      date: "September 22, 2025",
      time: "4:00 PM - 5:30 PM",
      duration: "90 minutes",
      participants: 67,
      maxParticipants: 120,
      price: "₹299",
      level: "Class 11-12",
      topics: ["Study Plan", "Mock Tests", "Time Management", "Subject-wise Tips"],
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop",
      status: "upcoming"
    }
  ];

  const pastSessions = [
    {
      id: 5,
      title: "NEET 2025: Last Minute Tips",
      instructor: "Dr. Meera Singh",
      date: "September 10, 2025",
      participants: 89,
      rating: 4.8,
      status: "completed",
      recordingAvailable: true
    },
    {
      id: 6,
      title: "Commerce Stream Career Options",
      instructor: "CA Rohit Agarwal",
      date: "September 8, 2025",
      participants: 56,
      rating: 4.6,
      status: "completed",
      recordingAvailable: true
    }
  ];

  const handleRegister = (sessionId) => {
    if (!registeredSessions?.includes(sessionId)) {
      setRegisteredSessions([...registeredSessions, sessionId]);
      alert('Successfully registered for the session!');
    }
  };

  const handleViewRecording = (sessionId) => {
    alert(`Opening recording for session ${sessionId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-primary';
      case 'completed': return 'text-success';
      case 'live': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming': return 'Clock';
      case 'completed': return 'CheckCircle';
      case 'live': return 'Radio';
      default: return 'Calendar';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Group Guidance Sessions</h2>
        <p className="text-text-secondary">Join interactive sessions with experts and peers</p>
      </div>
      {/* Upcoming Sessions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Upcoming Sessions</h3>
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingSessions?.map((session) => (
            <div
              key={session?.id}
              className="bg-surface rounded-xl border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 overflow-hidden"
            >
              {/* Session Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={session?.image}
                  alt={session?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    session?.price === 'Free' ?'bg-success text-success-foreground' :'bg-primary text-primary-foreground'
                  }`}>
                    {session?.price}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface/90 text-text-primary">
                    <Icon name={getStatusIcon(session?.status)} size={12} className="mr-1" />
                    {session?.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Session Info */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-text-primary mb-2">{session?.title}</h4>
                  <p className="text-sm text-text-secondary mb-3">{session?.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={14} />
                      <span>{session?.instructor}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{session?.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{session?.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center space-x-1 text-text-secondary">
                      <Icon name="Users" size={14} />
                      <span>{session?.participants}/{session?.maxParticipants} participants</span>
                    </div>
                    <span className="px-2 py-1 bg-muted text-text-secondary rounded-full text-xs">
                      {session?.level}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2 mb-4">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(session?.participants / session?.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {session?.topics?.map((topic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Info"
                    iconPosition="left"
                    onClick={() => setSelectedSession(session)}
                  >
                    Details
                  </Button>
                  <Button
                    variant={registeredSessions?.includes(session?.id) ? "success" : "default"}
                    size="sm"
                    fullWidth
                    iconName={registeredSessions?.includes(session?.id) ? "Check" : "UserPlus"}
                    iconPosition="left"
                    onClick={() => handleRegister(session?.id)}
                    disabled={registeredSessions?.includes(session?.id)}
                  >
                    {registeredSessions?.includes(session?.id) ? "Registered" : "Register"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Past Sessions */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-6">Past Sessions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastSessions?.map((session) => (
            <div
              key={session?.id}
              className="bg-surface rounded-lg border border-border shadow-elevation-1 p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-text-primary">{session?.title}</h4>
                <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0 mt-1" />
              </div>
              
              <div className="space-y-2 text-sm text-text-secondary mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={12} />
                  <span>{session?.instructor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={12} />
                  <span>{session?.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={12} />
                  <span>{session?.participants} attended</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={12} className="text-warning" />
                  <span>{session?.rating}/5.0</span>
                </div>
              </div>

              {session?.recordingAvailable && (
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Play"
                  iconPosition="left"
                  onClick={() => handleViewRecording(session?.id)}
                >
                  View Recording
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Session Details Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-elevation-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-text-primary">{selectedSession?.title}</h3>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="p-1 hover:bg-muted rounded-md transition-colors duration-200"
                >
                  <Icon name="X" size={20} className="text-text-secondary" />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-text-secondary">{selectedSession?.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-text-primary">Instructor:</span>
                    <p className="text-text-secondary">{selectedSession?.instructor}</p>
                  </div>
                  <div>
                    <span className="font-medium text-text-primary">Duration:</span>
                    <p className="text-text-secondary">{selectedSession?.duration}</p>
                  </div>
                  <div>
                    <span className="font-medium text-text-primary">Date & Time:</span>
                    <p className="text-text-secondary">{selectedSession?.date} at {selectedSession?.time}</p>
                  </div>
                  <div>
                    <span className="font-medium text-text-primary">Price:</span>
                    <p className="text-text-secondary">{selectedSession?.price}</p>
                  </div>
                </div>

                <div>
                  <span className="font-medium text-text-primary">Topics Covered:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSession?.topics?.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setSelectedSession(null)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="default"
                    fullWidth
                    iconName="UserPlus"
                    iconPosition="left"
                    onClick={() => {
                      handleRegister(selectedSession?.id);
                      setSelectedSession(null);
                    }}
                    disabled={registeredSessions?.includes(selectedSession?.id)}
                  >
                    {registeredSessions?.includes(selectedSession?.id) ? "Already Registered" : "Register Now"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupSessions;