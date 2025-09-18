import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';


const StreamFilters = ({ 
  onFiltersChange,
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: [],
    careerGoals: [],
    interests: [],
    salaryRange: '',
    jobDemand: '',
    studyMode: []
  });

  const filterOptions = {
    difficulty: [
      { value: 'Easy', label: 'Easy', description: 'Moderate study requirements' },
      { value: 'Medium', label: 'Medium', description: 'Balanced difficulty level' },
      { value: 'Hard', label: 'Hard', description: 'Intensive study required' }
    ],
    careerGoals: [
      { value: 'government', label: 'Government Jobs', description: 'Civil services, PSUs' },
      { value: 'private', label: 'Private Sector', description: 'Corporate careers' },
      { value: 'entrepreneurship', label: 'Entrepreneurship', description: 'Start own business' },
      { value: 'research', label: 'Research & Academia', description: 'Teaching and research' },
      { value: 'creative', label: 'Creative Fields', description: 'Arts, media, design' }
    ],
    interests: [
      { value: 'science', label: 'Science & Technology', description: 'STEM fields' },
      { value: 'business', label: 'Business & Finance', description: 'Commerce and economics' },
      { value: 'social', label: 'Social Sciences', description: 'Society and human behavior' },
      { value: 'arts', label: 'Arts & Literature', description: 'Creative and cultural studies' },
      { value: 'practical', label: 'Practical Skills', description: 'Hands-on vocational training' }
    ],
    salaryRange: [
      { value: 'entry', label: '₹3-6 LPA', description: 'Entry level positions' },
      { value: 'mid', label: '₹6-12 LPA', description: 'Mid-level positions' },
      { value: 'senior', label: '₹12+ LPA', description: 'Senior level positions' }
    ],
    jobDemand: [
      { value: 'high', label: 'High Demand (80%+)', description: 'Excellent job prospects' },
      { value: 'medium', label: 'Medium Demand (60-80%)', description: 'Good job prospects' },
      { value: 'moderate', label: 'Moderate Demand (40-60%)', description: 'Fair job prospects' }
    ],
    studyMode: [
      { value: 'theoretical', label: 'Theoretical', description: 'Concept-based learning' },
      { value: 'practical', label: 'Practical', description: 'Hands-on experience' },
      { value: 'mixed', label: 'Mixed Approach', description: 'Theory + practical' }
    ]
  };

  const handleFilterChange = (category, value, checked) => {
    const newFilters = { ...filters };
    
    if (category === 'salaryRange' || category === 'jobDemand') {
      newFilters[category] = checked ? value : '';
    } else {
      if (checked) {
        newFilters[category] = [...newFilters?.[category], value];
      } else {
        newFilters[category] = newFilters?.[category]?.filter(item => item !== value);
      }
    }
    
    setFilters(newFilters);
    onFiltersChange && onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      difficulty: [],
      careerGoals: [],
      interests: [],
      salaryRange: '',
      jobDemand: '',
      studyMode: []
    };
    setFilters(clearedFilters);
    onFiltersChange && onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.reduce((count, filter) => {
      if (Array.isArray(filter)) {
        return count + filter?.length;
      }
      return count + (filter ? 1 : 0);
    }, 0);
  };

  const renderFilterSection = (title, category, options, type = 'checkbox') => (
    <div className="space-y-3">
      <h4 className="font-medium text-foreground">{title}</h4>
      <div className="space-y-2">
        {options?.map((option) => (
          <div key={option?.value} className="flex items-start space-x-3">
            <Checkbox
              checked={
                type === 'radio' 
                  ? filters?.[category] === option?.value
                  : filters?.[category]?.includes(option?.value)
              }
              onChange={(e) => handleFilterChange(category, option?.value, e?.target?.checked)}
            />
            <div className="flex-1 min-w-0">
              <label className="text-sm font-medium text-foreground cursor-pointer">
                {option?.label}
              </label>
              {option?.description && (
                <p className="text-xs text-muted-foreground">{option?.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-foreground" />
            <h3 className="font-medium text-foreground">Filters</h3>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-error hover:text-error/80"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              className="lg:hidden"
            >
              {isExpanded ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 space-y-6">
          {/* Quick Filters - Mobile */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button
                variant={filters?.difficulty?.includes('Easy') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('difficulty', 'Easy', !filters?.difficulty?.includes('Easy'))}
              >
                Easy
              </Button>
              <Button
                variant={filters?.difficulty?.includes('Medium') ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('difficulty', 'Medium', !filters?.difficulty?.includes('Medium'))}
              >
                Medium
              </Button>
            </div>
          </div>

          {/* Difficulty Level */}
          {renderFilterSection('Difficulty Level', 'difficulty', filterOptions?.difficulty)}

          {/* Career Goals */}
          {renderFilterSection('Career Goals', 'careerGoals', filterOptions?.careerGoals)}

          {/* Interest Areas */}
          {renderFilterSection('Interest Areas', 'interests', filterOptions?.interests)}

          {/* Salary Expectations */}
          {renderFilterSection('Expected Salary Range', 'salaryRange', filterOptions?.salaryRange, 'radio')}

          {/* Job Market Demand */}
          {renderFilterSection('Job Market Demand', 'jobDemand', filterOptions?.jobDemand, 'radio')}

          {/* Study Mode Preference */}
          {renderFilterSection('Study Mode Preference', 'studyMode', filterOptions?.studyMode)}
        </div>

        {/* Apply Filters Button - Mobile */}
        <div className="p-4 border-t border-border lg:hidden">
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="w-full"
            iconName="Check"
            iconPosition="left"
          >
            Apply Filters ({getActiveFiltersCount()})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StreamFilters;