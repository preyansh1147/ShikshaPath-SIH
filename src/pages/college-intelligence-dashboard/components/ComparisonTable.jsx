import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonTable = ({ colleges, onRemoveCollege, onClose }) => {
  if (!colleges || colleges?.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-elevation-2 border border-border p-8 text-center">
        <Icon name="GitCompare" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">No Colleges Selected</h3>
        <p className="text-text-secondary">Add colleges to compare their features side by side</p>
      </div>
    );
  }

  const comparisonData = [
    { label: 'College Name', key: 'name', type: 'text' },
    { label: 'Location', key: 'location', type: 'text' },
    { label: 'Annual Fees', key: 'fees', type: 'currency' },
    { label: 'Rating', key: 'rating', type: 'rating' },
    { label: 'Placement Rate', key: 'placement', type: 'percentage' },
    { label: 'Cut-off Marks', key: 'cutoff', type: 'percentage' },
    { label: 'Faculty Ratio', key: 'facultyRatio', type: 'ratio' },
    { label: 'Distance', key: 'distance', type: 'distance' },
    { label: 'Quota', key: 'quota', type: 'text' },
    { label: 'Hostel', key: 'hostel', type: 'boolean' },
    { label: 'Top Companies', key: 'topCompanies', type: 'array' }
  ];

  const formatValue = (value, type) => {
    switch (type) {
      case 'currency':
        return `₹${value?.toLocaleString()}`;
      case 'percentage':
        return `${value}%`;
      case 'rating':
        return (
          <div className="flex items-center">
            <Icon name="Star" size={16} className="text-yellow-500 mr-1" />
            {value}
          </div>
        );
      case 'ratio':
        return `1:${value}`;
      case 'distance':
        return `${value} km`;
      case 'boolean':
        return value ? (
          <Icon name="Check" size={16} className="text-green-600" />
        ) : (
          <Icon name="X" size={16} className="text-red-600" />
        );
      case 'array':
        return value ? value?.slice(0, 3)?.join(', ') : 'N/A';
      default:
        return value || 'N/A';
    }
  };

  const getBestValue = (colleges, key, type) => {
    if (type === 'currency') {
      return Math.min(...colleges?.map(c => c?.[key]));
    } else if (type === 'percentage' || type === 'rating') {
      return Math.max(...colleges?.map(c => c?.[key]));
    } else if (type === 'distance') {
      return Math.min(...colleges?.map(c => c?.[key]));
    }
    return null;
  };

  const isBestValue = (value, colleges, key, type) => {
    const bestValue = getBestValue(colleges, key, type);
    return bestValue !== null && value === bestValue;
  };

  return (
    <div className="bg-white rounded-xl shadow-elevation-2 border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-3">
          <Icon name="GitCompare" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-text-primary">
            College Comparison ({colleges?.length}/5)
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClose}
        />
      </div>
      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-medium text-text-secondary w-48">
                Features
              </th>
              {colleges?.map((college, index) => (
                <th key={index} className="text-center p-4 min-w-64">
                  <div className="space-y-3">
                    <div className="relative">
                      <Image
                        src={college?.image}
                        alt={college?.name}
                        className="w-16 h-16 rounded-lg object-cover mx-auto"
                      />
                      <button
                        onClick={() => onRemoveCollege(college?.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                    <div className="text-sm font-medium text-text-primary text-center">
                      {college?.name?.length > 30 ? `${college?.name?.substring(0, 30)}...` : college?.name}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonData?.map((row, rowIndex) => (
              <tr key={rowIndex} className={`border-b border-border ${rowIndex % 2 === 0 ? 'bg-muted/20' : ''}`}>
                <td className="p-4 font-medium text-text-primary">
                  {row?.label}
                </td>
                {colleges?.map((college, colIndex) => {
                  const value = college?.[row?.key];
                  const isBest = isBestValue(value, colleges, row?.key, row?.type);
                  
                  return (
                    <td key={colIndex} className={`p-4 text-center ${isBest ? 'bg-green-50 text-green-800 font-semibold' : ''}`}>
                      <div className="flex items-center justify-center">
                        {formatValue(value, row?.type)}
                        {isBest && (
                          <Icon name="Crown" size={16} className="ml-2 text-yellow-500" />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Action Buttons */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex flex-wrap gap-3 justify-center">
          {colleges?.map((college, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              onClick={() => window.open(`/college/${college?.id}`, '_blank')}
            >
              View {college?.name?.split(' ')?.[0]} Details
            </Button>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-center space-x-6 text-xs text-text-secondary">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 rounded mr-2"></div>
            Best Value
          </div>
          <div className="flex items-center">
            <Icon name="Crown" size={14} className="text-yellow-500 mr-2" />
            Top Performer
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;