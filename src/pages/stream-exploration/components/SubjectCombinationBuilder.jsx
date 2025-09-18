import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SubjectCombinationBuilder = ({ 
  selectedStream, 
  onCombinationChange,
  className = "" 
}) => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [careerPaths, setCareerPaths] = useState([]);

  const subjectsByStream = {
    Science: {
      mandatory: ['Physics', 'Chemistry', 'Mathematics/Biology'],
      optional: ['Computer Science', 'Physical Education', 'Psychology', 'Economics', 'English']
    },
    Commerce: {
      mandatory: ['Accountancy', 'Business Studies', 'Economics'],
      optional: ['Mathematics', 'Computer Science', 'Physical Education', 'Psychology', 'English']
    },
    Arts: {
      mandatory: ['English', 'History/Geography/Political Science'],
      optional: ['Psychology', 'Sociology', 'Philosophy', 'Economics', 'Fine Arts', 'Music']
    },
    Vocational: {
      mandatory: ['English', 'Vocational Subject'],
      optional: ['Mathematics', 'Science', 'Computer Applications', 'Business Studies', 'Physical Education']
    }
  };

  const careerPathsBySubjects = {
    'Physics,Chemistry,Mathematics': [
      'Engineering (B.Tech/B.E.)',
      'Architecture (B.Arch)',
      'Pure Sciences (B.Sc.)',
      'Research & Development',
      'Defense Services'
    ],
    'Physics,Chemistry,Biology': [
      'Medical (MBBS/BDS)',
      'Pharmacy (B.Pharm)',
      'Biotechnology',
      'Nursing',
      'Veterinary Science'
    ],
    'Accountancy,Business Studies,Economics': [
      'Chartered Accountancy (CA)',
      'Company Secretary (CS)',
      'Business Administration (BBA/MBA)',
      'Banking & Finance',
      'Cost & Management Accountancy'
    ],
    'History,Political Science,Economics': [
      'Civil Services (IAS/IPS)',
      'Law (LLB)',
      'Journalism & Mass Communication',
      'Public Administration',
      'International Relations'
    ]
  };

  useEffect(() => {
    if (selectedStream && subjectsByStream?.[selectedStream?.name]) {
      const streamSubjects = subjectsByStream?.[selectedStream?.name];
      setAvailableSubjects([
        ...streamSubjects?.mandatory?.map(s => ({ name: s, type: 'mandatory', selected: true })),
        ...streamSubjects?.optional?.map(s => ({ name: s, type: 'optional', selected: false }))
      ]);
      setSelectedSubjects(streamSubjects?.mandatory);
    }
  }, [selectedStream]);

  useEffect(() => {
    // Generate career paths based on selected subjects
    const subjectKey = selectedSubjects?.sort()?.join(',');
    const paths = careerPathsBySubjects?.[subjectKey] || [
      'General Degree Programs',
      'Competitive Examinations',
      'Skill-based Courses',
      'Entrepreneurship'
    ];
    setCareerPaths(paths);
    onCombinationChange && onCombinationChange(selectedSubjects, paths);
  }, [selectedSubjects, onCombinationChange]);

  const handleSubjectToggle = (subjectName, isMandatory) => {
    if (isMandatory) return; // Can't toggle mandatory subjects

    setSelectedSubjects(prev => {
      if (prev?.includes(subjectName)) {
        return prev?.filter(s => s !== subjectName);
      } else {
        return [...prev, subjectName];
      }
    });
  };

  const resetCombination = () => {
    if (selectedStream && subjectsByStream?.[selectedStream?.name]) {
      setSelectedSubjects(subjectsByStream?.[selectedStream?.name]?.mandatory);
    }
  };

  if (!selectedStream) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 text-center ${className}`}>
        <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Select a Stream</h3>
        <p className="text-sm text-muted-foreground">
          Choose a stream from above to build your subject combination
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-bold text-foreground">
              Subject Combination Builder
            </h3>
            <p className="text-sm text-muted-foreground">
              Build your combination for {selectedStream?.name} stream
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetCombination}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Subject Selection */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Available Subjects</h4>
            
            {/* Mandatory Subjects */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
                <Icon name="Lock" size={14} className="mr-2 text-error" />
                Mandatory Subjects
              </h5>
              <div className="space-y-2">
                {availableSubjects?.filter(subject => subject?.type === 'mandatory')?.map((subject, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md">
                      <Checkbox
                        checked
                        disabled
                        className="opacity-50"
                      />
                      <span className="text-sm font-medium text-foreground">{subject?.name}</span>
                      <span className="text-xs text-error bg-error/10 px-2 py-1 rounded">Required</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Optional Subjects */}
            <div>
              <h5 className="text-sm font-medium text-foreground mb-3 flex items-center">
                <Icon name="Plus" size={14} className="mr-2 text-success" />
                Optional Subjects
              </h5>
              <div className="space-y-2">
                {availableSubjects?.filter(subject => subject?.type === 'optional')?.map((subject, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-md hover:bg-muted/30 transition-smooth">
                      <Checkbox
                        checked={selectedSubjects?.includes(subject?.name)}
                        onChange={() => handleSubjectToggle(subject?.name, false)}
                      />
                      <span className="text-sm text-foreground">{subject?.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Career Paths Preview */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Resulting Career Paths</h4>
            
            {/* Selected Combination Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
              <h5 className="text-sm font-medium text-primary mb-2">Your Combination:</h5>
              <div className="flex flex-wrap gap-2">
                {selectedSubjects?.map((subject, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Paths */}
            <div className="space-y-3">
              {careerPaths?.map((path, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-md">
                  <Icon name="Target" size={16} className="text-success mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{path}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="mt-6">
              <Button
                variant="default"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                className="w-full"
              >
                Explore Colleges for This Combination
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCombinationBuilder;