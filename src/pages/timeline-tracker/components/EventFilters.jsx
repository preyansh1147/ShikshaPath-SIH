import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const EventFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  eventCounts 
}) => {
  const eventTypeOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'application', label: 'Applications' },
    { value: 'exam', label: 'Exams' },
    { value: 'scholarship', label: 'Scholarships' },
    { value: 'counseling', label: 'Counseling' },
    { value: 'document', label: 'Documents' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'upcoming', label: 'Upcoming' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters)?.some(value => value !== 'all' && value !== '');
  };

  return (
    <div className="bg-card rounded-lg p-6 card-shadow mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filter Events</span>
        </h3>
        {hasActiveFilters() && (
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Search Input */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search events by title or description..."
          value={filters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Event Type"
          options={eventTypeOptions}
          value={filters?.type || 'all'}
          onChange={(value) => handleFilterChange('type', value)}
        />
        
        <Select
          label="Priority"
          options={priorityOptions}
          value={filters?.priority || 'all'}
          onChange={(value) => handleFilterChange('priority', value)}
        />
        
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status || 'all'}
          onChange={(value) => handleFilterChange('status', value)}
        />
        
        <Select
          label="Time Range"
          options={timeRangeOptions}
          value={filters?.timeRange || 'all'}
          onChange={(value) => handleFilterChange('timeRange', value)}
        />
      </div>
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={filters?.timeRange === 'today' ? 'default' : 'outline'}
          size="sm"
          iconName="Calendar"
          iconPosition="left"
          onClick={() => handleFilterChange('timeRange', 'today')}
        >
          Today ({eventCounts?.today || 0})
        </Button>
        
        <Button
          variant={filters?.timeRange === 'week' ? 'default' : 'outline'}
          size="sm"
          iconName="CalendarDays"
          iconPosition="left"
          onClick={() => handleFilterChange('timeRange', 'week')}
        >
          This Week ({eventCounts?.week || 0})
        </Button>
        
        <Button
          variant={filters?.priority === 'high' ? 'default' : 'outline'}
          size="sm"
          iconName="AlertTriangle"
          iconPosition="left"
          onClick={() => handleFilterChange('priority', 'high')}
        >
          High Priority ({eventCounts?.highPriority || 0})
        </Button>
        
        <Button
          variant={filters?.status === 'overdue' ? 'default' : 'outline'}
          size="sm"
          iconName="Clock"
          iconPosition="left"
          onClick={() => handleFilterChange('status', 'overdue')}
        >
          Overdue ({eventCounts?.overdue || 0})
        </Button>
      </div>
      {/* Filter Summary */}
      {hasActiveFilters() && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>
            Showing {eventCounts?.filtered || 0} of {eventCounts?.total || 0} events
          </span>
        </div>
      )}
    </div>
  );
};

export default EventFilters;