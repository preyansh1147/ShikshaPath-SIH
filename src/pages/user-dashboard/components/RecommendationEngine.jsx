import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationEngine = ({ userProfile }) => {
  const [refreshing, setRefreshing] = useState(false);

  const recommendations = [
    {
      id: 1,
      type: 'college',
      title: 'Indian Institute of Science',
      subtitle: 'Bangalore, Karnataka',
      description: 'Based on your science aptitude and research interests',
      matchScore: 95,
      reasons: ['High science scores', 'Research orientation', 'Location preference'],
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=200&fit=crop',
      action: 'View Details'
    },
    {
      id: 2,
      type: 'stream',
      title: 'Computer Science Engineering',
      subtitle: 'B.Tech Program',
      description: 'Perfect match for your logical reasoning and math skills',
      matchScore: 92,
      reasons: ['Strong analytical skills', 'Technology interest', 'Problem-solving ability'],
      image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?w=300&h=200&fit=crop',
      action: 'Explore Stream'
    },
    {
      id: 3,
      type: 'scholarship',
      title: 'Merit-Based Scholarship',
      subtitle: 'Up to ₹2,00,000',
      description: 'You qualify for this engineering scholarship program',
      matchScore: 88,
      reasons: ['Academic performance', 'Family income criteria', 'State eligibility'],
      image: 'https://images.pixabay.com/photos/2016/03/02/20/13/graduation-1232910_1280.jpg?w=300&h=200&fit=crop',
      action: 'Apply Now'
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'college': return 'School';
      case 'stream': return 'BookOpen';
      case 'scholarship': return 'Award';
      default: return 'Lightbulb';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'college': return 'text-primary';
      case 'stream': return 'text-secondary';
      case 'scholarship': return 'text-accent';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Personalized Recommendations</h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            Updated: {new Date()?.toLocaleDateString()}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            iconName="RefreshCw" 
            loading={refreshing}
            onClick={handleRefresh}
          />
        </div>
      </div>
      <div className="space-y-4">
        {recommendations?.map((rec) => (
          <div key={rec?.id} className="group border border-border rounded-lg p-4 hover:border-primary/50 hover:shadow-soft transition-all duration-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg overflow-hidden">
                <img 
                  src={rec?.image} 
                  alt={rec?.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name={getTypeIcon(rec?.type)} size={14} className={getTypeColor(rec?.type)} />
                      <span className={`text-xs font-medium uppercase tracking-wide ${getTypeColor(rec?.type)}`}>
                        {rec?.type}
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {rec?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{rec?.subtitle}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="text-right">
                      <div className="text-sm font-medium text-success">{rec?.matchScore}% match</div>
                      <div className="w-16 bg-muted rounded-full h-1 mt-1">
                        <div 
                          className="bg-success h-1 rounded-full transition-all duration-300"
                          style={{ width: `${rec?.matchScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{rec?.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {rec?.reasons?.slice(0, 2)?.map((reason, index) => (
                      <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        {reason}
                      </span>
                    ))}
                    {rec?.reasons?.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{rec?.reasons?.length - 2} more
                      </span>
                    )}
                  </div>
                  <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
                    {rec?.action}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Want more personalized recommendations?
        </p>
        <Link to="/aptitude-assessment-quiz">
          <Button variant="outline" iconName="Brain" iconPosition="left">
            Retake Assessment
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecommendationEngine;