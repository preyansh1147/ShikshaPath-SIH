import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MobileComparisonView = ({ colleges, onRemoveCollege }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState(new Set());

  const sections = [
    {
      id: 'basic',
      title: 'Basic Information',
      icon: 'Info',
      fields: [
        { key: 'type', label: 'Type' },
        { key: 'established', label: 'Established' },
        { key: 'rating', label: 'Rating', format: (val) => `${val}★` },
        { key: 'reviews', label: 'Reviews', format: (val) => `${val} reviews` }
      ]
    },
    {
      id: 'cutoff',
      title: 'Cut-off Scores',
      icon: 'Target',
      fields: [
        { key: 'cutoff.general', label: 'General', format: (val) => `${val}%` },
        { key: 'cutoff.obc', label: 'OBC', format: (val) => `${val}%` },
        { key: 'cutoff.sc', label: 'SC', format: (val) => `${val}%` },
        { key: 'cutoff.st', label: 'ST', format: (val) => `${val}%` }
      ]
    },
    {
      id: 'fees',
      title: 'Fee Structure',
      icon: 'DollarSign',
      fields: [
        { key: 'fees.tuition', label: 'Tuition Fee', format: (val) => `₹${val?.toLocaleString('en-IN')}` },
        { key: 'fees.hostel', label: 'Hostel Fee', format: (val) => `₹${val?.toLocaleString('en-IN')}` },
        { key: 'fees.other', label: 'Other Fees', format: (val) => `₹${val?.toLocaleString('en-IN')}` }
      ]
    },
    {
      id: 'placement',
      title: 'Placement Statistics',
      icon: 'TrendingUp',
      fields: [
        { key: 'placement.percentage', label: 'Placement Rate', format: (val) => `${val}%` },
        { key: 'placement.average_package', label: 'Average Package', format: (val) => `₹${val} LPA` },
        { key: 'placement.highest_package', label: 'Highest Package', format: (val) => `₹${val} LPA` }
      ]
    },
    {
      id: 'facilities',
      title: 'Facilities',
      icon: 'Building',
      fields: [
        { key: 'facilities', label: 'Available Facilities', format: (val) => Array.isArray(val) ? val?.join(', ') : val }
      ]
    },
    {
      id: 'courses',
      title: 'Available Courses',
      icon: 'BookOpen',
      fields: [
        { key: 'courses.undergraduate', label: 'Undergraduate', format: (val) => Array.isArray(val) ? val?.join(', ') : val },
        { key: 'courses.postgraduate', label: 'Postgraduate', format: (val) => Array.isArray(val) ? val?.join(', ') : val }
      ]
    }
  ];

  const getNestedValue = (obj, path) => {
    return path?.split('.')?.reduce((current, key) => current?.[key], obj);
  };

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded?.has(sectionId)) {
      newExpanded?.delete(sectionId);
    } else {
      newExpanded?.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const nextCollege = () => {
    setCurrentIndex((prev) => (prev + 1) % colleges?.length);
  };

  const prevCollege = () => {
    setCurrentIndex((prev) => (prev - 1 + colleges?.length) % colleges?.length);
  };

  if (colleges?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <Icon name="GitCompare" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Colleges Selected</h3>
        <p className="text-muted-foreground">
          Add colleges to start comparing their features
        </p>
      </div>
    );
  }

  const currentCollege = colleges?.[currentIndex];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header with Navigation */}
      <div className="bg-muted border-b border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">
            College Comparison
          </h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            className="text-muted-foreground hover:text-error"
            onClick={() => onRemoveCollege(currentCollege?.id)}
          />
        </div>

        {/* College Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronLeft"
            onClick={prevCollege}
            disabled={colleges?.length <= 1}
          />
          
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Image
                src={currentCollege?.logo}
                alt={currentCollege?.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-foreground text-sm">
                  {currentCollege?.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {currentCollege?.location}
                </p>
              </div>
            </div>
            
            {/* Progress Dots */}
            <div className="flex items-center justify-center space-x-1">
              {colleges?.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-smooth ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            onClick={nextCollege}
            disabled={colleges?.length <= 1}
          />
        </div>
      </div>
      {/* College Details */}
      <div className="p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="font-semibold text-foreground">{currentCollege?.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">Rating</span>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <div className="font-semibold text-primary mb-1">
              {currentCollege?.cutoff?.general || 'N/A'}%
            </div>
            <span className="text-xs text-muted-foreground">Cut-off</span>
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-3">
          {sections?.map((section) => (
            <div key={section?.id} className="border border-border rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 bg-muted/20 hover:bg-muted/40 transition-smooth"
                onClick={() => toggleSection(section?.id)}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={section?.icon} size={16} className="text-primary" />
                  <span className="font-medium text-foreground">{section?.title}</span>
                </div>
                <Icon 
                  name={expandedSections?.has(section?.id) ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </button>

              {expandedSections?.has(section?.id) && (
                <div className="p-4 space-y-3">
                  {section?.fields?.map((field) => {
                    const value = getNestedValue(currentCollege, field?.key);
                    const formattedValue = field?.format ? field?.format(value) : value;
                    
                    return (
                      <div key={field?.key} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{field?.label}:</span>
                        <span className="text-sm font-medium text-foreground">
                          {formattedValue || 'N/A'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="left"
            fullWidth
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            fullWidth
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileComparisonView;