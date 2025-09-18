import React from 'react';
import Icon from '../../../components/AppIcon';
import QuizProgress from './QuizProgress';

const QuizSidebar = ({ 
  currentQuestion,
  totalQuestions,
  timeRemaining,
  bookmarkedQuestions,
  onBookmarkToggle,
  answers,
  onQuestionJump,
  className = "" 
}) => {
  const getQuestionStatus = (questionNum) => {
    if (answers?.[questionNum]) return 'answered';
    if (questionNum < currentQuestion) return 'skipped';
    if (questionNum === currentQuestion) return 'current';
    return 'upcoming';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered': return 'bg-success text-success-foreground';
      case 'skipped': return 'bg-warning text-warning-foreground';
      case 'current': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'answered': return 'Check';
      case 'skipped': return 'AlertCircle';
      case 'current': return 'Play';
      default: return 'Circle';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quiz Progress Component */}
      <QuizProgress
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        timeRemaining={timeRemaining}
        bookmarkedQuestions={bookmarkedQuestions}
        onBookmarkToggle={onBookmarkToggle}
      />
      {/* Question Navigator */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="List" size={16} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Question Navigator</h3>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }, (_, index) => {
            const questionNum = index + 1;
            const status = getQuestionStatus(questionNum);
            const isBookmarked = bookmarkedQuestions?.includes(questionNum);

            return (
              <button
                key={questionNum}
                onClick={() => onQuestionJump && onQuestionJump(questionNum)}
                className={`
                  relative w-10 h-10 rounded-md text-sm font-medium transition-all duration-200
                  ${getStatusColor(status)}
                  hover:scale-105 hover:shadow-soft
                  ${status === 'current' ? 'ring-2 ring-primary ring-offset-2' : ''}
                `}
                title={`Question ${questionNum} - ${status}`}
              >
                <span className="relative z-10">{questionNum}</span>
                
                {/* Bookmark indicator */}
                {isBookmarked && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Bookmark" size={8} color="white" />
                  </div>
                )}
                
                {/* Status indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Icon name={getStatusIcon(status)} size={12} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-sm"></div>
              <span className="text-muted-foreground">Answered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-sm"></div>
              <span className="text-muted-foreground">Skipped</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
              <span className="text-muted-foreground">Current</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded-sm"></div>
              <span className="text-muted-foreground">Upcoming</span>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-3">Quiz Statistics</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Answered</span>
            <span className="text-sm font-medium text-success">
              {Object.keys(answers)?.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Remaining</span>
            <span className="text-sm font-medium text-muted-foreground">
              {totalQuestions - Object.keys(answers)?.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Bookmarked</span>
            <span className="text-sm font-medium text-accent">
              {bookmarkedQuestions?.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSidebar;