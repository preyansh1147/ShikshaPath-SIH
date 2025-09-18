import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ExpertConnect = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const experts = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      title: "Career Counselor & Psychologist",
      specialization: "Engineering & Technology Careers",
      experience: "12+ years",
      rating: 4.9,
      reviews: 234,
      languages: ["English", "Hindi", "Punjabi"],
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      nextAvailable: "Today, 2:00 PM",
      price: "₹500/session",
      expertise: ["IIT/NIT Guidance", "JEE Preparation", "Engineering Streams"]
    },
    {
      id: 2,
      name: "Prof. Rajesh Kumar",
      title: "Education Consultant",
      specialization: "Medical & Healthcare Careers",
      experience: "15+ years",
      rating: 4.8,
      reviews: 189,
      languages: ["English", "Hindi", "Bengali"],
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      nextAvailable: "Tomorrow, 10:00 AM",
      price: "₹600/session",
      expertise: ["NEET Guidance", "Medical Colleges", "Healthcare Careers"]
    },
    {
      id: 3,
      name: "Ms. Anita Desai",
      title: "International Education Expert",
      specialization: "Study Abroad & Scholarships",
      experience: "10+ years",
      rating: 4.9,
      reviews: 156,
      languages: ["English", "Hindi", "Gujarati"],
      avatar: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=150&h=150&fit=crop&crop=face",
      nextAvailable: "Today, 4:30 PM",
      price: "₹800/session",
      expertise: ["US/UK Universities", "Scholarship Applications", "Visa Guidance"]
    },
    {
      id: 4,
      name: "Mr. Suresh Patel",
      title: "Industry Career Advisor",
      specialization: "Commerce & Management",
      experience: "8+ years",
      rating: 4.7,
      reviews: 98,
      languages: ["English", "Hindi", "Marathi"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      nextAvailable: "Today, 6:00 PM",
      price: "₹450/session",
      expertise: ["CA/CS Guidance", "MBA Preparation", "Finance Careers"]
    }
  ];

  const timeSlots = [
    { id: 1, time: "10:00 AM", date: "Today", available: true },
    { id: 2, time: "2:00 PM", date: "Today", available: true },
    { id: 3, time: "4:30 PM", date: "Today", available: false },
    { id: 4, time: "6:00 PM", date: "Today", available: true },
    { id: 5, time: "10:00 AM", date: "Tomorrow", available: true },
    { id: 6, time: "2:00 PM", date: "Tomorrow", available: true },
    { id: 7, time: "4:00 PM", date: "Tomorrow", available: true },
    { id: 8, time: "6:30 PM", date: "Tomorrow", available: false }
  ];

  const handleBookSession = () => {
    if (selectedExpert && selectedTimeSlot) {
      alert(`Session booked with ${selectedExpert?.name} at ${selectedTimeSlot?.time} on ${selectedTimeSlot?.date}`);
      setSelectedExpert(null);
      setSelectedTimeSlot(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Connect with Expert Counselors</h2>
        <p className="text-text-secondary">Get personalized guidance from certified career counselors</p>
      </div>
      {/* Expert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experts?.map((expert) => (
          <div
            key={expert?.id}
            className={`bg-surface rounded-xl border-2 transition-all duration-200 cursor-pointer ${
              selectedExpert?.id === expert?.id
                ? 'border-primary shadow-elevation-3'
                : 'border-border hover:border-primary/50 shadow-elevation-1 hover:shadow-elevation-2'
            }`}
            onClick={() => setSelectedExpert(expert)}
          >
            <div className="p-6">
              {/* Expert Info */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative">
                  <Image
                    src={expert?.avatar}
                    alt={expert?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-surface flex items-center justify-center">
                    <Icon name="Check" size={10} color="white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">{expert?.name}</h3>
                  <p className="text-sm text-text-secondary mb-1">{expert?.title}</p>
                  <p className="text-sm font-medium text-primary">{expert?.specialization}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm font-medium">{expert?.rating}</span>
                    <span className="text-xs text-text-secondary">({expert?.reviews})</span>
                  </div>
                  <p className="text-sm font-semibold text-text-primary">{expert?.price}</p>
                </div>
              </div>

              {/* Experience & Languages */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">{expert?.experience}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} className="text-success" />
                    <span className="text-sm text-success">{expert?.nextAvailable}</span>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {expert?.languages?.map((lang, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-xs text-text-secondary rounded-full"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {expert?.expertise?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {skill}
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
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Chat Now
                </Button>
                <Button
                  variant={selectedExpert?.id === expert?.id ? "default" : "outline"}
                  size="sm"
                  fullWidth
                  iconName="Video"
                  iconPosition="left"
                >
                  {selectedExpert?.id === expert?.id ? "Selected" : "Book Video Call"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Time Slot Selection */}
      {selectedExpert && (
        <div className="bg-surface rounded-xl border border-border shadow-elevation-2 p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Select Time Slot with {selectedExpert?.name}
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {timeSlots?.map((slot) => (
              <button
                key={slot?.id}
                onClick={() => slot?.available && setSelectedTimeSlot(slot)}
                disabled={!slot?.available}
                className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  selectedTimeSlot?.id === slot?.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : slot?.available
                    ? 'border-border hover:border-primary hover:bg-primary/5 text-text-primary' :'border-border bg-muted text-text-secondary cursor-not-allowed'
                }`}
              >
                <div>{slot?.time}</div>
                <div className="text-xs opacity-80">{slot?.date}</div>
                {!slot?.available && (
                  <div className="text-xs text-destructive mt-1">Booked</div>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Session Duration: 45 minutes • Price: {selectedExpert?.price}
            </div>
            <Button
              onClick={handleBookSession}
              disabled={!selectedTimeSlot}
              variant="default"
              iconName="Calendar"
              iconPosition="left"
            >
              Book Session
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertConnect;