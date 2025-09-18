import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  isBookmarked,
  onBookmarkToggle,
  className = "" 
}) => {
  const [hoveredOption, setHoveredOption] = useState(null);

  const handleOptionSelect = (optionId) => {
    onAnswerSelect(optionId);
  };

  const renderQuestionContent = () => {
    switch (question?.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question?.options?.map((option) => (
              <label
                key={option?.id}
                className={`
                  flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-200
                  ${selectedAnswer === option?.id 
                    ? 'border-primary bg-primary/5 shadow-soft' 
                    : hoveredOption === option?.id
                      ? 'border-primary/50 bg-muted/50' :'border-border hover:border-border/80'
                  }
                `}
                onMouseEnter={() => setHoveredOption(option?.id)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <input
                  type="radio"
                  name={`question-${questionNumber}`}
                  value={option?.id}
                  checked={selectedAnswer === option?.id}
                  onChange={() => handleOptionSelect(option?.id)}
                  className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground">
                    {option?.text}
                  </span>
                  {option?.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {option?.description}
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>
        );

      case 'rating-scale':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{question?.scaleLabels?.min || 'Strongly Disagree'}</span>
              <span>{question?.scaleLabels?.max || 'Strongly Agree'}</span>
            </div>
            <div className="flex items-center justify-between px-2">
              {Array.from({ length: question?.scaleRange || 5 }, (_, index) => {
                const value = index + 1;
                return (
                  <label
                    key={value}
                    className="flex flex-col items-center space-y-2 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name={`question-${questionNumber}`}
                      value={value}
                      checked={selectedAnswer === value}
                      onChange={() => handleOptionSelect(value)}
                      className="w-5 h-5 text-primary border-border focus:ring-primary focus:ring-2"
                    />
                    <span className={`
                      text-xs font-medium transition-colors
                      ${selectedAnswer === value ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}
                    `}>
                      {value}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );

      case 'scenario-based':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-foreground leading-relaxed">
                {question?.scenario}
              </p>
            </div>
            <div className="space-y-3">
              {question?.options?.map((option) => (
                <label
                  key={option?.id}
                  className={`
                    flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-200
                    ${selectedAnswer === option?.id 
                      ? 'border-primary bg-primary/5 shadow-soft' 
                      : 'border-border hover:border-border/80 hover:bg-muted/50'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name={`question-${questionNumber}`}
                    value={option?.id}
                    checked={selectedAnswer === option?.id}
                    onChange={() => handleOptionSelect(option?.id)}
                    className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {option?.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      {/* Question Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
            {questionNumber}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Question {questionNumber} of {totalQuestions}
            </h2>
            <span className="text-sm text-muted-foreground capitalize">
              {question?.category} • {question?.type?.replace('-', ' ')}
            </span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
          onClick={() => onBookmarkToggle && onBookmarkToggle(questionNumber)}
          className={isBookmarked ? "text-accent" : "text-muted-foreground"}
        >
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
      </div>
      {/* Question Content */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-medium text-foreground mb-2 leading-relaxed">
            {question?.text}
          </h3>
          {question?.description && (
            <p className="text-sm text-muted-foreground">
              {question?.description}
            </p>
          )}
        </div>

        {renderQuestionContent()}

        {/* Question Footer */}
        {question?.hint && (
          <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
              <div>
                <span className="text-sm font-medium text-accent">Hint:</span>
                <p className="text-sm text-foreground mt-1">{question?.hint}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;