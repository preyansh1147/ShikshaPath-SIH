import React from 'react';
import Icon from '../../../components/AppIcon';

const QuizProgress = ({ 
  currentQuestion, 
  totalQuestions, 
  timeRemaining, 
  bookmarkedQuestions = [],
  onBookmarkToggle,
  className = "" 
}) => {
  const progressPercentage = Math.round((currentQuestion / totalQuestions) * 100);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-foreground">Quiz Progress</h3>
        <span className="text-sm text-muted-foreground">
          {currentQuestion}/{totalQuestions}
        </span>
      </div>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {progressPercentage}% Complete
          </span>
          <span className="text-sm text-primary">
            Question {currentQuestion}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      {/* Time Remaining */}
      <div className="flex items-center space-x-2 mb-4 p-3 bg-muted rounded-md">
        <Icon name="Clock" size={16} className="text-warning" />
        <div>
          <span className="text-sm font-medium text-foreground">Time Remaining</span>
          <div className="text-lg font-bold text-warning">
            {formatTime(timeRemaining)}
          </div>
        </div>
      </div>
      {/* Bookmarked Questions */}
      {bookmarkedQuestions?.length > 0 && (
        <div className="border-t border-border pt-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Bookmark" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">
              Bookmarked ({bookmarkedQuestions?.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {bookmarkedQuestions?.map((questionNum) => (
              <button
                key={questionNum}
                onClick={() => onBookmarkToggle && onBookmarkToggle(questionNum)}
                className="w-8 h-8 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/90 transition-smooth"
              >
                {questionNum}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Quick Stats */}
      <div className="border-t border-border pt-4 mt-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-success">
              {currentQuestion - 1}
            </div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div>
            <div className="text-lg font-bold text-muted-foreground">
              {totalQuestions - currentQuestion + 1}
            </div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;