import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StreamComparison = ({ 
  streams = [], 
  onRemoveStream,
  onAddStream,
  className = "" 
}) => {
  const [selectedCriteria, setSelectedCriteria] = useState('overview');

  const comparisonCriteria = [
    { id: 'overview', name: 'Overview', icon: 'Eye' },
    { id: 'subjects', name: 'Subjects', icon: 'BookOpen' },
    { id: 'careers', name: 'Career Paths', icon: 'Target' },
    { id: 'salary', name: 'Salary Potential', icon: 'DollarSign' },
    { id: 'demand', name: 'Job Market', icon: 'TrendingUp' },
    { id: 'skills', name: 'Skills Required', icon: 'Brain' }
  ];

  const getComparisonData = (stream, criteria) => {
    const data = {
      overview: {
        difficulty: stream?.difficulty,
        duration: '2 Years (11th-12th)',
        eligibility: 'Class 10 Pass',
        popularity: stream?.popularity || 'High'
      },
      subjects: {
        mandatory: stream?.coreSubjects?.slice(0, 3),
        optional: stream?.optionalSubjects || ['Mathematics', 'Computer Science', 'Physical Education'],
        total: stream?.coreSubjects?.length + 3
      },
      careers: {
        options: stream?.careerOptions,
        top: stream?.popularCareers?.slice(0, 4),
        growth: stream?.careerGrowth || 'Excellent'
      },
      salary: {
        starting: stream?.avgSalary,
        mid: stream?.midCareerSalary || '₹8-15 LPA',
        senior: stream?.seniorSalary || '₹15-30 LPA'
      },
      demand: {
        current: stream?.jobDemand + '%',
        trend: stream?.demandTrend || 'Growing',
        competition: stream?.competition || 'Moderate'
      },
      skills: {
        technical: stream?.technicalSkills || ['Problem Solving', 'Analytical Thinking'],
        soft: stream?.softSkills || ['Communication', 'Leadership'],
        learning: stream?.learningCurve || 'Moderate'
      }
    };
    return data?.[criteria] || {};
  };

  const renderComparisonRow = (label, streams, getValue) => (
    <tr className="border-b border-border">
      <td className="py-3 px-4 font-medium text-foreground bg-muted/30">{label}</td>
      {streams?.map((stream, index) => (
        <td key={index} className="py-3 px-4 text-sm text-foreground">
          {getValue(stream)}
        </td>
      ))}
    </tr>
  );

  const renderOverviewComparison = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 px-4 text-left font-medium text-foreground">Criteria</th>
            {streams?.map((stream, index) => (
              <th key={index} className="py-3 px-4 text-left font-medium text-foreground">
                {stream?.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderComparisonRow('Difficulty Level', streams, (stream) => (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              stream?.difficulty === 'Easy' ? 'bg-success/10 text-success' :
              stream?.difficulty === 'Medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
            }`}>
              {stream?.difficulty}
            </span>
          ))}
          {renderComparisonRow('Career Options', streams, (stream) => stream?.careerOptions)}
          {renderComparisonRow('Job Market Demand', streams, (stream) => stream?.jobDemand + '%')}
          {renderComparisonRow('Starting Salary', streams, (stream) => stream?.avgSalary)}
        </tbody>
      </table>
    </div>
  );

  const renderSubjectsComparison = () => (
    <div className="space-y-6">
      {streams?.map((stream, index) => (
        <div key={index} className="border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">{stream?.name} Subjects</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium text-muted-foreground mb-2">Core Subjects</h5>
              <div className="space-y-1">
                {stream?.coreSubjects?.map((subject, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-sm text-foreground">{subject}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-sm font-medium text-muted-foreground mb-2">Optional Subjects</h5>
              <div className="space-y-1">
                {(stream?.optionalSubjects || ['Mathematics', 'Computer Science', 'Physical Education'])?.map((subject, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Icon name="Plus" size={14} className="text-primary" />
                    <span className="text-sm text-foreground">{subject}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCareersComparison = () => (
    <div className="grid gap-6">
      {streams?.map((stream, index) => (
        <div key={index} className="border border-border rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">{stream?.name} Career Paths</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stream?.popularCareers?.map((career, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-2 bg-muted/30 rounded-md">
                <Icon name="Target" size={14} className="text-primary" />
                <span className="text-sm text-foreground">{career}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (streams?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 text-center ${className}`}>
        <Icon name="GitCompare" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Streams to Compare</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select streams from the cards above to start comparing
        </p>
        <Button
          variant="outline"
          onClick={onAddStream}
          iconName="Plus"
          iconPosition="left"
        >
          Add Streams to Compare
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-bold text-foreground">Stream Comparison</h3>
            <p className="text-sm text-muted-foreground">
              Compare {streams?.length} streams side by side
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => streams?.forEach(stream => onRemoveStream(stream?.id))}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        </div>

        {/* Stream Pills */}
        <div className="flex flex-wrap gap-2">
          {streams?.map((stream, index) => (
            <div key={index} className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
              <span className="text-sm font-medium">{stream?.name}</span>
              <button
                onClick={() => onRemoveStream(stream?.id)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-smooth"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Criteria Tabs */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {comparisonCriteria?.map((criteria) => (
            <button
              key={criteria?.id}
              onClick={() => setSelectedCriteria(criteria?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                selectedCriteria === criteria?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={criteria?.icon} size={16} />
              <span>{criteria?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Comparison Content */}
      <div className="p-6">
        {selectedCriteria === 'overview' && renderOverviewComparison()}
        {selectedCriteria === 'subjects' && renderSubjectsComparison()}
        {selectedCriteria === 'careers' && renderCareersComparison()}
        {selectedCriteria === 'salary' && (
          <div className="text-center py-8">
            <Icon name="DollarSign" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Salary comparison coming soon...</p>
          </div>
        )}
        {selectedCriteria === 'demand' && (
          <div className="text-center py-8">
            <Icon name="TrendingUp" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Job market analysis coming soon...</p>
          </div>
        )}
        {selectedCriteria === 'skills' && (
          <div className="text-center py-8">
            <Icon name="Brain" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Skills analysis coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamComparison;