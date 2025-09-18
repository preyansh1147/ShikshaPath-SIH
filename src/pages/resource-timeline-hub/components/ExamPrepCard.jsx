import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExamPrepCard = ({ exam, onStartPrep, onViewAnalytics, onTakePractice }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-primary';
    if (progress >= 40) return 'bg-warning';
    return 'bg-error';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary text-sm mb-1">{exam?.name}</h3>
          <p className="text-xs text-text-secondary">{exam?.fullName}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exam?.difficulty)}`}>
          {exam?.difficulty}
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Overall Progress</span>
          <span className="font-medium text-text-primary">{exam?.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(exam?.progress)}`}
            style={{ width: `${exam?.progress}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="text-center">
            <div className="font-medium text-text-primary">{exam?.totalQuestions}</div>
            <div className="text-text-secondary">Questions</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-text-primary">{exam?.practiceTests}</div>
            <div className="text-text-secondary">Practice Tests</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-text-primary">{exam?.accuracy}%</div>
            <div className="text-text-secondary">Accuracy</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-text-secondary font-medium">Subject Breakdown:</div>
          <div className="space-y-1">
            {exam?.subjects?.map((subject, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">{subject?.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-muted rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full ${getProgressColor(subject?.progress)}`}
                      style={{ width: `${subject?.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-text-primary w-8">
                    {subject?.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>Exam: {new Date(exam.examDate)?.toLocaleDateString('en-IN')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{exam?.timeSpent}h studied</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="default"
          size="xs"
          iconName="Play"
          iconPosition="left"
          onClick={() => onStartPrep(exam)}
          className="flex-1"
        >
          Continue Prep
        </Button>
        <Button
          variant="outline"
          size="xs"
          iconName="Target"
          onClick={() => onTakePractice(exam)}
        >
          Practice
        </Button>
        <Button
          variant="ghost"
          size="xs"
          iconName="BarChart3"
          onClick={() => onViewAnalytics(exam)}
        >
          Analytics
        </Button>
      </div>
      {exam?.weakAreas && exam?.weakAreas?.length > 0 && (
        <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={14} className="text-warning mt-0.5" />
            <div>
              <div className="text-xs font-medium text-warning mb-1">Focus Areas:</div>
              <div className="text-xs text-text-secondary">
                {exam?.weakAreas?.join(', ')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPrepCard;