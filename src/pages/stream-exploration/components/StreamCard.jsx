import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StreamCard = ({ 
  stream, 
  onExplore, 
  onCompare, 
  isSelected = false,
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Easy': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStreamIcon = (streamName) => {
    switch (streamName) {
      case 'Science': return 'Microscope';
      case 'Commerce': return 'Calculator';
      case 'Arts': return 'Palette';
      case 'Vocational': return 'Wrench';
      default: return 'BookOpen';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft hover:shadow-elevated transition-all duration-300 ${isSelected ? 'ring-2 ring-primary' : ''} ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stream?.color}`}>
              <Icon name={getStreamIcon(stream?.name)} size={24} color="white" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-foreground">{stream?.name}</h3>
              <p className="text-sm text-muted-foreground">{stream?.subtitle}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(stream?.difficulty)}`}>
            {stream?.difficulty}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{stream?.description}</p>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{stream?.careerOptions}</div>
            <div className="text-xs text-muted-foreground">Career Options</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{stream?.avgSalary}</div>
            <div className="text-xs text-muted-foreground">Avg. Starting Salary</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{stream?.jobDemand}%</div>
            <div className="text-xs text-muted-foreground">Job Market Demand</div>
          </div>
        </div>
      </div>
      {/* Core Subjects */}
      <div className="p-6 border-b border-border">
        <h4 className="font-medium text-foreground mb-3">Core Subjects</h4>
        <div className="flex flex-wrap gap-2">
          {stream?.coreSubjects?.map((subject, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
      {/* Popular Career Paths */}
      <div className="p-6 border-b border-border">
        <h4 className="font-medium text-foreground mb-3">Popular Career Paths</h4>
        <div className="space-y-2">
          {stream?.popularCareers?.slice(0, isExpanded ? stream?.popularCareers?.length : 3)?.map((career, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="ArrowRight" size={14} className="text-primary" />
              <span className="text-sm text-foreground">{career}</span>
            </div>
          ))}
        </div>
        
        {stream?.popularCareers?.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
          >
            {isExpanded ? 'Show Less' : `+${stream?.popularCareers?.length - 3} more`}
          </Button>
        )}
      </div>
      {/* Action Buttons */}
      <div className="p-6">
        <div className="flex space-x-3">
          <Button
            variant="default"
            size="sm"
            onClick={() => onExplore(stream)}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            Explore Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCompare(stream)}
            iconName="GitCompare"
            iconPosition="left"
            className="flex-1"
          >
            Compare
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StreamCard;