import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ResourceCard from './ResourceCard';

const BookmarkedResources = ({ bookmarkedResources, onBookmark, onDownload, onView }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!bookmarkedResources || bookmarkedResources?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center card-shadow">
        <Icon name="BookmarkX" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Bookmarked Resources</h3>
        <p className="text-muted-foreground">
          Start bookmarking resources to access them quickly later
        </p>
      </div>
    );
  }

  const displayedResources = isExpanded ? bookmarkedResources : bookmarkedResources?.slice(0, 4);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <Icon name="Bookmark" size={24} className="mr-2 text-primary" />
            Your Bookmarks
          </h2>
          <p className="text-muted-foreground mt-1">
            {bookmarkedResources?.length} saved resource{bookmarkedResources?.length !== 1 ? 's' : ''}
          </p>
        </div>
        {bookmarkedResources?.length > 4 && (
          <Button
            variant="outline"
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : `Show All (${bookmarkedResources?.length})`}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedResources?.map((resource) => (
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

export default BookmarkedResources;