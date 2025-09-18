import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ComparisonFilters = ({ filters, onFiltersChange, onReset }) => {
  const focusOptions = [
    { value: 'all', label: 'All Criteria' },
    { value: 'academics', label: 'Academic Excellence' },
    { value: 'infrastructure', label: 'Infrastructure & Facilities' },
    { value: 'financial', label: 'Financial Considerations' },
    { value: 'placement', label: 'Placement & Career' },
    { value: 'location', label: 'Location & Accessibility' }
  ];

  const sortOptions = [
    { value: 'name', label: 'College Name' },
    { value: 'rating', label: 'Rating' },
    { value: 'fees', label: 'Fees (Low to High)' },
    { value: 'cutoff', label: 'Cut-off Score' },
    { value: 'placement', label: 'Placement Rate' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleCheckboxChange = (key, checked) => {
    onFiltersChange({
      ...filters,
      [key]: checked
    });
  };

  const hasActiveFilters = () => {
    return filters?.focus !== 'all' || 
           filters?.sortBy !== 'name' || 
           filters?.showOnlyDifferences || 
           filters?.highlightBest;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-primary" />
          <h3 className="font-semibold text-foreground">Comparison Filters</h3>
        </div>
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onReset}
            className="text-muted-foreground hover:text-foreground"
          >
            Reset
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Focus Area */}
        <div>
          <Select
            label="Focus Area"
            options={focusOptions}
            value={filters?.focus}
            onChange={(value) => handleFilterChange('focus', value)}
            className="w-full"
          />
        </div>

        {/* Sort By */}
        <div>
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
            className="w-full"
          />
        </div>

        {/* Display Options */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Display Options</label>
          <div className="space-y-2">
            <Checkbox
              label="Show only differences"
              description="Hide similar criteria"
              checked={filters?.showOnlyDifferences}
              onChange={(e) => handleCheckboxChange('showOnlyDifferences', e?.target?.checked)}
            />
            <Checkbox
              label="Highlight best values"
              description="Mark top performers"
              checked={filters?.highlightBest}
              onChange={(e) => handleCheckboxChange('highlightBest', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Quick Actions</label>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Expand"
              iconPosition="left"
              fullWidth
              onClick={() => handleFilterChange('expandAll', !filters?.expandAll)}
            >
              {filters?.expandAll ? 'Collapse All' : 'Expand All'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              fullWidth
            >
              Export Data
            </Button>
          </div>
        </div>
      </div>
      {/* Active Filters Summary */}
      {hasActiveFilters() && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={14} />
            <span>
              Active filters: 
              {filters?.focus !== 'all' && ` Focus on ${focusOptions?.find(o => o?.value === filters?.focus)?.label}`}
              {filters?.sortBy !== 'name' && `, Sorted by ${sortOptions?.find(o => o?.value === filters?.sortBy)?.label}`}
              {filters?.showOnlyDifferences && `, Showing differences only`}
              {filters?.highlightBest && `, Highlighting best values`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonFilters;