import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PeerComparison = ({ userProfile, onViewDetails }) => {
  const [selectedMetric, setSelectedMetric] = useState('interests');

  const userStats = {
    interests: ['Technology', 'Problem Solving', 'Innovation'],
    skills: ['Programming', 'Mathematics', 'Communication'],
    preferredStreams: ['Science', 'Commerce'],
    careerGoals: ['Software Engineer', 'Data Scientist', 'Product Manager'],
    location: 'Mumbai, Maharashtra',
    grade: 'Class 12',
    assessmentScore: 85
  };

  const peerData = {
    totalPeers: 2847,
    similarProfiles: 156,
    averageScore: 78,
    topChoices: [
      { career: 'Software Engineer', percentage: 34, trend: 'up' },
      { career: 'Data Scientist', percentage: 28, trend: 'up' },
      { career: 'Product Manager', percentage: 18, trend: 'stable' },
      { career: 'Business Analyst', percentage: 12, trend: 'down' },
      { career: 'UX Designer', percentage: 8, trend: 'up' }
    ],
    streamDistribution: [
      { stream: 'Science (PCM)', percentage: 45, count: 70 },
      { stream: 'Science (PCB)', percentage: 25, count: 39 },
      { stream: 'Commerce', percentage: 20, count: 31 },
      { stream: 'Arts', percentage: 10, count: 16 }
    ],
    geographicData: [
      { city: 'Mumbai', count: 45, percentage: 29 },
      { city: 'Delhi', count: 38, percentage: 24 },
      { city: 'Bangalore', count: 32, percentage: 21 },
      { city: 'Pune', count: 25, percentage: 16 },
      { city: 'Others', count: 16, percentage: 10 }
    ],
    successStories: [
      {
        id: 1,
        name: 'Priya S.',
        career: 'Software Engineer',
        company: 'Tech Startup',
        similarity: 92,
        journey: `Started with similar interests in technology and problem-solving. Chose Science stream, focused on programming skills, and landed a job at a growing tech startup.`,
        tips: 'Focus on building projects and contributing to open source.'
      },
      {
        id: 2,
        name: 'Rahul K.',
        career: 'Data Scientist',
        company: 'E-commerce Giant',
        similarity: 88,
        journey: `Had strong mathematics background like you. Pursued Statistics, learned Python and ML, now working on recommendation systems.`,
        tips: 'Mathematics is your strength - leverage it for data science.'
      },
      {
        id: 3,
        name: 'Ananya M.',
        career: 'Product Manager',
        company: 'Fintech Company',
        similarity: 85,
        journey: `Combined technical knowledge with business acumen. Started in engineering, transitioned to product management through MBA.`,
        tips: 'Develop both technical and business communication skills.'
      }
    ]
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  const metrics = [
    { id: 'interests', name: 'Interests', icon: 'Heart' },
    { id: 'careers', name: 'Career Choices', icon: 'Briefcase' },
    { id: 'streams', name: 'Stream Selection', icon: 'BookOpen' },
    { id: 'geography', name: 'Location', icon: 'MapPin' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Peer Comparison</h2>
        <p className="text-text-secondary">
          See how your profile compares with {peerData?.similarProfiles} similar students
        </p>
      </div>
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Users" size={24} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{peerData?.totalPeers}</p>
          <p className="text-sm text-text-secondary">Total Peers</p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="UserCheck" size={24} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{peerData?.similarProfiles}</p>
          <p className="text-sm text-text-secondary">Similar Profiles</p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Target" size={24} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{userStats?.assessmentScore}</p>
          <p className="text-sm text-text-secondary">Your Score</p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="BarChart3" size={24} className="text-secondary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{peerData?.averageScore}</p>
          <p className="text-sm text-text-secondary">Peer Average</p>
        </div>
      </div>
      {/* Metric Selector */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Compare By</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics?.map((metric) => (
            <button
              key={metric?.id}
              onClick={() => setSelectedMetric(metric?.id)}
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                selectedMetric === metric?.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background hover:bg-muted border-border'
              }`}
            >
              <Icon name={metric?.icon} size={18} />
              <span className="text-sm font-medium">{metric?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Career Choices Comparison */}
      {selectedMetric === 'careers' && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Popular Career Choices</h3>
          <div className="space-y-4">
            {peerData?.topChoices?.map((choice, index) => (
              <div key={choice?.career} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{choice?.career}</h4>
                    <p className="text-sm text-text-secondary">{choice?.percentage}% of similar peers</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getTrendIcon(choice?.trend)} 
                    size={16} 
                    className={getTrendColor(choice?.trend)}
                  />
                  <div className="w-24 bg-background rounded-full h-2">
                    <div 
                      className="h-2 bg-primary rounded-full"
                      style={{ width: `${choice?.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Stream Distribution */}
      {selectedMetric === 'streams' && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Stream Selection Distribution</h3>
          <div className="space-y-4">
            {peerData?.streamDistribution?.map((stream) => (
              <div key={stream?.stream} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-text-primary">{stream?.stream}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">{stream?.count} students</span>
                    <span className="text-sm font-medium text-text-primary">{stream?.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${stream?.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Geographic Distribution */}
      {selectedMetric === 'geography' && (
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Geographic Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {peerData?.geographicData?.map((location) => (
              <div key={location?.city} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-text-secondary" />
                  <span className="font-medium text-text-primary">{location?.city}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{location?.count}</p>
                  <p className="text-xs text-text-secondary">{location?.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Success Stories */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Success Stories from Similar Profiles</h3>
        <div className="space-y-6">
          {peerData?.successStories?.map((story) => (
            <div key={story?.id} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-text-primary">{story?.name}</h4>
                  <p className="text-sm text-text-secondary">{story?.career} at {story?.company}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} className="text-success" />
                  <span className="text-sm font-medium text-success">{story?.similarity}% similar</span>
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-3">{story?.journey}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Lightbulb" size={14} className="text-warning" />
                  <span className="text-sm font-medium text-warning">Tip:</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => onViewDetails(story?.id)}
                >
                  Connect
                </Button>
              </div>
              <p className="text-sm text-text-primary mt-2 italic">"{story?.tips}"</p>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="default"
          fullWidth
          iconName="Users"
          iconPosition="left"
          className="bg-primary hover:bg-primary/90"
        >
          Join Peer Community
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="Share"
          iconPosition="left"
        >
          Share Your Profile
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="Download"
          iconPosition="left"
        >
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default PeerComparison;