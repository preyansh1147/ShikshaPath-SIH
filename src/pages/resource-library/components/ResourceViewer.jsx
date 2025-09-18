import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ResourceViewer = ({ resource, onClose, onBookmark, onDownload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(resource?.isBookmarked || false);
  const [readingProgress, setReadingProgress] = useState(resource?.progress || 0);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(resource?.id, !isBookmarked);
  };

  const handleProgressUpdate = (progress) => {
    setReadingProgress(progress);
    // In a real app, this would save to backend
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
    <div className="fixed inset-0 z-100 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden card-shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name={getTypeIcon(resource?.type)} size={24} className="text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">{resource?.title}</h2>
              <p className="text-sm text-muted-foreground">{resource?.author}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              iconName={isBookmarked ? 'Bookmark' : 'BookmarkPlus'}
              onClick={handleBookmark}
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => onDownload(resource)}
            >
              Download
            </Button>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Progress Bar */}
        {readingProgress > 0 && (
          <div className="px-4 py-2 bg-muted/50">
            <ProgressIndicator
              progress={readingProgress}
              total={100}
              showPercentage={true}
              size="sm"
              className="mb-0"
            />
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {resource?.type === 'PDF' && (
            <div className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-8 text-center">
                <Icon name="FileText" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">PDF Document</h3>
                <p className="text-muted-foreground mb-4">
                  This is a preview of the PDF document. Download to view the full content.
                </p>
                <div className="prose max-w-none">
                  <h4 className="text-foreground">Sample Content:</h4>
                  <p className="text-muted-foreground">
                    {resource?.sampleContent || `This comprehensive guide covers all aspects of ${resource?.title}. It includes detailed explanations, practical examples, and exercises to help you master the concepts.\n\nThe document is structured to provide a step-by-step learning experience, starting from basic concepts and gradually progressing to advanced topics.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {resource?.type === 'Video' && (
            <div className="space-y-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Icon name="Play" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Video Content</h3>
                  <p className="text-muted-foreground mb-4">Duration: {resource?.duration}</p>
                  <Button variant="default" iconName="Play" iconPosition="left">
                    Play Video
                  </Button>
                </div>
              </div>
              <div className="prose max-w-none">
                <h4 className="text-foreground">About this video:</h4>
                <p className="text-muted-foreground">{resource?.description}</p>
              </div>
            </div>
          )}

          {resource?.type === 'Interactive' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
                <Icon name="MousePointer" size={64} className="mx-auto text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Content</h3>
                <p className="text-muted-foreground mb-4">
                  Engage with interactive exercises and simulations
                </p>
                <Button variant="default" iconName="ExternalLink" iconPosition="right">
                  Launch Interactive Content
                </Button>
              </div>
            </div>
          )}

          {/* Resource Details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Resource Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <span className="text-foreground">{resource?.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="text-foreground">{resource?.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning" />
                    <span className="text-foreground">{resource?.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Downloads:</span>
                  <span className="text-foreground">{resource?.downloads}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {resource?.tags?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Last updated: {resource?.lastUpdated}</span>
            <span>•</span>
            <span>Language: {resource?.language}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              onClick={() => console.log('Share resource')}
            >
              Share
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Download"
              onClick={() => onDownload(resource)}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceViewer;