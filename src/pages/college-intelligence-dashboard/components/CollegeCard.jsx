import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CollegeCard = ({ college, onCompare, isComparing, onViewDetails, onVirtualTour }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const getQuotaColor = (quota) => {
    switch (quota) {
      case 'General': return 'bg-blue-100 text-blue-800';
      case 'OBC': return 'bg-green-100 text-green-800';
      case 'SC/ST': return 'bg-purple-100 text-purple-800';
      case 'EWS': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 border border-border overflow-hidden">
      {/* Header Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={college?.image}
          alt={college?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
              isBookmarked 
                ? 'bg-red-500 text-white' :'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Icon name={isBookmarked ? "Heart" : "Heart"} size={16} />
          </button>
          <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
            {college?.distance} km away
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQuotaColor(college?.quota)}`}>
            {college?.quota} Quota
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {/* College Name & Rating */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-2">
              {college?.name}
            </h3>
            <p className="text-sm text-text-secondary flex items-center">
              <Icon name="MapPin" size={14} className="mr-1" />
              {college?.location}
            </p>
          </div>
          <div className="flex items-center ml-3">
            <Icon name="Star" size={16} className={`mr-1 ${getRatingColor(college?.rating)}`} />
            <span className={`text-sm font-medium ${getRatingColor(college?.rating)}`}>
              {college?.rating}
            </span>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-primary">₹{college?.fees?.toLocaleString()}</div>
            <div className="text-xs text-text-secondary">Annual Fees</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-accent">{college?.placement}%</div>
            <div className="text-xs text-text-secondary">Placement Rate</div>
          </div>
        </div>

        {/* Courses */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {college?.courses?.slice(0, 3)?.map((course, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {course}
              </span>
            ))}
            {college?.courses?.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{college?.courses?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between mb-4 text-xs text-text-secondary">
          <div className="flex items-center">
            <Icon name="Home" size={12} className="mr-1" />
            {college?.hostel ? 'Hostel Available' : 'No Hostel'}
          </div>
          <div className="flex items-center">
            <Icon name="Users" size={12} className="mr-1" />
            1:{college?.facultyRatio} Faculty
          </div>
        </div>

        {/* Cut-off */}
        <div className="mb-4 p-3 bg-warning/10 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary">Last Year Cut-off</span>
            <span className="text-sm font-semibold text-warning">{college?.cutoff}%</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(college)}
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="Video"
            iconPosition="left"
            onClick={() => onVirtualTour(college)}
            className="bg-secondary hover:bg-secondary/90"
          >
            Virtual Tour
          </Button>
        </div>

        {/* Compare Button */}
        <div className="mt-3">
          <Button
            variant={isComparing ? "destructive" : "outline"}
            size="sm"
            fullWidth
            iconName={isComparing ? "X" : "Plus"}
            iconPosition="left"
            onClick={() => onCompare(college)}
          >
            {isComparing ? 'Remove from Compare' : 'Add to Compare'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;