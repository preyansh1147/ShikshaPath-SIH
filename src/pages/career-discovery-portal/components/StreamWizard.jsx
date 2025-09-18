import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StreamWizard = ({ onStreamSelect, selectedStream = null }) => {
  const [hoveredStream, setHoveredStream] = useState(null);

  const streams = [
    {
      id: 'science',
      name: 'Science',
      icon: 'Atom',
      bgColor: 'bg-blue-500',
      description: 'Explore the world of physics, chemistry, biology, and mathematics',
      careers: ['Doctor', 'Engineer', 'Scientist', 'Researcher', 'Pharmacist'],
      subjects: ['Physics', 'Chemistry', 'Biology/Mathematics', 'English'],
      opportunities: '500+ career paths',
      avgSalary: '₹4-15 LPA',
      color: 'blue'
    },
    {
      id: 'commerce',
      name: 'Commerce',
      icon: 'TrendingUp',
      bgColor: 'bg-green-500',
      description: 'Master business, finance, economics, and entrepreneurship',
      careers: ['CA', 'MBA', 'Banker', 'Entrepreneur', 'Financial Analyst'],
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'],
      opportunities: '300+ career paths',
      avgSalary: '₹3-12 LPA',
      color: 'green'
    },
    {
      id: 'arts',
      name: 'Arts/Humanities',
      icon: 'Palette',
      bgColor: 'bg-purple-500',
      description: 'Dive into literature, history, psychology, and creative fields',
      careers: ['Lawyer', 'Journalist', 'Psychologist', 'Designer', 'Civil Servant'],
      subjects: ['History', 'Political Science', 'Psychology', 'Literature'],
      opportunities: '400+ career paths',
      avgSalary: '₹2.5-10 LPA',
      color: 'purple'
    },
    {
      id: 'vocational',
      name: 'Vocational',
      icon: 'Wrench',
      bgColor: 'bg-orange-500',
      description: 'Gain practical skills in technology, hospitality, and trades',
      careers: ['Chef', 'Fashion Designer', 'IT Specialist', 'Beautician', 'Electrician'],
      subjects: ['Trade Specific', 'English', 'Mathematics', 'Science'],
      opportunities: '200+ career paths',
      avgSalary: '₹2-8 LPA',
      color: 'orange'
    }
  ];

  const getColorClasses = (color, isSelected = false, isHovered = false) => {
    const colors = {
      blue: {
        bg: isSelected || isHovered ? 'bg-blue-50' : 'bg-card',
        border: isSelected ? 'border-blue-500' : isHovered ? 'border-blue-300' : 'border-border',
        text: isSelected ? 'text-blue-600' : 'text-text-primary'
      },
      green: {
        bg: isSelected || isHovered ? 'bg-green-50' : 'bg-card',
        border: isSelected ? 'border-green-500' : isHovered ? 'border-green-300' : 'border-border',
        text: isSelected ? 'text-green-600' : 'text-text-primary'
      },
      purple: {
        bg: isSelected || isHovered ? 'bg-purple-50' : 'bg-card',
        border: isSelected ? 'border-purple-500' : isHovered ? 'border-purple-300' : 'border-border',
        text: isSelected ? 'text-purple-600' : 'text-text-primary'
      },
      orange: {
        bg: isSelected || isHovered ? 'bg-orange-50' : 'bg-card',
        border: isSelected ? 'border-orange-500' : isHovered ? 'border-orange-300' : 'border-border',
        text: isSelected ? 'text-orange-600' : 'text-text-primary'
      }
    };
    return colors?.[color];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Choose Your Stream</h2>
        <p className="text-text-secondary">
          Select the stream that aligns with your interests and career goals
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {streams?.map((stream) => {
          const isSelected = selectedStream === stream?.id;
          const isHovered = hoveredStream === stream?.id;
          const colorClasses = getColorClasses(stream?.color, isSelected, isHovered);

          return (
            <div
              key={stream?.id}
              className={`rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 hover:shadow-elevation-2 ${colorClasses?.bg} ${colorClasses?.border}`}
              onMouseEnter={() => setHoveredStream(stream?.id)}
              onMouseLeave={() => setHoveredStream(null)}
              onClick={() => onStreamSelect(stream?.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stream?.bgColor}`}>
                  <Icon name={stream?.icon} size={24} color="white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xl font-semibold ${colorClasses?.text}`}>
                      {stream?.name}
                    </h3>
                    {isSelected && (
                      <Icon name="CheckCircle" size={20} className="text-success" />
                    )}
                  </div>
                  <p className="text-text-secondary text-sm mb-4">
                    {stream?.description}
                  </p>

                  <div className="space-y-3">
                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-text-secondary">Opportunities</p>
                        <p className="text-sm font-medium text-text-primary">{stream?.opportunities}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-secondary">Avg. Salary</p>
                        <p className="text-sm font-medium text-text-primary">{stream?.avgSalary}</p>
                      </div>
                    </div>

                    {/* Core Subjects */}
                    <div>
                      <p className="text-xs text-text-secondary mb-1">Core Subjects</p>
                      <div className="flex flex-wrap gap-1">
                        {stream?.subjects?.map((subject, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-text-secondary"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Popular Careers */}
                    <div>
                      <p className="text-xs text-text-secondary mb-1">Popular Careers</p>
                      <div className="flex flex-wrap gap-1">
                        {stream?.careers?.slice(0, 3)?.map((career, index) => (
                          <span 
                            key={index}
                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                              isSelected ? `bg-${stream?.color}-100 text-${stream?.color}-700` : 'bg-primary/10 text-primary'
                            }`}
                          >
                            {career}
                          </span>
                        ))}
                        {stream?.careers?.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-text-secondary">
                            +{stream?.careers?.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedStream && (
        <div className="text-center">
          <Button
            variant="default"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => {
              const selected = streams?.find(s => s?.id === selectedStream);
              console.log('Selected stream:', selected);
            }}
            className="bg-primary hover:bg-primary/90"
          >
            Explore {streams?.find(s => s?.id === selectedStream)?.name} Careers
          </Button>
        </div>
      )}
    </div>
  );
};

export default StreamWizard;