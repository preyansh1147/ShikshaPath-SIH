import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import React from 'react';

const ComparisonSummary = ({ colleges, userPreferences }) => {
  // Mock user preferences from assessment
  const defaultPreferences = {
    priorities: ['fees', 'placement', 'location'],
    budget: 50000,
    preferredLocation: 'Delhi',
    courseInterest: 'B.Tech',
    careerGoals: ['Software Engineer', 'Data Scientist']
  };

  const preferences = userPreferences || defaultPreferences;

  const calculateRecommendationScore = (college) => {
    let score = 0;
    let maxScore = 0;

    // Fees preference (30% weight)
    maxScore += 30;
    if (college?.fees?.tuition <= preferences?.budget) {
      score += 30;
    } else if (college?.fees?.tuition <= preferences?.budget * 1.2) {
      score += 20;
    } else if (college?.fees?.tuition <= preferences?.budget * 1.5) {
      score += 10;
    }

    // Placement preference (25% weight)
    maxScore += 25;
    if (college?.placement?.percentage >= 90) {
      score += 25;
    } else if (college?.placement?.percentage >= 80) {
      score += 20;
    } else if (college?.placement?.percentage >= 70) {
      score += 15;
    } else if (college?.placement?.percentage >= 60) {
      score += 10;
    }

    // Location preference (20% weight)
    maxScore += 20;
    if (college?.location?.includes(preferences?.preferredLocation)) {
      score += 20;
    } else if (college?.state === preferences?.preferredLocation) {
      score += 15;
    } else {
      score += 5;
    }

    // Rating preference (15% weight)
    maxScore += 15;
    if (college?.rating >= 4.5) {
      score += 15;
    } else if (college?.rating >= 4.0) {
      score += 12;
    } else if (college?.rating >= 3.5) {
      score += 8;
    } else {
      score += 5;
    }

    // Course availability (10% weight)
    maxScore += 10;
    const hasPreferredCourse = college?.courses?.undergraduate?.includes(preferences?.courseInterest) ||
                              college?.courses?.postgraduate?.includes(preferences?.courseInterest);
    if (hasPreferredCourse) {
      score += 10;
    } else {
      score += 5;
    }

    return Math.round((score / maxScore) * 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return 'CheckCircle';
    if (score >= 60) return 'AlertCircle';
    return 'XCircle';
  };

  const getBestCollege = () => {
    if (colleges?.length === 0) return null;
    return colleges?.reduce((best, current) => {
      const bestScore = calculateRecommendationScore(best);
      const currentScore = calculateRecommendationScore(current);
      return currentScore > bestScore ? current : best;
    });
  };

  const getKeyDifferences = () => {
    if (colleges?.length < 2) return [];
    
    const differences = [];
    
    // Fee differences
    const fees = colleges?.map(c => c?.fees?.tuition || 0);
    const minFee = Math.min(...fees);
    const maxFee = Math.max(...fees);
    if (maxFee - minFee > 10000) {
      differences?.push({
        category: 'Fees',
        description: `Fee difference of ₹${(maxFee - minFee)?.toLocaleString('en-IN')} between colleges`,
        icon: 'DollarSign',
        type: 'warning'
      });
    }

    // Placement differences
    const placements = colleges?.map(c => c?.placement?.percentage || 0);
    const minPlacement = Math.min(...placements);
    const maxPlacement = Math.max(...placements);
    if (maxPlacement - minPlacement > 20) {
      differences?.push({
        category: 'Placement',
        description: `${maxPlacement - minPlacement}% difference in placement rates`,
        icon: 'TrendingUp',
        type: 'info'
      });
    }

    // Rating differences
    const ratings = colleges?.map(c => c?.rating || 0);
    const minRating = Math.min(...ratings);
    const maxRating = Math.max(...ratings);
    if (maxRating - minRating > 0.5) {
      differences?.push({
        category: 'Rating',
        description: `${(maxRating - minRating)?.toFixed(1)} star difference in ratings`,
        icon: 'Star',
        type: 'info'
      });
    }

    return differences;
  };

  const bestCollege = getBestCollege();
  const keyDifferences = getKeyDifferences();

  if (colleges?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Analysis Available</h3>
          <p className="text-muted-foreground">
            Add colleges to see personalized recommendations and analysis
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Recommendation Scores */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recommendation Scores</h3>
          <Icon name="Target" size={20} className="text-primary" />
        </div>
        
        <div className="space-y-4">
          {colleges?.map((college) => {
            let score = calculateRecommendationScore(college);
            return (
              <div key={college?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getScoreIcon(score)} 
                    size={16} 
                    className={getScoreColor(score)} 
                  />
                  <span className="font-medium text-foreground">{college?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        score >= 80 ? 'bg-success' : score >= 60 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className={`font-semibold ${getScoreColor(score)}`}>
                    {score}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Best Match */}
      {bestCollege && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Icon name="Award" size={24} className="text-success flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-success mb-2">Best Match for You</h3>
              <p className="text-foreground font-medium mb-2">{bestCollege?.name}</p>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your preferences for {preferences?.priorities?.join(', ')}, this college offers the best overall match with a {calculateRecommendationScore(bestCollege)}% compatibility score.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-success/20 text-success text-sm rounded-full">
                  ₹{bestCollege?.fees?.tuition?.toLocaleString('en-IN')} fees
                </span>
                <span className="px-3 py-1 bg-success/20 text-success text-sm rounded-full">
                  {bestCollege?.placement?.percentage}% placement
                </span>
                <span className="px-3 py-1 bg-success/20 text-success text-sm rounded-full">
                  {bestCollege?.rating}★ rating
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Key Differences */}
      {keyDifferences?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Key Differences</h3>
            <Icon name="GitCompare" size={20} className="text-primary" />
          </div>
          
          <div className="space-y-3">
            {keyDifferences?.map((diff, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <Icon 
                  name={diff?.icon} 
                  size={16} 
                  className={`flex-shrink-0 mt-0.5 ${
                    diff?.type === 'warning' ? 'text-warning' : 'text-primary'
                  }`} 
                />
                <div>
                  <span className="font-medium text-foreground">{diff?.category}: </span>
                  <span className="text-muted-foreground">{diff?.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Button
            variant="default"
            iconName="FileText"
            iconPosition="left"
            fullWidth
          >
            Download Comparison Report
          </Button>
          <Button
            variant="outline"
            iconName="BookOpen"
            iconPosition="left"
            fullWidth
          >
            View Application Process
          </Button>
          <Button
            variant="outline"
            iconName="Calendar"
            iconPosition="left"
            fullWidth
          >
            Check Important Dates
          </Button>
          <Button
            variant="outline"
            iconName="Users"
            iconPosition="left"
            fullWidth
          >
            Connect with Alumni
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSummary;