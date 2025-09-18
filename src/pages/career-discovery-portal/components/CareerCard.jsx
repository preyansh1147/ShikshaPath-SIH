import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareerCard = ({ career, onExplore, isBookmarked = false, onBookmark }) => {
  const getSalaryColor = (level) => {
    switch (level) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getGrowthIcon = (growth) => {
    switch (growth) {
      case 'high': return 'TrendingUp';
      case 'medium': return 'Minus';
      default: return 'TrendingDown';
    }
  };

  const getGrowthColor = (growth) => {
    switch (growth) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      default: return 'text-destructive';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border hover:shadow-elevation-2 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${career?.bgColor}`}>
            <Icon name={career?.icon} size={24} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
              {career?.title}
            </h3>
            <p className="text-sm text-text-secondary">{career?.category}</p>
          </div>
        </div>
        <button
          onClick={() => onBookmark(career?.id)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={18} 
            className={isBookmarked ? 'text-primary' : 'text-muted-foreground'}
          />
        </button>
      </div>
      <p className="text-text-secondary mb-4 line-clamp-2">
        {career?.description}
      </p>
      <div className="space-y-3">
        {/* Salary Range */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Salary Range</span>
          <span className={`text-sm font-semibold ${getSalaryColor(career?.salaryLevel)}`}>
            ₹{career?.salaryRange}
          </span>
        </div>

        {/* Growth Prospects */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Growth Prospects</span>
          <div className="flex items-center space-x-1">
            <Icon 
              name={getGrowthIcon(career?.growth)} 
              size={16} 
              className={getGrowthColor(career?.growth)}
            />
            <span className={`text-sm font-medium ${getGrowthColor(career?.growth)}`}>
              {career?.growth?.charAt(0)?.toUpperCase() + career?.growth?.slice(1)}
            </span>
          </div>
        </div>

        {/* Required Education */}
        <div className="space-y-1">
          <span className="text-sm text-text-secondary">Required Education</span>
          <div className="flex flex-wrap gap-1">
            {career?.education?.map((edu, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary"
              >
                {edu}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Required */}
        <div className="space-y-1">
          <span className="text-sm text-text-secondary">Key Skills</span>
          <div className="flex flex-wrap gap-1">
            {career?.skills?.slice(0, 3)?.map((skill, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-text-secondary"
              >
                {skill}
              </span>
            ))}
            {career?.skills?.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-text-secondary">
                +{career?.skills?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => onExplore(career?.id)}
          className="mt-4"
        >
          Explore Career
        </Button>
      </div>
    </div>
  );
};

export default CareerCard;