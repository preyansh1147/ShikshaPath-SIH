import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const ResourceCard = ({ resource, onBookmark, onDownload, onView }) => {
  const [isBookmarked, setIsBookmarked] = useState(resource?.isBookmarked || false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(resource?.id, !isBookmarked);
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-success text-success-foreground';
      case 'Intermediate': return 'bg-warning text-warning-foreground';
      case 'Advanced': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'PDF': return 'FileText';
      case 'Video': return 'Play';
      case 'Audio': return 'Headphones';
      case 'Interactive': return 'MousePointer';
      default: return 'File';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg card-shadow hover-scale smooth-transition overflow-hidden">
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <Image
            src={resource?.thumbnail}
            alt={resource?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(resource?.difficulty)}`}>
            {resource?.difficulty}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          {resource?.isNew && (
            <NotificationBadge count="New" variant="success" size="sm" />
          )}
          <Button
            variant="ghost"
            size="icon"
            iconName={isBookmarked ? 'Bookmark' : 'BookmarkPlus'}
            onClick={handleBookmark}
            className="w-8 h-8 bg-card/80 backdrop-blur-sm hover:bg-card"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2">
            {resource?.title}
          </h3>
          <Icon name={getTypeIcon(resource?.type)} size={20} className="text-muted-foreground ml-2 flex-shrink-0" />
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {resource?.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{resource?.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} />
              <span>{resource?.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={14} />
              <span>{resource?.downloads}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {resource?.tags?.slice(0, 2)?.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                {tag}
              </span>
            ))}
            {resource?.tags?.length > 2 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{resource?.tags?.length - 2}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => onDownload(resource)}
              className="text-xs"
            >
              Download
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onView(resource)}
              className="text-xs"
            >
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;