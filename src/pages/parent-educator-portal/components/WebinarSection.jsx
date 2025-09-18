import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const WebinarSection = ({ userType }) => {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const upcomingWebinars = [
    {
      id: 1,
      title: 'Understanding Your Child\'s Career Personality',
      description: 'Learn how to identify and nurture your child\'s natural career inclinations through scientific assessment methods.',
      date: '2025-01-18',
      time: '7:00 PM IST',
      duration: '90 minutes',
      speaker: {
        name: 'Dr. Priya Sharma',
        title: 'Child Psychologist & Career Counselor',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
        experience: '15+ years'
      },
      attendees: 234,
      maxAttendees: 500,
      price: 'Free',
      tags: ['Psychology', 'Assessment', 'Parent Guidance'],
      registered: false,
      category: userType === 'parent' ? 'parent' : 'educator'
    },
    {
      id: 2,
      title: 'Modern Career Trends in India 2025',
      description: 'Explore emerging career opportunities in AI, renewable energy, and digital economy sectors.',
      date: '2025-01-22',
      time: '4:00 PM IST',
      duration: '120 minutes',
      speaker: {
        name: 'Prof. Rajesh Gupta',
        title: 'Industry Research Director',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        experience: '20+ years'
      },
      attendees: 189,
      maxAttendees: 300,
      price: 'Free',
      tags: ['Industry Trends', 'Future Careers', 'Technology'],
      registered: true,
      category: 'both'
    },
    {
      id: 3,
      title: 'Effective Classroom Career Guidance',
      description: 'Practical strategies for integrating career guidance into regular classroom activities.',
      date: '2025-01-25',
      time: '3:30 PM IST',
      duration: '75 minutes',
      speaker: {
        name: 'Ms. Anita Desai',
        title: 'Senior Education Consultant',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        experience: '12+ years'
      },
      attendees: 156,
      maxAttendees: 250,
      price: 'Free',
      tags: ['Teaching Methods', 'Curriculum', 'Student Engagement'],
      registered: false,
      category: 'educator'
    },
    {
      id: 4,
      title: 'Financial Planning for Higher Education',
      description: 'Comprehensive guide to planning and funding your child\'s college education in India.',
      date: '2025-01-28',
      time: '6:00 PM IST',
      duration: '100 minutes',
      speaker: {
        name: 'CA Vikram Singh',
        title: 'Financial Planning Expert',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        experience: '18+ years'
      },
      attendees: 298,
      maxAttendees: 400,
      price: 'Free',
      tags: ['Financial Planning', 'Education Loans', 'Scholarships'],
      registered: false,
      category: 'parent'
    }
  ];

  const pastWebinars = [
    {
      id: 5,
      title: 'Stream Selection Strategies for Class 10',
      description: 'Recorded session on helping students choose the right academic stream.',
      date: '2024-12-15',
      time: '5:00 PM IST',
      duration: '85 minutes',
      speaker: {
        name: 'Dr. Meera Joshi',
        title: 'Educational Psychologist',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        experience: '14+ years'
      },
      views: 1247,
      rating: 4.8,
      price: 'Free',
      tags: ['Stream Selection', 'Class 10', 'Decision Making'],
      category: 'both'
    },
    {
      id: 6,
      title: 'Supporting Students with Learning Differences',
      description: 'Strategies for career guidance for students with special learning needs.',
      date: '2024-12-08',
      time: '4:30 PM IST',
      duration: '95 minutes',
      speaker: {
        name: 'Dr. Arjun Patel',
        title: 'Special Education Specialist',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        experience: '16+ years'
      },
      views: 892,
      rating: 4.7,
      price: 'Free',
      tags: ['Special Needs', 'Inclusive Education', 'Support Strategies'],
      category: 'educator'
    }
  ];

  const filteredUpcoming = upcomingWebinars?.filter(webinar => 
    webinar?.category === userType || webinar?.category === 'both'
  );

  const filteredPast = pastWebinars?.filter(webinar => 
    webinar?.category === userType || webinar?.category === 'both'
  );

  const tabs = [
    { id: 'upcoming', name: 'Upcoming Webinars', count: filteredUpcoming?.length },
    { id: 'past', name: 'Past Recordings', count: filteredPast?.length }
  ];

  const handleRegister = (webinarId) => {
    console.log(`Registering for webinar: ${webinarId}`);
    // Handle registration logic
  };

  const WebinarCard = ({ webinar, isPast = false }) => (
    <div className="bg-surface rounded-xl p-6 shadow-elevation-1 border border-border hover:border-primary/30 transition-all duration-200">
      <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Speaker Info */}
        <div className="flex items-center space-x-3 lg:flex-col lg:items-center lg:space-x-0 lg:space-y-2 lg:w-32">
          <Image
            src={webinar?.speaker?.avatar}
            alt={webinar?.speaker?.name}
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover"
          />
          <div className="lg:text-center">
            <h4 className="font-medium text-text-primary text-sm">{webinar?.speaker?.name}</h4>
            <p className="text-xs text-text-secondary">{webinar?.speaker?.title}</p>
            <p className="text-xs text-text-secondary">{webinar?.speaker?.experience}</p>
          </div>
        </div>

        {/* Webinar Details */}
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-text-primary mb-2">{webinar?.title}</h3>
            <div className="flex items-center space-x-2">
              {webinar?.registered && !isPast && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  Registered
                </span>
              )}
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                {webinar?.price}
              </span>
            </div>
          </div>

          <p className="text-text-secondary mb-4">{webinar?.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {webinar?.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Webinar Meta */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Calendar" size={16} />
              <span>{webinar?.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Clock" size={16} />
              <span>{webinar?.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Timer" size={16} />
              <span>{webinar?.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Users" size={16} />
              <span>
                {isPast ? `${webinar?.views} views` : `${webinar?.attendees}/${webinar?.maxAttendees}`}
              </span>
            </div>
          </div>

          {/* Rating for past webinars */}
          {isPast && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={14}
                    className={`${
                      i < Math.floor(webinar?.rating)
                        ? 'text-yellow-500 fill-current' :'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-text-secondary">{webinar?.rating} rating</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {isPast ? (
              <>
                <Button variant="default" iconName="Play" iconPosition="left">
                  Watch Recording
                </Button>
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Download Materials
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={webinar?.registered ? "outline" : "default"}
                  iconName={webinar?.registered ? "Check" : "Calendar"}
                  iconPosition="left"
                  onClick={() => handleRegister(webinar?.id)}
                >
                  {webinar?.registered ? 'Registered' : 'Register Now'}
                </Button>
                <Button variant="ghost" iconName="Share" iconPosition="left">
                  Share
                </Button>
                <Button variant="ghost" iconName="Bell" iconPosition="left">
                  Remind Me
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Professional Development Webinars
        </h2>
        <p className="text-text-secondary">
          {userType === 'parent' ?'Join expert-led sessions to better support your child\'s career journey' :'Enhance your career guidance skills with professional development sessions'
          }
        </p>
      </div>
      {/* Tabs */}
      <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
        <div className="flex space-x-1 mb-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setSelectedTab(tab?.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              {tab?.name} ({tab?.count})
            </button>
          ))}
        </div>

        {/* Webinar List */}
        <div className="space-y-6">
          {selectedTab === 'upcoming' ? (
            filteredUpcoming?.length > 0 ? (
              filteredUpcoming?.map((webinar) => (
                <WebinarCard key={webinar?.id} webinar={webinar} />
              ))
            ) : (
              <div className="text-center py-12">
                <Icon name="Calendar" size={48} className="text-text-secondary mx-auto mb-4" />
                <h4 className="text-lg font-medium text-text-primary mb-2">No upcoming webinars</h4>
                <p className="text-text-secondary">Check back soon for new professional development sessions</p>
              </div>
            )
          ) : (
            filteredPast?.length > 0 ? (
              filteredPast?.map((webinar) => (
                <WebinarCard key={webinar?.id} webinar={webinar} isPast={true} />
              ))
            ) : (
              <div className="text-center py-12">
                <Icon name="Play" size={48} className="text-text-secondary mx-auto mb-4" />
                <h4 className="text-lg font-medium text-text-primary mb-2">No past recordings</h4>
                <p className="text-text-secondary">Recorded sessions will appear here after webinars</p>
              </div>
            )
          )}
        </div>
      </div>
      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Want to suggest a webinar topic?</h3>
            <p className="opacity-90">
              Help us create content that matters to you. Share your ideas and questions.
            </p>
          </div>
          <Button variant="outline" className="bg-white text-primary hover:bg-white/90">
            Suggest Topic
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebinarSection;