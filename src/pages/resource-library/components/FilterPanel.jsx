import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'pdf', label: 'PDF Documents' },
    { value: 'video', label: 'Video Content' },
    { value: 'audio', label: 'Audio Content' },
    { value: 'interactive', label: 'Interactive Content' }
  ];

  const languageOptions = [
    { value: 'all', label: 'All Languages' },
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'bilingual', label: 'Bilingual' }
  ];

  const streamOptions = [
    'Science',
    'Commerce',
    'Arts',
    'Vocational',
    'Engineering',
    'Medical',
    'Management'
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="SlidersHorizontal" size={20} className="mr-2" />
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          onClick={onClearFilters}
          className="text-xs"
        >
          Clear
        </Button>
      </div>
      <div className="space-y-4">
        {/* Difficulty Level */}
        <div>
          <Select
            label="Difficulty Level"
            options={difficultyOptions}
            value={filters?.difficulty}
            onChange={(value) => onFilterChange('difficulty', value)}
          />
        </div>

        {/* Content Type */}
        <div>
          <Select
            label="Content Type"
            options={typeOptions}
            value={filters?.type}
            onChange={(value) => onFilterChange('type', value)}
          />
        </div>

        {/* Language */}
        <div>
          <Select
            label="Language"
            options={languageOptions}
            value={filters?.language}
            onChange={(value) => onFilterChange('language', value)}
          />
        </div>

        {/* Stream/Subject */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Stream/Subject
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {streamOptions?.map((stream) => (
              <Checkbox
                key={stream}
                label={stream}
                checked={filters?.streams?.includes(stream) || false}
                onChange={(e) => {
                  const currentStreams = filters?.streams || [];
                  const newStreams = e?.target?.checked
                    ? [...currentStreams, stream]
                    : currentStreams?.filter(s => s !== stream);
                  onFilterChange('streams', newStreams);
                }}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Minimum Rating
          </label>
          <div className="flex items-center space-x-2">
            {[4, 3, 2, 1]?.map((rating) => (
              <Button
                key={rating}
                variant={filters?.minRating === rating ? 'default' : 'outline'}
                size="sm"
                onClick={() => onFilterChange('minRating', rating)}
                className="flex items-center space-x-1"
              >
                <Icon name="Star" size={14} />
                <span>{rating}+</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Free/Paid Filter */}
        <div>
          <Checkbox
            label="Free Resources Only"
            checked={filters?.freeOnly || false}
            onChange={(e) => onFilterChange('freeOnly', e?.target?.checked)}
          />
        </div>

        {/* Recently Added */}
        <div>
          <Checkbox
            label="Recently Added (Last 30 days)"
            checked={filters?.recentOnly || false}
            onChange={(e) => onFilterChange('recentOnly', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;