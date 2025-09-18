import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScholarshipCard = ({ scholarship, onApply, onViewDetails, onBookmark }) => {
  const getEligibilityStatus = (criteria, userProfile) => {
    // Mock eligibility check
    const eligible = Math.random() > 0.3;
    return eligible ? 'eligible' : 'not-eligible';
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(scholarship?.deadline);
  const isUrgent = daysRemaining <= 15;
  const eligibilityStatus = getEligibilityStatus(scholarship?.eligibility);

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-text-primary text-sm">{scholarship?.name}</h3>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              scholarship?.type === 'government' ?'bg-primary/10 text-primary' 
                : scholarship?.type === 'private' ?'bg-secondary/10 text-secondary' :'bg-accent/10 text-accent'
            }`}>
              {scholarship?.type}
            </div>
          </div>
          <p className="text-xs text-text-secondary">{scholarship?.provider}</p>
        </div>
        <button
          onClick={() => onBookmark(scholarship?.id)}
          className={`p-1.5 rounded-md transition-colors duration-200 ${
            scholarship?.isBookmarked 
              ? 'bg-warning/10 text-warning' :'text-text-secondary hover:text-warning hover:bg-warning/10'
          }`}
        >
          <Icon name={scholarship?.isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
        </button>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="IndianRupee" size={14} className="text-accent" />
            <span className="text-sm font-medium text-text-primary">
              ₹{scholarship?.amount?.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-text-secondary">
              {scholarship?.amountType}
            </span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            eligibilityStatus === 'eligible' ?'bg-success/10 text-success' :'bg-error/10 text-error'
          }`}>
            {eligibilityStatus === 'eligible' ? 'Eligible' : 'Not Eligible'}
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>Deadline: {new Date(scholarship.deadline)?.toLocaleDateString('en-IN')}</span>
          </div>
          <div className={`flex items-center space-x-1 ${isUrgent ? 'text-warning font-medium' : ''}`}>
            <Icon name="Clock" size={12} />
            <span>{daysRemaining} days left</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-text-secondary">
            <span className="font-medium">Eligibility:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {scholarship?.eligibility?.slice(0, 3)?.map((criteria, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
              >
                {criteria}
              </span>
            ))}
            {scholarship?.eligibility?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                +{scholarship?.eligibility?.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-3 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{scholarship?.applicants} applied</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={12} />
            <span>{scholarship?.successRate}% success</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            iconName="Eye"
            onClick={() => onViewDetails(scholarship)}
          >
            Details
          </Button>
          <Button
            variant={eligibilityStatus === 'eligible' ? 'default' : 'outline'}
            size="xs"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => onApply(scholarship)}
            disabled={eligibilityStatus !== 'eligible'}
          >
            Apply
          </Button>
        </div>
      </div>
      {isUrgent && (
        <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={14} className="text-warning" />
            <span className="text-xs text-warning font-medium">
              Application deadline approaching!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScholarshipCard;