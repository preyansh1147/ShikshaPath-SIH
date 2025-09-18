import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EducatorDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('class12a');

  const classData = [
    {
      id: 'class12a',
      name: 'Class 12-A (Science)',
      totalStudents: 45,
      assessmentCompleted: 38,
      needsAttention: 7,
      averageProgress: 78
    },
    {
      id: 'class12b',
      name: 'Class 12-B (Commerce)',
      totalStudents: 42,
      assessmentCompleted: 35,
      needsAttention: 5,
      averageProgress: 82
    },
    {
      id: 'class10a',
      name: 'Class 10-A',
      totalStudents: 48,
      assessmentCompleted: 41,
      needsAttention: 9,
      averageProgress: 71
    }
  ];

  const currentClass = classData?.find(cls => cls?.id === selectedClass);

  const classMetrics = [
    {
      title: 'Total Students',
      value: currentClass?.totalStudents,
      description: 'Students in selected class',
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Assessments Done',
      value: currentClass?.assessmentCompleted,
      description: 'Completed career assessments',
      icon: 'CheckCircle',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Need Attention',
      value: currentClass?.needsAttention,
      description: 'Students requiring guidance',
      icon: 'AlertTriangle',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Average Progress',
      value: `${currentClass?.averageProgress}%`,
      description: 'Class completion rate',
      icon: 'TrendingUp',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const studentsNeedingAttention = [
    {
      id: 1,
      name: 'Rahul Verma',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      issue: 'Assessment incomplete',
      lastActive: '5 days ago',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Sneha Patel',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      issue: 'Conflicting career interests',
      lastActive: '2 days ago',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      issue: 'Low engagement scores',
      lastActive: '3 days ago',
      priority: 'medium'
    }
  ];

  const teachingResources = [
    {
      id: 1,
      title: 'Career Guidance Presentation',
      description: 'Ready-to-use slides for classroom career discussions',
      type: 'Presentation',
      downloads: 1247,
      icon: 'Presentation'
    },
    {
      id: 2,
      title: 'Stream Selection Worksheet',
      description: 'Interactive worksheet for Class 10 students',
      type: 'Worksheet',
      downloads: 892,
      icon: 'FileText'
    },
    {
      id: 3,
      title: 'Parent Communication Templates',
      description: 'Email templates for parent-teacher discussions',
      type: 'Template',
      downloads: 634,
      icon: 'Mail'
    },
    {
      id: 4,
      title: 'Group Assessment Activities',
      description: 'Collaborative career exploration exercises',
      type: 'Activity',
      downloads: 756,
      icon: 'Users'
    }
  ];

  const upcomingWebinars = [
    {
      id: 1,
      title: 'Modern Career Trends in India',
      date: '2025-01-20',
      time: '4:00 PM IST',
      speaker: 'Dr. Priya Sharma',
      attendees: 234,
      registered: true
    },
    {
      id: 2,
      title: 'Effective Career Counseling Techniques',
      date: '2025-01-25',
      time: '3:30 PM IST',
      speaker: 'Prof. Rajesh Gupta',
      attendees: 189,
      registered: false
    },
    {
      id: 3,
      title: 'Supporting Students with Learning Differences',
      date: '2025-02-02',
      time: '5:00 PM IST',
      speaker: 'Ms. Anita Desai',
      attendees: 156,
      registered: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Class Selection */}
      <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Select Class</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {classData?.map((cls) => (
            <div
              key={cls?.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedClass === cls?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
              }`}
              onClick={() => setSelectedClass(cls?.id)}
            >
              <h3 className="font-medium text-text-primary mb-2">{cls?.name}</h3>
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>{cls?.totalStudents} students</span>
                <span>{cls?.averageProgress}% progress</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Class Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {classMetrics?.map((metric, index) => (
          <div key={index} className="bg-surface rounded-xl p-6 shadow-elevation-1">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${metric?.bgColor}`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <span className="text-2xl font-bold text-text-primary">{metric?.value}</span>
            </div>
            <h3 className="font-medium text-text-primary mb-1">{metric?.title}</h3>
            <p className="text-xs text-text-secondary">{metric?.description}</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Students Needing Attention */}
        <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Students Needing Attention</h3>
            <Button variant="ghost" size="sm" iconName="ExternalLink">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {studentsNeedingAttention?.map((student) => (
              <div key={student?.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <Image
                  src={student?.avatar}
                  alt={student?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary">{student?.name}</h4>
                  <p className="text-sm text-text-secondary">{student?.issue}</p>
                  <p className="text-xs text-text-secondary">Last active: {student?.lastActive}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  student?.priority === 'high' ?'bg-red-100 text-red-700' :'bg-yellow-100 text-yellow-700'
                }`}>
                  {student?.priority}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
              Schedule Group Session
            </Button>
          </div>
        </div>

        {/* Teaching Resources */}
        <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Teaching Resources</h3>
            <Button variant="ghost" size="sm" iconName="Plus">
              Request Resource
            </Button>
          </div>
          
          <div className="space-y-3">
            {teachingResources?.map((resource) => (
              <div key={resource?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name={resource?.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary">{resource?.title}</h4>
                  <p className="text-sm text-text-secondary mb-1">{resource?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span>{resource?.type}</span>
                    <span>{resource?.downloads} downloads</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="Download">
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Upcoming Webinars */}
      <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Professional Development</h3>
          <Button variant="outline" size="sm" iconName="Calendar">
            View All Events
          </Button>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingWebinars?.map((webinar) => (
            <div key={webinar?.id} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-secondary">{webinar?.date}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  webinar?.registered
                    ? 'bg-green-100 text-green-700' :'bg-gray-100 text-gray-700'
                }`}>
                  {webinar?.registered ? 'Registered' : 'Available'}
                </span>
              </div>
              <h4 className="font-medium text-text-primary mb-2">{webinar?.title}</h4>
              <p className="text-sm text-text-secondary mb-2">By {webinar?.speaker}</p>
              <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
                <span>{webinar?.time}</span>
                <span>{webinar?.attendees} registered</span>
              </div>
              <Button 
                variant={webinar?.registered ? "outline" : "default"} 
                size="sm" 
                fullWidth
                iconName={webinar?.registered ? "Check" : "Plus"}
                iconPosition="left"
              >
                {webinar?.registered ? 'Registered' : 'Register Now'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducatorDashboard;