import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const IndustryInsightCard = ({ insight, onReadMore, onBookmark, onShare }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Activity';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      case 'stable': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'technology': return 'bg-primary/10 text-primary';
      case 'healthcare': return 'bg-accent/10 text-accent';
      case 'finance': return 'bg-secondary/10 text-secondary';
      case 'education': return 'bg-success/10 text-success';
      case 'manufacturing': return 'bg-warning/10 text-warning';
      default: return 'bg-muted text-text-secondary';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-200 group">
      {/* Header Image */}
      <div className="relative h-32 bg-muted overflow-hidden">
        <Image
          src={insight?.image}
          alt={insight?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(insight?.category)}`}>
            {insight?.category}
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <button
            onClick={() => onBookmark(insight?.id)}
            className={`p-1.5 rounded-md transition-colors duration-200 ${
              insight?.isBookmarked 
                ? 'bg-warning text-warning-foreground' 
                : 'bg-background/80 text-text-secondary hover:text-warning'
            }`}
          >
            <Icon name={insight?.isBookmarked ? "Bookmark" : "BookmarkPlus"} size={14} />
          </button>
        </div>
        {insight?.isNew && (
          <div className="absolute bottom-2 left-2 bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
            New
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-text-primary text-sm line-clamp-2 flex-1">
            {insight?.title}
          </h3>
          <div className={`flex items-center space-x-1 ml-2 ${getTrendColor(insight?.trend)}`}>
            <Icon name={getTrendIcon(insight?.trend)} size={14} />
            <span className="text-xs font-medium">{insight?.growthRate}</span>
          </div>
        </div>

        <p className="text-xs text-text-secondary mb-3 line-clamp-3">
          {insight?.summary}
        </p>

        <div className="space-y-2 mb-3">
          <div className="text-xs text-text-secondary font-medium">Key Highlights:</div>
          <div className="space-y-1">
            {insight?.highlights?.slice(0, 2)?.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={12} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-xs text-text-secondary">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{new Date(insight.publishedDate)?.toLocaleDateString('en-IN')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{insight?.readTime} min read</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={12} className="text-primary" />
            <span className="text-xs text-text-secondary">{insight?.views}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {insight?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {insight?.tags?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
              +{insight?.tags?.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="xs"
            iconName="BookOpen"
            iconPosition="left"
            onClick={() => onReadMore(insight)}
            className="flex-1"
          >
            Read More
          </Button>
          <Button
            variant="outline"
            size="xs"
            iconName="Share2"
            onClick={() => onShare(insight)}
          >
            Share
          </Button>
        </div>

        {insight?.relatedCareers && insight?.relatedCareers?.length > 0 && (
          <div className="mt-3 p-2 bg-primary/5 border border-primary/10 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="Briefcase" size={14} className="text-primary mt-0.5" />
              <div>
                <div className="text-xs font-medium text-primary mb-1">Related Careers:</div>
                <div className="text-xs text-text-secondary">
                  {insight?.relatedCareers?.slice(0, 3)?.join(', ')}
                  {insight?.relatedCareers?.length > 3 && ` +${insight?.relatedCareers?.length - 3} more`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndustryInsightCard;