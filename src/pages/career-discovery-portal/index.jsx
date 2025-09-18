import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import AssessmentCard from './components/AssessmentCard';
import CareerCard from './components/CareerCard';
import StreamWizard from './components/StreamWizard';
import SkillsGapAnalysis from './components/SkillsGapAnalysis';
import ProgressTracker from './components/ProgressTracker';
import PeerComparison from './components/PeerComparison';
import Quiz from './components/Quiz';

const CareerDiscoveryPortal = () => {
  const [activeTab, setActiveTab] = useState('assessments');
  const [selectedStream, setSelectedStream] = useState(null);
  const [bookmarkedCareers, setBookmarkedCareers] = useState([]);
  const [userProgress, setUserProgress] = useState({
    completed: 2,
    streak: 7,
    points: 1250,
    level: 'Explorer',
    achievements: []
  });
  const [currentquiz, setcurrentquiz] = useState(null);

  const assessments = [
    {
      id: 'personality',
      title: 'Personality Assessment',
      description: 'Discover your personality type and how it aligns with different career paths. Based on scientifically proven models.',
      duration: '15-20 minutes',
      icon: 'User',
      bgColor: 'bg-blue-500',
      features: ['16 Personality Types', 'Career Matching', 'Strength Analysis']
    },
    {
      id: 'interests',
      title: 'Interest Profiler',
      description: 'Explore your interests and passions to find careers that truly excite and motivate you.',
      duration: '10-15 minutes',
      icon: 'Heart',
      bgColor: 'bg-red-500',
      features: ['Holland Code', 'Interest Areas', 'Activity Preferences']
    },
    {
      id: 'aptitude',
      title: 'Aptitude Test',
      description: 'Measure your natural abilities and cognitive strengths across different skill areas.',
      duration: '25-30 minutes',
      icon: 'Brain',
      bgColor: 'bg-purple-500',
      features: ['Logical Reasoning', 'Numerical Ability', 'Verbal Skills']
    },
    {
      id: 'values',
      title: 'Work Values Assessment',
      description: 'Identify what matters most to you in a career - work-life balance, salary, impact, and more.',
      duration: '8-12 minutes',
      icon: 'Scale',
      bgColor: 'bg-green-500',
      features: ['Value Priorities', 'Work Environment', 'Life Goals']
    },
    {
      id: 'skills',
      title: 'Skills Inventory',
      description: 'Evaluate your current skills and identify areas for development in your chosen career path.',
      duration: '12-18 minutes',
      icon: 'Award',
      bgColor: 'bg-orange-500',
      features: ['Technical Skills', 'Soft Skills', 'Learning Recommendations']
    }
  ];

  const careers = [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      category: 'Technology',
      description: 'Design, develop, and maintain software applications and systems using various programming languages and frameworks.',
      salaryRange: '4-15 LPA',
      salaryLevel: 'high',
      growth: 'high',
      icon: 'Code',
      bgColor: 'bg-blue-500',
      education: ['B.Tech CSE', 'BCA', 'MCA'],
      skills: ['Programming', 'Problem Solving', 'System Design', 'Debugging', 'Teamwork']
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      category: 'Analytics',
      description: 'Analyze complex data to extract insights and build predictive models that drive business decisions.',
      salaryRange: '6-20 LPA',
      salaryLevel: 'high',
      growth: 'high',
      icon: 'BarChart3',
      bgColor: 'bg-green-500',
      education: ['Statistics', 'Mathematics', 'Computer Science'],
      skills: ['Python/R', 'Machine Learning', 'Statistics', 'Data Visualization', 'SQL']
    },
    {
      id: 'digital-marketer',
      title: 'Digital Marketing Specialist',
      category: 'Marketing',
      description: 'Create and execute online marketing campaigns to promote brands and drive customer engagement.',
      salaryRange: '3-10 LPA',
      salaryLevel: 'medium',
      growth: 'high',
      icon: 'Megaphone',
      bgColor: 'bg-purple-500',
      education: ['Marketing', 'Communications', 'Business'],
      skills: ['SEO/SEM', 'Content Creation', 'Analytics', 'Social Media', 'Creativity']
    },
    {
      id: 'doctor',
      title: 'Medical Doctor',
      category: 'Healthcare',
      description: 'Diagnose and treat patients, providing medical care and promoting health and wellness in communities.',
      salaryRange: '8-25 LPA',
      salaryLevel: 'high',
      growth: 'medium',
      icon: 'Stethoscope',
      bgColor: 'bg-red-500',
      education: ['MBBS', 'MD', 'Specialization'],
      skills: ['Medical Knowledge', 'Empathy', 'Decision Making', 'Communication', 'Attention to Detail']
    },
    {
      id: 'teacher',
      title: 'Educator/Teacher',
      category: 'Education',
      description: 'Educate and inspire students, helping them develop knowledge, skills, and character for their future.',
      salaryRange: '2.5-8 LPA',
      salaryLevel: 'medium',
      growth: 'medium',
      icon: 'GraduationCap',
      bgColor: 'bg-indigo-500',
      education: ['B.Ed', 'Subject Specialization', 'Teaching Certification'],
      skills: ['Communication', 'Patience', 'Subject Expertise', 'Classroom Management', 'Creativity']
    },
    {
      id: 'entrepreneur',
      title: 'Entrepreneur',
      category: 'Business',
      description: 'Start and manage your own business, creating innovative solutions and building successful ventures.',
      salaryRange: '0-50+ LPA',
      salaryLevel: 'high',
      growth: 'high',
      icon: 'Rocket',
      bgColor: 'bg-yellow-500',
      education: ['Business', 'MBA', 'Domain Expertise'],
      skills: ['Leadership', 'Risk Taking', 'Innovation', 'Networking', 'Financial Management']
    }
  ];

   const assessmentQuestions = {
    personality: [
      { id: 1, question: "You prefer working in a team or alone?", options: ["Team", "Alone", "Either", "Depends"] },
      { id: 2, question: "Do you enjoy solving logical puzzles?", options: ["Yes", "No", "Sometimes"] },
      { id: 3, question: "Do you often reflect on your emotions and thoughts?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
      { id: 4, question: "Do you enjoy taking the lead in group activities?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
      { id: 5, question: "Do you stay calm under pressure?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
    ],
    interests: [
      { id: 1, question: "Do you like working with technology and gadgets?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
      { id: 2, question: "Do you enjoy creative activities like art, music, or writing?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },   
      { id: 3, question: "Which activity excites you most in free time?", options: ["Solve math puzzles / code","Run a small stall / trade ideas","Write, perform, or create art","Build things, repair, learn a craft"]},
      { id: 4, question: "Which school project did you enjoy most?",options: [ "Model/experiment / coding", "Market survey / business plan", "Play, essay, poster", "Workshop, practical build"]},
      { id: 5, question: "Do you enjoy helping others and volunteering?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] }
    ],
    aptitude: [
      { id: 1, question: "What is 15 + 28?", options: ["43", "42", "44", "45"], correctAnswer: "43" },
      { id: 2,  question: "Which problem would you prefer?",  hint: "Simple examples of task preference.", options: ["Solve a math equation","Explain the meaning of a paragraph", "Visualize how shapes rotate", "Spot a pattern in numbers"]},
      { id: 3,  question: "Which exercise sounds interesting?",    hint: "Pick the one you enjoy more.",   options: ["Mental arithmetic","Reading comprehension","Map or diagram tasks","Sequence puzzles"]},
      { id: 4,  question: "Find the missing number: 2, 6, 12, 20, ?", options: ["28", "30", "32", "34"],hint: "Look at the difference pattern (4, 6, 8, ...)."},
      { id: 5,   question: "Which is the odd one out: Circle, Triangle, Square, Cube?",  options: ["Circle", "Triangle", "Square", "Cube"],  hint: "Three are 2D shapes, one is 3D."  }
    ],
    values: [
    { id: 1, question: "Do you value honesty and integrity above everything?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 2, question: "Which work environment would you prefer?", options: ["Structured office with fixed hours","Dynamic and flexible startup culture","Outdoor / field-based work","Academic or research environment"]},
    { id: 3, question: "Do you value personal growth and learning?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    {id: 4,question: "What kind of success appeals to you the most?",options: [ "Financial success","Respect and recognition",   "Happiness and balance", "Innovation and creating something new"]},
    { id: 5, question: "Do you value creativity and innovation?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  ],
  skills: [
     { id: 1,question: "How confident are you in solving complex math problems?",options: ["Very confident", "Somewhat confident","Neutral", "Not confident at all" ]},
    { id: 2, question: "Do you manage your time well?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
     {id: 3, question: "How strong are your communication and presentation skills?",options: [ "Excellent","Good","Average","Weak" ]},
    { id: 4, question: "Do you solve problems creatively?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
    { id: 5, question: "Do you feel confident using technology for tasks?", options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"] },
  ],
  };
  // scoringMatrix — keys are assessment ids, then option text => stream weights
const scoringMatrix = {
  personality: {
    "Team":            { commerce: 1, arts: 1, science_pcm: 0.5, science_bio: 0.5 },
    "Alone":           { science_pcm: 1, science_bio: 1 },
    "Either":          { commerce: 0.5, arts: 0.5, science_pcm: 0.5, science_bio: 0.5 },
    "Depends":         { commerce: 0.5, arts: 0.5 },
    "Strongly Agree":  { science_pcm: 0.7, science_bio: 0.7, commerce: 0.4, arts: 0.4 },
    "Agree":           { science_pcm: 0.4, science_bio: 0.4, commerce: 0.2, arts: 0.2 },
    "Neutral":         { },
    "Disagree":        { },
    "Strongly Disagree": { }
  },
  interests: {
    "Solve math puzzles / code":           { science_pcm: 2 },
    "Model/experiment / coding":           { science_pcm: 1.5, science_bio: 0.5 },
    "Market survey / business plan":       { commerce: 2 },
    "Run a small stall / trade ideas":     { commerce: 1.5 },
    "Write, perform, or create art":       { arts: 2 },
    "Play, essay, poster":                 { arts: 1.5 },
    "Workshop, practical build":           { science_pcm: 1, science_bio: 1, arts: 0.5 },
    "Build things, repair, learn a craft": { science_pcm: 1, science_bio: 1, arts: 0.5 },
    "Do you enjoy helping others and volunteering?": { science_bio: 1.2, arts: 0.8 }
  },
  aptitude: {
    // numeric answers or option text from your aptitude questions
    "43": { science_pcm: 2, commerce: 0.5 }, // correct numeric example
    "30": { science_pcm: 2 },
    "28": { science_pcm: 1 },
    "Solve a math equation": { science_pcm: 1.5 },
    "Explain the meaning of a paragraph": { arts: 1.5, commerce: 0.5 },
    "Visualize how shapes rotate": { science_pcm: 1, arts: 0.5, science_bio: 0.5 },
    "Spot a pattern in numbers": { science_pcm: 1.5, commerce: 0.5 }
  },
  values: {
    "Job security and stability": { commerce: 1.5, science_bio: 1 },
    "High income and financial growth": { commerce: 2 },
    "Helping people and making an impact": { science_bio: 2, arts: 0.5 },
    "Creativity and innovation": { arts: 2, science_pcm: 0.6 },
    "Structured office with fixed hours": { commerce: 1.2 },
    "Dynamic and flexible startup culture": { arts: 0.8, commerce: 1.0, science_pcm: 0.6 },
    "Very important – I want to help society": { science_bio: 1.8, arts: 0.6 },
    "Financial success": { commerce: 2 },
    "Respect and recognition": { arts: 1.2, commerce: 1.0 },
    "Happiness and balance": { arts: 1.0, science_bio: 0.6 }
  },
  skills: {
    "Very confident": { science_pcm: 2, commerce: 1 },
    "Somewhat confident": { science_pcm: 1, commerce: 0.5 },
    "Neutral": { },
    "Not confident at all": { },
    "Excellent": { arts: 2, commerce: 1 },
    "Good": { arts: 1, commerce: 0.5 },
    "Average": { },
    "Weak": { },
    "Yes, very much": { science_pcm: 1.5, science_bio: 1 },
    "Sometimes": { science_pcm: 0.7, arts: 0.5 },
    "No": { }
  }
};
const [assessmentResults, setAssessmentResults] = useState({
  personality: null,
  interests: null,
  aptitude: null,
  values: null,
  skills: null
});

const [finalAggregate, setFinalAggregate] = useState(null); // will hold aggregated percentages
const streams = ['science_pcm','science_bio','commerce','arts'];

function processQuizResults(assessmentId, answersArray) {
  // initialize zeros
  const score = { science_pcm: 0, science_bio: 0, commerce: 0, arts: 0 };

  // defensive check
  if (!scoringMatrix[assessmentId]) {
    console.warn('No scoring matrix for', assessmentId);
  }

  // apply weights for each selected option
  answersArray.forEach(selected => {
    const rule = scoringMatrix[assessmentId]?.[selected];
    if (rule) {
      Object.keys(rule).forEach(streamKey => {
        if (score[streamKey] === undefined) score[streamKey] = 0;
        score[streamKey] += rule[streamKey];
      });
    } else {
      // Option not found in scoringMatrix — safe to skip or log
      // console.warn('No rule for option', selected, 'in', assessmentId);
    }
  });

  // Save per-assessment result
  setAssessmentResults(prev => {
    const next = { ...prev, [assessmentId]: score };
    // persist
    localStorage.setItem('assessmentResults', JSON.stringify(next));
    return next;
  });

  // After saving, check if all assessments completed -> aggregate
  // (we aggregate after state update with a short timeout to read latest)
  setTimeout(() => {
    const all = { ...assessmentResults, [assessmentId]: score };
    const allDone = streams.reduce((acc, s) => acc && allPersonCompleted(all), true);
    // We'll call aggregate when all 5 completed (we'll implement allPersonCompleted next)
    aggregateIfReady(all);
  }, 50);
}

// helper to check completion:
function allPersonCompleted(all) {
  return Object.values(all).every(v => v !== null);
}
function aggregateIfReady(all) {
  // all is the object with per-assessment scores
  if (Object.values(all).every(v => v !== null)) {
    const agg = { science_pcm: 0, science_bio: 0, commerce: 0, arts: 0 };
    Object.values(all).forEach(assessmentScore => {
      Object.keys(assessmentScore).forEach(k => agg[k] += assessmentScore[k]);
    });

    // Normalize to percentages: compute max possible total by scanning scoringMatrix
    const maxTotal = computeMaxPossibleTotal(); // we'll implement next
    // Avoid division by zero
    const percentages = {};
    Object.keys(agg).forEach(k => {
      percentages[k] = maxTotal === 0 ? 0 : Math.round((agg[k] / maxTotal) * 100);
    });

    setFinalAggregate(percentages);
    localStorage.setItem('finalAggregate', JSON.stringify(percentages));
  }
}
function computeMaxPossibleTotal() {
  // For each assessment, for each question pick the option that gives highest total across streams,
  // sum those max values across all assessments and streams.
  let totalMax = 0;
  Object.keys(assessmentQuestions).forEach(assessmentId => {
    const qlist = assessmentQuestions[assessmentId];
    if (!qlist) return;
    qlist.forEach(q => {
      // For each option, compute the sum of weights this option contributes to any stream
      let optionMax = 0;
      (q.options || []).forEach(opt => {
        const optKey = typeof opt === 'string' ? opt : opt; // if option is string; adjust if it's object
        const rule = scoringMatrix[assessmentId]?.[optKey];
        if (rule) {
          const sum = Object.values(rule).reduce((a,b)=>a+(b||0), 0);
          if (sum > optionMax) optionMax = sum;
        }
      });
      totalMax += optionMax;
    });
  });
  return totalMax || 1; // avoid zero
}


  const tabs = [
    { id: 'assessments', name: 'Assessments', icon: 'ClipboardList' },
    { id: 'careers', name: 'Explore Careers', icon: 'Briefcase' },
    { id: 'streams', name: 'Stream Wizard', icon: 'BookOpen' },
    { id: 'skills', name: 'Skills Gap', icon: 'TrendingUp' },
    { id: 'progress', name: 'Progress', icon: 'Target' },
    { id: 'peers', name: 'Peer Insights', icon: 'Users' }
  ];

  useEffect(() => {
    // Simulate loading user progress
    const savedProgress = localStorage.getItem('careerDiscoveryProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const handleStartAssessment = (assessmentId) => {
   // console.log('Starting assessment:', assessmentId);
    setcurrentquiz(assessmentId);
    // Implement assessment start logic
  };

  const handleExploreCareer = (careerId) => {
    console.log('Exploring career:', careerId);
    // Implement career exploration logic
  };

  const handleBookmarkCareer = (careerId) => {
    setBookmarkedCareers(prev => 
      prev?.includes(careerId) 
        ? prev?.filter(id => id !== careerId)
        : [...prev, careerId]
    );
  };

  const handleStreamSelect = (streamId) => {
    setSelectedStream(streamId);
  };

  const handleContinueAssessment = () => {
    setActiveTab('assessments');
  };

  const handleViewResults = () => {
    console.log('Viewing assessment results');
  };

  const handleViewPeerDetails = (storyId) => {
    console.log('Viewing peer story:', storyId);
  };
  

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Icon name="Sparkles" size={16} />
                <span>Discover Your Perfect Career Path</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                Career Discovery Portal
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                Take scientifically-backed assessments, explore 200+ careers, and get personalized guidance 
                to make informed decisions about your future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  onClick={() =>  handleStartAssessment('personality')} 
                  className="bg-primary hover:bg-primary/90"
                >
                  Start Assessment
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Compass"
                  iconPosition="left"
                  onClick={() => setActiveTab('careers')}
                >
                  Explore Careers
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-surface border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 overflow-x-auto py-4">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-elevation-1'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Assessments Tab */}
            {activeTab === 'assessments' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-text-primary mb-4">
                    Career Assessment Suite
                  </h2>
                  <p className="text-text-secondary max-w-2xl mx-auto">
                    Complete our comprehensive assessments to discover your strengths, interests, 
                    and ideal career matches based on scientific research.
                  </p>
                </div>

               {currentquiz ? (
                <Quiz
      questions={assessmentQuestions[currentquiz]}
      onComplete={(results) => {
        console.log("Quiz completed:", results);
        // ✅ Ensure scoring handles missing matrix keys safely
        processQuizResults(currentquiz, results);
        setcurrentquiz(null); 
      }}
    />
                  ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assessments?.map((assessment) => (
                    <AssessmentCard
                      key={assessment?.id}
                      assessment={assessment}
                      onStart={handleStartAssessment}
                      isCompleted={Boolean(assessmentResults?.[assessment.id])} // ✅ Fixed completion state
                      progress={assessmentResults?.[assessment.id] ? 100 : 0}   // ✅ Now reflects real completion
                    />
                  ))}
                </div>
              )}
              </div>
            )}

            {/* Careers Tab */}
            {activeTab === 'careers' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-text-primary mb-4">
                    Explore Career Options
                  </h2>
                  <p className="text-text-secondary max-w-2xl mx-auto">
                    Discover detailed information about 200+ careers including salary ranges, 
                    growth prospects, and required skills in the Indian job market.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {careers?.map((career) => (
                    <CareerCard
                      key={career?.id}
                      career={career}
                      onExplore={handleExploreCareer}
                      isBookmarked={bookmarkedCareers?.includes(career?.id)}
                      onBookmark={handleBookmarkCareer}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Stream Wizard Tab */}
            {activeTab === 'streams' && (
              <StreamWizard
                onStreamSelect={handleStreamSelect}
                selectedStream={selectedStream}
              />
            )}

            {/* Skills Gap Tab */}
            {activeTab === 'skills' && (
              <SkillsGapAnalysis
                userSkills={[]}
                targetCareer="software-engineer"
              />
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <ProgressTracker
                userProgress={userProgress}
                onContinue={handleContinueAssessment}
                onViewResults={handleViewResults}
              />
            )}

            {/* Peer Insights Tab */}
            {activeTab === 'peers' && (
              <PeerComparison
                userProfile={{}}
                onViewDetails={handleViewPeerDetails}
              />
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-secondary py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Discover Your Future?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students who have found their perfect career path through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                iconName="Rocket"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Personalized Guidance
              </Button>
              <Link to="/personal-guidance-center">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="border-white text-white hover:bg-white/10"
                >
                  Talk to Expert
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareerDiscoveryPortal;