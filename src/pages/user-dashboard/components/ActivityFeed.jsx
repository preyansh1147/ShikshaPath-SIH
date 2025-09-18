import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'assessment',
      title: 'Completed Aptitude Assessment',
      description: 'Scored 85% in logical reasoning section',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'Brain',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 2,
      type: 'bookmark',
      title: 'Saved IIT Delhi',
      description: 'Added to college comparison list',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      icon: 'Bookmark',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 3,
      type: 'exploration',
      title: 'Explored Computer Science Stream',
      description: 'Viewed career pathways and job prospects',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'Compass',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 4,
      type: 'comparison',
      title: 'Compared 3 Engineering Colleges',
      description: 'IIT Delhi vs IIT Bombay vs IIT Kanpur',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'GitCompare',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 5,
      type: 'profile',
      title: 'Updated Academic Information',
      description: 'Added Class 12 marks and subjects',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: 'User',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Activity', count: activities?.length },
    { id: 'assessment', label: 'Assessments', count: activities?.filter(a => a?.type === 'assessment')?.length },
    { id: 'bookmark', label: 'Saved Items', count: activities?.filter(a => a?.type === 'bookmark')?.length },
    { id: 'exploration', label: 'Explorations', count: activities?.filter(a => a?.type === 'exploration')?.length }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        </div>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
      </div>
      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 mb-6 overflow-x-auto">
        {filters?.map((filterOption) => (
          <button
            key={filterOption?.id}
            onClick={() => setFilter(filterOption?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              filter === filterOption?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <span>{filterOption?.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              filter === filterOption?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {filterOption?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities?.length > 0 ? (
          filteredActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${activity?.bgColor}`}>
                <Icon name={activity?.icon} size={16} className={activity?.color} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {activity?.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{activity?.description}</p>
              </div>
              
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="MoreVertical" size={16} className="text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={32} className="text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">No activity found</h3>
            <p className="text-sm text-muted-foreground">
              No activities match the selected filter.
            </p>
          </div>
        )}
      </div>
      {/* View All Link */}
      {filteredActivities?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border text-center">
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            View All Activity
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;