import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ResourceCard = ({ resource, onDownload, onBookmark, onView }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return 'FileText';
      case 'video': return 'Play';
      case 'quiz': return 'HelpCircle';
      case 'practice': return 'Target';
      case 'notes': return 'BookOpen';
      default: return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'pdf': return 'text-error bg-error/10';
      case 'video': return 'text-primary bg-primary/10';
      case 'quiz': return 'text-warning bg-warning/10';
      case 'practice': return 'text-accent bg-accent/10';
      case 'notes': return 'text-secondary bg-secondary/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-200 group">
      {/* Thumbnail */}
      <div className="relative h-32 bg-muted overflow-hidden">
        <Image
          src={resource?.thumbnail}
          alt={resource?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <div className={`p-1.5 rounded-md ${getTypeColor(resource?.type)}`}>
            <Icon name={getTypeIcon(resource?.type)} size={14} />
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <button
            onClick={() => onBookmark(resource?.id)}
            className={`p-1.5 rounded-md transition-colors duration-200 ${
              resource?.isBookmarked 
                ? 'bg-warning text-warning-foreground' 
                : 'bg-background/80 text-text-secondary hover:text-warning'
            }`}
          >
            <Icon name={resource?.isBookmarked ? "Bookmark" : "BookmarkPlus"} size={14} />
          </button>
        </div>
        {resource?.duration && (
          <div className="absolute bottom-2 right-2 bg-background/90 text-text-primary text-xs px-2 py-1 rounded">
            {resource?.duration}
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-text-primary text-sm line-clamp-2 flex-1">
            {resource?.title}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <Icon name="Star" size={12} className="text-warning fill-current" />
            <span className="text-xs text-text-secondary">{resource?.rating}</span>
          </div>
        </div>

        <p className="text-xs text-text-secondary mb-3 line-clamp-2">
          {resource?.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="User" size={12} />
              <span>{resource?.author}</span>
            </div>
            {resource?.fileSize && (
              <div className="flex items-center space-x-1">
                <Icon name="HardDrive" size={12} />
                <span>{formatFileSize(resource?.fileSize)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Download" size={12} className="text-accent" />
            <span className="text-xs text-text-secondary">{resource?.downloads}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {resource?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {resource?.tags?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
              +{resource?.tags?.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="xs"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onView(resource)}
            className="flex-1"
          >
            View
          </Button>
          <Button
            variant="outline"
            size="xs"
            iconName="Download"
            onClick={() => onDownload(resource)}
          >
            Download
          </Button>
        </div>

        {resource?.isOfflineAvailable && (
          <div className="flex items-center space-x-1 mt-2 text-xs text-accent">
            <Icon name="Wifi" size={12} />
            <span>Available offline</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;