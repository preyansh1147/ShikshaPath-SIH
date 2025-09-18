import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeadlineTracker = ({ deadlines, onAddDeadline, onUpdateDeadline, onDeleteDeadline }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  const getUrgencyLevel = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'overdue';
    if (diffDays <= 3) return 'critical';
    if (diffDays <= 7) return 'urgent';
    if (diffDays <= 14) return 'moderate';
    return 'normal';
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'overdue': return 'bg-error text-error-foreground';
      case 'critical': return 'bg-error/80 text-error-foreground';
      case 'urgent': return 'bg-warning text-warning-foreground';
      case 'moderate': return 'bg-primary text-primary-foreground';
      case 'normal': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-text-secondary';
    }
  };

  const filteredDeadlines = deadlines?.filter(deadline => {
    if (filter === 'all') return true;
    const urgency = getUrgencyLevel(deadline?.date);
    return urgency === filter;
  });

  const sortedDeadlines = [...filteredDeadlines]?.sort((a, b) => {
    if (sortBy === 'deadline') {
      return new Date(a.date) - new Date(b.date);
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
    }
    return a?.title?.localeCompare(b?.title);
  });

  const urgencyCounts = deadlines?.reduce((acc, deadline) => {
    const urgency = getUrgencyLevel(deadline?.date);
    acc[urgency] = (acc?.[urgency] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Deadline Tracker</h3>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={onAddDeadline}
        >
          Add Deadline
        </Button>
      </div>
      {/* Urgency Overview */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {[
          { key: 'overdue', label: 'Overdue', color: 'bg-error' },
          { key: 'critical', label: 'Critical', color: 'bg-error/80' },
          { key: 'urgent', label: 'Urgent', color: 'bg-warning' },
          { key: 'moderate', label: 'Moderate', color: 'bg-primary' },
          { key: 'normal', label: 'Normal', color: 'bg-accent' }
        ]?.map(({ key, label, color }) => (
          <div
            key={key}
            className={`p-2 rounded-lg text-center cursor-pointer transition-all duration-200 ${
              filter === key ? `${color} text-white` : 'bg-muted hover:bg-muted/80'
            }`}
            onClick={() => setFilter(filter === key ? 'all' : key)}
          >
            <div className="text-lg font-bold">{urgencyCounts?.[key] || 0}</div>
            <div className="text-xs">{label}</div>
          </div>
        ))}
      </div>
      {/* Filters and Sort */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e?.target?.value)}
            className="text-sm border border-border rounded-md px-2 py-1 bg-surface"
          >
            <option value="all">All Deadlines</option>
            <option value="overdue">Overdue</option>
            <option value="critical">Critical</option>
            <option value="urgent">Urgent</option>
            <option value="moderate">Moderate</option>
            <option value="normal">Normal</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-md px-2 py-1 bg-surface"
          >
            <option value="deadline">Deadline</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      {/* Deadlines List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {sortedDeadlines?.map((deadline) => {
          const urgency = getUrgencyLevel(deadline?.date);
          const daysRemaining = Math.ceil((new Date(deadline.date) - new Date()) / (1000 * 60 * 60 * 24));
          
          return (
            <div
              key={deadline?.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(urgency)}`}>
                  {urgency}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary text-sm">{deadline?.title}</h4>
                  <div className="flex items-center space-x-3 text-xs text-text-secondary mt-1">
                    <span>{deadline?.category}</span>
                    <span>•</span>
                    <span>{new Date(deadline.date)?.toLocaleDateString('en-IN')}</span>
                    <span>•</span>
                    <span className={daysRemaining < 0 ? 'text-error font-medium' : ''}>
                      {daysRemaining < 0 
                        ? `${Math.abs(daysRemaining)} days overdue`
                        : daysRemaining === 0 
                        ? 'Due today'
                        : `${daysRemaining} days left`
                      }
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Edit"
                  onClick={() => onUpdateDeadline(deadline)}
                />
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Trash2"
                  onClick={() => onDeleteDeadline(deadline?.id)}
                  className="text-error hover:text-error"
                />
              </div>
            </div>
          );
        })}
      </div>
      {sortedDeadlines?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-text-secondary">No deadlines found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default DeadlineTracker;