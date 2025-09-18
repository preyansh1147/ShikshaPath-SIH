import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracker = ({ userProgress, onContinue, onViewResults }) => {
  const progressData = {
    totalAssessments: 5,
    completedAssessments: userProgress?.completed || 2,
    currentStreak: userProgress?.streak || 7,
    totalPoints: userProgress?.points || 1250,
    level: userProgress?.level || 'Explorer',
    nextLevel: 'Navigator',
    pointsToNext: 750,
    achievements: userProgress?.achievements || [
      { id: 1, name: 'First Assessment', icon: 'Award', earned: true, date: '2025-01-10' },
      { id: 2, name: 'Stream Explorer', icon: 'Compass', earned: true, date: '2025-01-12' },
      { id: 3, name: 'Career Curious', icon: 'Search', earned: false, date: null },
      { id: 4, name: 'Skills Analyst', icon: 'TrendingUp', earned: false, date: null },
      { id: 5, name: 'Future Ready', icon: 'Target', earned: false, date: null }
    ],
    recentActivity: [
      { action: 'Completed Personality Assessment', date: '2025-01-12', points: 200 },
      { action: 'Explored Science Stream', date: '2025-01-11', points: 50 },
      { action: 'Bookmarked 5 Careers', date: '2025-01-10', points: 100 },
      { action: 'Started Interest Assessment', date: '2025-01-10', points: 150 }
    ]
  };

  const getProgressPercentage = () => {
    return (progressData?.completedAssessments / progressData?.totalAssessments) * 100;
  };

  const getLevelProgress = () => {
    return (progressData?.totalPoints % 1000) / 10; // Assuming 1000 points per level
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Your Progress</h2>
        <p className="text-text-secondary">
          Track your career discovery journey and achievements
        </p>
      </div>
      {/* Overall Progress Card */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">Level: {progressData?.level}</h3>
            <p className="text-white/80">Next: {progressData?.nextLevel}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{progressData?.totalPoints}</p>
            <p className="text-white/80 text-sm">Total Points</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to {progressData?.nextLevel}</span>
            <span>{progressData?.pointsToNext} points to go</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="h-2 bg-white rounded-full transition-all duration-500"
              style={{ width: `${getLevelProgress()}%` }}
            />
          </div>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="CheckCircle" size={24} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{progressData?.completedAssessments}</p>
          <p className="text-sm text-text-secondary">Assessments Done</p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Flame" size={24} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{progressData?.currentStreak}</p>
          <p className="text-sm text-text-secondary">Day Streak</p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Trophy" size={24} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-text-primary">
            {progressData?.achievements?.filter(a => a?.earned)?.length}
          </p>
          <p className="text-sm text-text-secondary">Achievements</p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Target" size={24} className="text-secondary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{Math.round(getProgressPercentage())}%</p>
          <p className="text-sm text-text-secondary">Complete</p>
        </div>
      </div>
      {/* Assessment Progress */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Assessment Progress</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary">Overall Completion</span>
            <span className="text-text-primary font-medium">
              {progressData?.completedAssessments}/{progressData?.totalAssessments}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="h-3 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Button
              variant="default"
              fullWidth
              iconName="Play"
              iconPosition="left"
              onClick={onContinue}
              className="bg-primary hover:bg-primary/90"
            >
              Continue Assessment
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="BarChart3"
              iconPosition="left"
              onClick={onViewResults}
            >
              View Results
            </Button>
          </div>
        </div>
      </div>
      {/* Achievements */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progressData?.achievements?.map((achievement) => (
            <div 
              key={achievement?.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                achievement?.earned 
                  ? 'bg-success/10 border-success/20' :'bg-muted/50 border-border opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  achievement?.earned ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={achievement?.icon} size={20} />
                </div>
                <div>
                  <h4 className={`font-medium ${
                    achievement?.earned ? 'text-text-primary' : 'text-muted-foreground'
                  }`}>
                    {achievement?.name}
                  </h4>
                  {achievement?.earned && achievement?.date && (
                    <p className="text-xs text-text-secondary">
                      Earned on {new Date(achievement.date)?.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {progressData?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div>
                  <p className="text-sm font-medium text-text-primary">{activity?.action}</p>
                  <p className="text-xs text-text-secondary">{activity?.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Plus" size={12} className="text-success" />
                <span className="text-sm font-medium text-success">{activity?.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;