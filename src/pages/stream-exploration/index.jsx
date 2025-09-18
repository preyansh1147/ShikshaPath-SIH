import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import components
import StreamCard from './components/StreamCard';
import SubjectCombinationBuilder from './components/SubjectCombinationBuilder';
import StreamComparison from './components/StreamComparison';
import SuccessStories from './components/SuccessStories';
import StreamFilters from './components/StreamFilters';

const StreamExploration = () => {
  const [selectedStream, setSelectedStream] = useState(null);
  const [comparisonStreams, setComparisonStreams] = useState([]);
  const [filteredStreams, setFilteredStreams] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({});

  // Mock data for streams
  const streamsData = [
    {
      id: 1,
      name: 'Science',
      subtitle: 'Physics, Chemistry, Mathematics/Biology',
      description: 'Explore the natural world through systematic study of physics, chemistry, and mathematics or biology. Perfect for students interested in research, technology, and healthcare.',
      color: 'bg-blue-600',
      difficulty: 'Hard',
      careerOptions: '50+',
      avgSalary: '₹4-8 LPA',
      jobDemand: 85,
      coreSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'],
      optionalSubjects: ['Computer Science', 'Physical Education', 'Psychology'],
      popularCareers: [
        'Engineering (B.Tech/B.E.)',
        'Medical (MBBS/BDS)',
        'Research Scientist',
        'Data Scientist',
        'Software Developer',
        'Biotechnology',
        'Pharmacy',
        'Architecture'
      ],
      midCareerSalary: '₹8-15 LPA',
      seniorSalary: '₹15-30 LPA',
      careerGrowth: 'Excellent',
      demandTrend: 'Growing',
      competition: 'High',
      technicalSkills: ['Problem Solving', 'Analytical Thinking', 'Research Methods'],
      softSkills: ['Critical Thinking', 'Attention to Detail', 'Perseverance'],
      learningCurve: 'Steep',
      popularity: 'Very High'
    },
    {
      id: 2,
      name: 'Commerce',
      subtitle: 'Business, Economics, Accountancy',
      description: 'Understand business operations, financial management, and economic principles. Ideal for students interested in business, finance, and entrepreneurship.',
      color: 'bg-green-600',
      difficulty: 'Medium',
      careerOptions: '40+',
      avgSalary: '₹3-6 LPA',
      jobDemand: 75,
      coreSubjects: ['Accountancy', 'Business Studies', 'Economics', 'English'],
      optionalSubjects: ['Mathematics', 'Computer Science', 'Physical Education'],
      popularCareers: [
        'Chartered Accountancy (CA)',
        'Company Secretary (CS)',
        'Business Administration (BBA/MBA)',
        'Banking & Finance',
        'Investment Banking',
        'Digital Marketing',
        'Entrepreneurship',
        'Cost Accountancy'
      ],
      midCareerSalary: '₹6-12 LPA',
      seniorSalary: '₹12-25 LPA',
      careerGrowth: 'Very Good',
      demandTrend: 'Stable',
      competition: 'Moderate',
      technicalSkills: ['Financial Analysis', 'Business Strategy', 'Market Research'],
      softSkills: ['Communication', 'Leadership', 'Negotiation'],
      learningCurve: 'Moderate',
      popularity: 'High'
    },
    {
      id: 3,
      name: 'Arts',
      subtitle: 'Humanities & Social Sciences',
      description: 'Study human society, culture, history, and literature. Perfect for students interested in civil services, law, journalism, and social work.',
      color: 'bg-purple-600',
      difficulty: 'Easy',
      careerOptions: '35+',
      avgSalary: '₹2.5-5 LPA',
      jobDemand: 65,
      coreSubjects: ['History', 'Political Science', 'Geography', 'English', 'Economics'],
      optionalSubjects: ['Psychology', 'Sociology', 'Philosophy', 'Fine Arts'],
      popularCareers: [
        'Civil Services (IAS/IPS)',
        'Law (LLB)',
        'Journalism & Mass Communication',
        'Teaching & Education',
        'Social Work',
        'Psychology',
        'Public Administration',
        'Content Writing'
      ],
      midCareerSalary: '₹5-10 LPA',
      seniorSalary: '₹10-20 LPA',
      careerGrowth: 'Good',
      demandTrend: 'Stable',
      competition: 'Moderate',
      technicalSkills: ['Research & Analysis', 'Writing & Communication', 'Critical Thinking'],
      softSkills: ['Empathy', 'Cultural Awareness', 'Public Speaking'],
      learningCurve: 'Gentle',
      popularity: 'Moderate'
    },
    {
      id: 4,
      name: 'Vocational',
      subtitle: 'Skill-based Practical Training',
      description: 'Gain practical skills and hands-on experience in specific trades and industries. Excellent for immediate job readiness and entrepreneurship.',
      color: 'bg-orange-600',
      difficulty: 'Medium',
      careerOptions: '30+',
      avgSalary: '₹2-4 LPA',
      jobDemand: 70,
      coreSubjects: ['English', 'Vocational Subject', 'Mathematics'],
      optionalSubjects: ['Computer Applications', 'Business Studies', 'Physical Education'],
      popularCareers: [
        'Information Technology',
        'Hospitality & Tourism',
        'Fashion Design',
        'Automobile Technology',
        'Beauty & Wellness',
        'Agriculture',
        'Retail Management',
        'Food Processing'
      ],
      midCareerSalary: '₹4-8 LPA',
      seniorSalary: '₹8-15 LPA',
      careerGrowth: 'Good',
      demandTrend: 'Growing',
      competition: 'Low',
      technicalSkills: ['Practical Skills', 'Industry Knowledge', 'Technical Expertise'],
      softSkills: ['Adaptability', 'Teamwork', 'Customer Service'],
      learningCurve: 'Practical',
      popularity: 'Growing'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Stream Overview', icon: 'Eye' },
    { id: 'builder', name: 'Subject Builder', icon: 'Settings' },
    { id: 'comparison', name: 'Compare Streams', icon: 'GitCompare' },
    { id: 'stories', name: 'Success Stories', icon: 'Users' }
  ];

  useEffect(() => {
    setFilteredStreams(streamsData);
  }, []);

  const handleStreamExplore = (stream) => {
    setSelectedStream(stream);
    setActiveTab('builder');
  };

  const handleStreamCompare = (stream) => {
    if (!comparisonStreams?.find(s => s?.id === stream?.id)) {
      if (comparisonStreams?.length < 3) {
        setComparisonStreams([...comparisonStreams, stream]);
        setActiveTab('comparison');
      }
    }
  };

  const handleRemoveFromComparison = (streamId) => {
    setComparisonStreams(comparisonStreams?.filter(s => s?.id !== streamId));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    
    // Apply filters to streams
    let filtered = streamsData;
    
    if (newFilters?.difficulty && newFilters?.difficulty?.length > 0) {
      filtered = filtered?.filter(stream => newFilters?.difficulty?.includes(stream?.difficulty));
    }
    
    if (newFilters?.salaryRange) {
      // Filter by salary range logic here
      filtered = filtered?.filter(stream => {
        const avgSalary = parseInt(stream?.avgSalary?.match(/\d+/)?.[0]);
        switch (newFilters?.salaryRange) {
          case 'entry': return avgSalary <= 6;
          case 'mid': return avgSalary > 6 && avgSalary <= 12;
          case 'senior': return avgSalary > 12;
          default: return true;
        }
      });
    }
    
    if (newFilters?.jobDemand) {
      filtered = filtered?.filter(stream => {
        switch (newFilters?.jobDemand) {
          case 'high': return stream?.jobDemand >= 80;
          case 'medium': return stream?.jobDemand >= 60 && stream?.jobDemand < 80;
          case 'moderate': return stream?.jobDemand >= 40 && stream?.jobDemand < 60;
          default: return true;
        }
      });
    }
    
    setFilteredStreams(filtered);
  };

  const handleCombinationChange = (subjects, careers) => {
    console.log('Selected subjects:', subjects);
    console.log('Career paths:', careers);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Explore Academic Streams
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover different academic paths, compare subject combinations, and make informed decisions about your educational journey with detailed career outcome analysis.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">4</div>
                <div className="text-sm text-muted-foreground">Stream Options</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">150+</div>
                <div className="text-sm text-muted-foreground">Career Paths</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-warning mb-1">25+</div>
                <div className="text-sm text-muted-foreground">Subject Options</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-error mb-1">1000+</div>
                <div className="text-sm text-muted-foreground">Success Stories</div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Sidebar - Filters */}
              <div className="lg:col-span-1">
                <StreamFilters 
                  onFiltersChange={handleFiltersChange}
                  className="sticky top-24"
                />
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                {/* Stream Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-heading font-bold text-foreground">
                        Available Streams ({filteredStreams?.length})
                      </h2>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Sort by:</span>
                        <select className="text-sm border border-border rounded-md px-3 py-1 bg-card text-foreground">
                          <option>Popularity</option>
                          <option>Job Demand</option>
                          <option>Difficulty</option>
                          <option>Salary Potential</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {filteredStreams?.map((stream) => (
                        <StreamCard
                          key={stream?.id}
                          stream={stream}
                          onExplore={handleStreamExplore}
                          onCompare={handleStreamCompare}
                          isSelected={comparisonStreams?.some(s => s?.id === stream?.id)}
                        />
                      ))}
                    </div>

                    {filteredStreams?.length === 0 && (
                      <div className="text-center py-12">
                        <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No streams found</h3>
                        <p className="text-muted-foreground mb-4">
                          Try adjusting your filters to see more results
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => handleFiltersChange({})}
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Subject Builder Tab */}
                {activeTab === 'builder' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-heading font-bold text-foreground">
                        Subject Combination Builder
                      </h2>
                      {selectedStream && (
                        <Link to="/college-comparison">
                          <Button
                            variant="default"
                            iconName="ArrowRight"
                            iconPosition="right"
                          >
                            Find Colleges
                          </Button>
                        </Link>
                      )}
                    </div>

                    <SubjectCombinationBuilder
                      selectedStream={selectedStream}
                      onCombinationChange={handleCombinationChange}
                    />
                  </div>
                )}

                {/* Comparison Tab */}
                {activeTab === 'comparison' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-heading font-bold text-foreground">
                        Stream Comparison
                      </h2>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab('overview')}
                        iconName="Plus"
                        iconPosition="left"
                      >
                        Add More Streams
                      </Button>
                    </div>

                    <StreamComparison
                      streams={comparisonStreams}
                      onRemoveStream={handleRemoveFromComparison}
                      onAddStream={() => setActiveTab('overview')}
                    />
                  </div>
                )}

                {/* Success Stories Tab */}
                {activeTab === 'stories' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-heading font-bold text-foreground">
                        Success Stories
                      </h2>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Stream:</span>
                        <select 
                          className="text-sm border border-border rounded-md px-3 py-1 bg-card text-foreground"
                          onChange={(e) => {
                            const stream = streamsData?.find(s => s?.name === e?.target?.value);
                            setSelectedStream(stream || null);
                          }}
                          value={selectedStream?.name || ''}
                        >
                          <option value="">All Streams</option>
                          {streamsData?.map((stream) => (
                            <option key={stream?.id} value={stream?.name}>
                              {stream?.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <SuccessStories selectedStream={selectedStream} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Ready to Choose Your Stream?
            </h2>
            <p className="text-muted-foreground mb-6">
              Take our comprehensive aptitude assessment to get personalized stream recommendations based on your interests and abilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/aptitude-assessment-quiz">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Brain"
                  iconPosition="left"
                >
                  Take Aptitude Test
                </Button>
              </Link>
              <Link to="/college-comparison">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Building"
                  iconPosition="left"
                >
                  Explore Colleges
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StreamExploration;