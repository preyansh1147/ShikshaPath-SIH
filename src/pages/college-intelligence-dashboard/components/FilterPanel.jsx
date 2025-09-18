import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, onApplyFilters, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const states = [
    'All States', 'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal'
  ];

  const courseTypes = [
    'Engineering', 'Medical', 'Arts', 'Science', 'Commerce', 'Law', 'Management', 
    'Agriculture', 'Pharmacy', 'Architecture', 'Education', 'Journalism'
  ];

  const quotaTypes = ['General', 'OBC', 'SC/ST', 'EWS', 'Minority'];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters();
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      state: 'All States',
      courseType: '',
      maxFees: 100000,
      quota: '',
      hostel: false,
      minRating: 0,
      maxDistance: 100,
      placement: 0
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose} />
      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-elevation-4 lg:relative lg:w-full lg:shadow-none lg:bg-transparent overflow-y-auto">
        <div className="p-6 lg:p-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-text-primary">Filter Colleges</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                <Icon name="MapPin" size={16} className="inline mr-2" />
                State/Location
              </label>
              <select
                value={localFilters?.state}
                onChange={(e) => handleFilterChange('state', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {states?.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Course Type */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                <Icon name="BookOpen" size={16} className="inline mr-2" />
                Course Type
              </label>
              <select
                value={localFilters?.courseType}
                onChange={(e) => handleFilterChange('courseType', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Courses</option>
                {courseTypes?.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            {/* Fee Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                <Icon name="IndianRupee" size={16} className="inline mr-2" />
                Maximum Annual Fees: ₹{localFilters?.maxFees?.toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={localFilters?.maxFees}
                onChange={(e) => handleFilterChange('maxFees', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>₹0</span>
                <span>₹2,00,000</span>
              </div>
            </div>

            {/* Quota Type */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                <Icon name="Users" size={16} className="inline mr-2" />
                Quota Category
              </label>
              <select
                value={localFilters?.quota}
                onChange={(e) => handleFilterChange('quota', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Categories</option>
                {quotaTypes?.map(quota => (
                  <option key={quota} value={quota}>{quota}</option>
                ))}
              </select>
            </div>

            {/* Distance Range */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                <Icon name="Navigation" size={16} className="inline mr-2" />
                Maximum Distance: {localFilters?.maxDistance} km
              </label>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={localFilters?.maxDistance}
                onChange={(e) => handleFilterChange('maxDistance', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>0 km</span>
                <span>500 km</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                <Icon name="Star" size={16} className="inline mr-2" />
                Minimum Rating: {localFilters?.minRating} stars
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={localFilters?.minRating}
                onChange={(e) => handleFilterChange('minRating', parseFloat(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>0★</span>
                <span>5★</span>
              </div>
            </div>

            {/* Placement Rate */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                <Icon name="TrendingUp" size={16} className="inline mr-2" />
                Minimum Placement Rate: {localFilters?.placement}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={localFilters?.placement}
                onChange={(e) => handleFilterChange('placement', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Hostel Availability */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={localFilters?.hostel}
                  onChange={(e) => handleFilterChange('hostel', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm font-medium text-text-primary">
                  <Icon name="Home" size={16} className="inline mr-2" />
                  Hostel Available
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                fullWidth
                onClick={handleClear}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Clear All
              </Button>
              <Button
                variant="default"
                fullWidth
                onClick={handleApply}
                iconName="Filter"
                iconPosition="left"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;