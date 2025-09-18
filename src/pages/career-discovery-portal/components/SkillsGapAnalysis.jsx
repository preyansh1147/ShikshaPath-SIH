import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsGapAnalysis = ({ userSkills = [], targetCareer = null }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillsData = {
    'software-engineer': {
      title: 'Software Engineer',
      required: [
        { name: 'Programming Languages', level: 'Expert', current: 60, required: 90, resources: 5 },
        { name: 'Data Structures & Algorithms', level: 'Advanced', current: 40, required: 85, resources: 8 },
        { name: 'System Design', level: 'Intermediate', current: 20, required: 70, resources: 6 },
        { name: 'Database Management', level: 'Intermediate', current: 50, required: 75, resources: 4 },
        { name: 'Version Control (Git)', level: 'Intermediate', current: 70, required: 80, resources: 3 },
        { name: 'Problem Solving', level: 'Expert', current: 65, required: 95, resources: 7 }
      ]
    },
    'data-scientist': {
      title: 'Data Scientist',
      required: [
        { name: 'Statistics & Mathematics', level: 'Expert', current: 45, required: 90, resources: 6 },
        { name: 'Python/R Programming', level: 'Advanced', current: 55, required: 85, resources: 5 },
        { name: 'Machine Learning', level: 'Advanced', current: 30, required: 80, resources: 9 },
        { name: 'Data Visualization', level: 'Intermediate', current: 60, required: 75, resources: 4 },
        { name: 'SQL & Databases', level: 'Intermediate', current: 50, required: 70, resources: 3 },
        { name: 'Business Acumen', level: 'Intermediate', current: 40, required: 65, resources: 5 }
      ]
    },
    'digital-marketer': {
      title: 'Digital Marketer',
      required: [
        { name: 'Content Creation', level: 'Advanced', current: 70, required: 85, resources: 4 },
        { name: 'SEO/SEM', level: 'Advanced', current: 45, required: 80, resources: 6 },
        { name: 'Social Media Marketing', level: 'Intermediate', current: 75, required: 75, resources: 3 },
        { name: 'Analytics & Reporting', level: 'Intermediate', current: 35, required: 70, resources: 5 },
        { name: 'Email Marketing', level: 'Intermediate', current: 50, required: 65, resources: 3 },
        { name: 'Graphic Design', level: 'Basic', current: 40, required: 60, resources: 4 }
      ]
    }
  };

  const currentCareer = targetCareer || 'software-engineer';
  const careerData = skillsData?.[currentCareer];

  const getSkillStatus = (current, required) => {
    const percentage = (current / required) * 100;
    if (percentage >= 90) return { status: 'excellent', color: 'text-success', bg: 'bg-success' };
    if (percentage >= 70) return { status: 'good', color: 'text-warning', bg: 'bg-warning' };
    if (percentage >= 50) return { status: 'average', color: 'text-orange-500', bg: 'bg-orange-500' };
    return { status: 'needs-improvement', color: 'text-destructive', bg: 'bg-destructive' };
  };

  const getOverallProgress = () => {
    const totalCurrent = careerData?.required?.reduce((sum, skill) => sum + skill?.current, 0);
    const totalRequired = careerData?.required?.reduce((sum, skill) => sum + skill?.required, 0);
    return Math.round((totalCurrent / totalRequired) * 100);
  };

  const getPrioritySkills = () => {
    return careerData?.required?.map(skill => ({
        ...skill,
        gap: skill?.required - skill?.current,
        gapPercentage: ((skill?.required - skill?.current) / skill?.required) * 100
      }))?.sort((a, b) => b?.gap - a?.gap)?.slice(0, 3);
  };

  const overallProgress = getOverallProgress();
  const prioritySkills = getPrioritySkills();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Skills Gap Analysis</h2>
        <p className="text-text-secondary">
          Analyze your current skills against requirements for {careerData?.title}
        </p>
      </div>
      {/* Overall Progress */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Overall Readiness</h3>
          <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 mb-4">
          <div 
            className="h-3 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-success">{careerData?.required?.filter(s => getSkillStatus(s?.current, s?.required)?.status === 'excellent')?.length}</p>
            <p className="text-xs text-text-secondary">Excellent</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-warning">{careerData?.required?.filter(s => getSkillStatus(s?.current, s?.required)?.status === 'good')?.length}</p>
            <p className="text-xs text-text-secondary">Good</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-500">{careerData?.required?.filter(s => getSkillStatus(s?.current, s?.required)?.status === 'average')?.length}</p>
            <p className="text-xs text-text-secondary">Average</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-destructive">{careerData?.required?.filter(s => getSkillStatus(s?.current, s?.required)?.status === 'needs-improvement')?.length}</p>
            <p className="text-xs text-text-secondary">Needs Work</p>
          </div>
        </div>
      </div>
      {/* Priority Skills */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Priority Skills to Develop</h3>
        <div className="space-y-4">
          {prioritySkills?.map((skill, index) => {
            const status = getSkillStatus(skill?.current, skill?.required);
            return (
              <div key={skill?.name} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary">{skill?.name}</h4>
                    <span className="text-sm text-text-secondary">{skill?.current}/{skill?.required}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${status?.bg}`}
                      style={{ width: `${(skill?.current / skill?.required) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={status?.color}>Gap: {skill?.gap} points</span>
                    <span className="text-text-secondary">{skill?.resources} resources available</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="BookOpen"
                  iconPosition="left"
                  onClick={() => setSelectedSkill(skill)}
                >
                  Learn
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      {/* Detailed Skills Breakdown */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Complete Skills Assessment</h3>
        <div className="space-y-4">
          {careerData?.required?.map((skill) => {
            const status = getSkillStatus(skill?.current, skill?.required);
            const progressPercentage = (skill?.current / skill?.required) * 100;
            
            return (
              <div key={skill?.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-text-primary">{skill?.name}</h4>
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-text-secondary">
                      {skill?.level}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">{skill?.current}/{skill?.required}</span>
                    <Icon 
                      name={progressPercentage >= 90 ? "CheckCircle" : progressPercentage >= 70 ? "Clock" : "AlertCircle"} 
                      size={16} 
                      className={status?.color}
                    />
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${status?.bg}`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={status?.color}>
                    {progressPercentage >= 90 ? 'Excellent' : 
                     progressPercentage >= 70 ? 'Good' : 
                     progressPercentage >= 50 ? 'Average' : 'Needs Improvement'}
                  </span>
                  <button 
                    className="text-primary hover:text-primary/80 font-medium"
                    onClick={() => setSelectedSkill(skill)}
                  >
                    View Resources ({skill?.resources})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="default"
          fullWidth
          iconName="Target"
          iconPosition="left"
          className="bg-primary hover:bg-primary/90"
        >
          Create Learning Plan
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="Share"
          iconPosition="left"
        >
          Share Analysis
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

export default SkillsGapAnalysis;