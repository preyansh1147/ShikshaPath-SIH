import React from 'react';
import Icon from '../../../components/AppIcon';
import ResourceCard from './ResourceCard';

const RecommendedSection = ({ 
  recommendations, 
  title = "Recommended for You",
  subtitle = "Based on your profile and interests",
  onBookmark,
  onDownload,
  onView 
}) => {
  if (!recommendations || recommendations?.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <Icon name="Sparkles" size={24} className="mr-2 text-primary" />
            {title}
          </h2>
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} />
          <span>Personalized</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendations?.map((resource) => (
          <ResourceCard
            key={resource?.id}
            resource={resource}
            onBookmark={onBookmark}
            onDownload={onDownload}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedSection;