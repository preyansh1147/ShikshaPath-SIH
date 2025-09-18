import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuizHeader from './components/QuizHeader';
import QuestionCard from './components/QuestionCard';
import QuizNavigation from './components/QuizNavigation';
import QuizSidebar from './components/QuizSidebar';
import PauseModal from './components/PauseModal';

const AptitudeAssessmentQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [isPaused, setIsPaused] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);

  // Mock quiz questions data
  const quizQuestions = [
    {
      id: 1,
      type: 'multiple-choice',
      category: 'logical-reasoning',
      text: "You enjoy solving complex mathematical problems and finding patterns in numbers.",
      description: "Think about your experience with mathematics and problem-solving activities.",
      options: [
        { id: 'a', text: "Strongly Agree", description: "I love mathematical challenges" },
        { id: 'b', text: "Agree", description: "I generally enjoy math problems" },
        { id: 'c', text: "Neutral", description: "I'm indifferent to math problems" },
        { id: 'd', text: "Disagree", description: "I find math problems challenging" },
        { id: 'e', text: "Strongly Disagree", description: "I avoid mathematical problems" }
      ],
      hint: "Consider your natural inclination towards analytical thinking and problem-solving."
    },
    {
      id: 2,
      type: 'scenario-based',
      category: 'personality',
      text: "How would you approach a group project?",
      scenario: `You're assigned to work on a group project for your final semester. The project requires research, analysis, presentation, and coordination among team members. Your grade depends on both individual contribution and team performance.`,
      options: [
        { id: 'a', text: "Take charge and organize the entire project timeline and delegate tasks" },
        { id: 'b', text: "Focus on the research and analysis part where I can work independently" },
        { id: 'c', text: "Handle the presentation and communication aspects of the project" },
        { id: 'd', text: "Support wherever needed and ensure team harmony throughout" }
      ]
    },
    {
      id: 3,
      type: 'rating-scale',category: 'interests',
      text: "Rate your interest in understanding how things work mechanically.",
      description: "Consider your curiosity about machines, engines, electronics, and mechanical systems.",
      scaleRange: 5,
      scaleLabels: {
        min: "Not Interested",
        max: "Very Interested"
      }
    },
    {
      id: 4,
      type: 'multiple-choice',category: 'aptitude',
      text: "Which activity would you find most engaging during your free time?",
      options: [
        { id: 'a', text: "Reading about scientific discoveries and innovations" },
        { id: 'b', text: "Creating art, writing stories, or composing music" },
        { id: 'c', text: "Analyzing market trends and business strategies" },
        { id: 'd', text: "Learning about different cultures and historical events" },
        { id: 'e', text: "Participating in community service and social activities" }
      ]
    },
    {
      id: 5,
      type: 'scenario-based',category: 'problem-solving',text: "You encounter a technical problem that needs immediate solution.",scenario: `While working on an important project, you encounter a technical issue that's blocking your progress. You have limited time to resolve it, and the success of your project depends on finding a solution quickly.`,
      options: [
        { id: 'a', text: "Research extensively online and try different solutions systematically" },
        { id: 'b', text: "Ask for help from experts or colleagues who might have faced similar issues" },
        { id: 'c', text: "Break down the problem into smaller parts and tackle each one individually" },
        { id: 'd', text: "Look for alternative approaches that might bypass the technical issue entirely" }
      ]
    },
    {
      id: 6,
      type: 'rating-scale',
      category: 'personality',
      text: "You prefer working in structured environments with clear guidelines.",
      scaleRange: 5,
      scaleLabels: {
        min: "Strongly Disagree",
        max: "Strongly Agree"
      }
    },
    {
      id: 7,
      type: 'multiple-choice',
      category: 'career-interests',
      text: "Which work environment appeals to you the most?",
      options: [
        { id: 'a', text: "Laboratory or research facility conducting experiments" },
        { id: 'b', text: "Corporate office managing business operations" },
        { id: 'c', text: "Creative studio working on artistic projects" },
        { id: 'd', text: "Field work interacting with people and communities" },
        { id: 'e', text: "Educational institution teaching and mentoring others" }
      ]
    },
    {
      id: 8,
      type: 'scenario-based',
      category: 'decision-making',
      text: "How do you typically make important decisions?",
      scenario: `You need to choose between two equally attractive opportunities - one offers immediate benefits but limited growth, while the other requires initial sacrifice but promises long-term advantages.`,
      options: [
        { id: 'a', text: "Analyze all pros and cons systematically before deciding" },
        { id: 'b', text: "Trust my intuition and go with what feels right" },
        { id: 'c', text: "Seek advice from mentors and people I trust" },
        { id: 'd', text: "Consider the long-term impact on my goals and values" }
      ]
    },
    {
      id: 9,
      type: 'rating-scale',
      category: 'skills',
      text: "Rate your comfort level with public speaking and presentations.",
      scaleRange: 5,
      scaleLabels: {
        min: "Very Uncomfortable",
        max: "Very Comfortable"
      }
    },
    {
      id: 10,
      type: 'multiple-choice',
      category: 'learning-style',
      text: "What\'s your preferred way of learning new concepts?",
      options: [
        { id: 'a', text: "Reading detailed explanations and theoretical frameworks" },
        { id: 'b', text: "Hands-on practice and experimentation" },
        { id: 'c', text: "Visual aids like diagrams, charts, and infographics" },
        { id: 'd', text: "Group discussions and collaborative learning" },
        { id: 'e', text: "Real-world examples and case studies" }
      ]
    }
  ];

  const totalQuestions = quizQuestions?.length;

  // Timer effect
  useEffect(() => {
    if (!isPaused && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPaused, timeRemaining]);

  // Auto-save progress
  useEffect(() => {
    const saveProgress = () => {
      const progressData = {
        currentQuestion,
        answers,
        bookmarkedQuestions,
        timeRemaining,
        timestamp: new Date()?.toISOString()
      };
      localStorage.setItem('quiz-progress', JSON.stringify(progressData));
    };

    const saveTimer = setInterval(saveProgress, 30000); // Save every 30 seconds
    return () => clearInterval(saveTimer);
  }, [currentQuestion, answers, bookmarkedQuestions, timeRemaining]);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('quiz-progress');
    if (savedProgress) {
      try {
        const data = JSON.parse(savedProgress);
        setCurrentQuestion(data?.currentQuestion || 1);
        setAnswers(data?.answers || {});
        setBookmarkedQuestions(data?.bookmarkedQuestions || []);
        setTimeRemaining(data?.timeRemaining || 3600);
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  const currentQuestionData = quizQuestions?.find(q => q?.id === currentQuestion);
  const progressPercentage = Math.round((currentQuestion / totalQuestions) * 100);

  const handleAnswerSelect = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleBookmarkToggle = (questionNum) => {
    setBookmarkedQuestions(prev => {
      if (prev?.includes(questionNum)) {
        return prev?.filter(q => q !== questionNum);
      } else {
        return [...prev, questionNum];
      }
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleQuestionJump = (questionNum) => {
    if (questionNum >= 1 && questionNum <= totalQuestions) {
      setCurrentQuestion(questionNum);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
    setShowPauseModal(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    setShowPauseModal(false);
  };

  const handleSaveAndExit = () => {
    // Save current progress
    const progressData = {
      currentQuestion,
      answers,
      bookmarkedQuestions,
      timeRemaining,
      timestamp: new Date()?.toISOString()
    };
    localStorage.setItem('quiz-progress', JSON.stringify(progressData));
    navigate('/user-dashboard');
  };

  const handleSubmit = () => {
    // Calculate results and navigate to results page
    const completionData = {
      answers,
      totalQuestions,
      completedAt: new Date()?.toISOString(),
      timeSpent: 3600 - timeRemaining
    };
    localStorage.setItem('quiz-results', JSON.stringify(completionData));
    localStorage.removeItem('quiz-progress'); // Clear saved progress
    navigate('/stream-exploration');
  };

  const handleExit = () => {
    navigate('/user-dashboard');
  };

  const canGoNext = currentQuestion < totalQuestions;
  const canGoPrevious = currentQuestion > 1;
  const isLastQuestion = currentQuestion === totalQuestions;
  const hasUnansweredQuestions = Object.keys(answers)?.length < totalQuestions;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <QuizHeader 
          onExit={handleExit}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <QuestionCard
                question={currentQuestionData}
                questionNumber={currentQuestion}
                totalQuestions={totalQuestions}
                selectedAnswer={answers?.[currentQuestion]}
                onAnswerSelect={handleAnswerSelect}
                isBookmarked={bookmarkedQuestions?.includes(currentQuestion)}
                onBookmarkToggle={handleBookmarkToggle}
              />
              
              <QuizNavigation
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                canGoNext={canGoNext}
                canGoPrevious={canGoPrevious}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onPause={handlePause}
                onSubmit={handleSubmit}
                isLastQuestion={isLastQuestion}
                hasUnansweredQuestions={hasUnansweredQuestions}
              />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <QuizSidebar
                  currentQuestion={currentQuestion}
                  totalQuestions={totalQuestions}
                  timeRemaining={timeRemaining}
                  bookmarkedQuestions={bookmarkedQuestions}
                  onBookmarkToggle={handleBookmarkToggle}
                  answers={answers}
                  onQuestionJump={handleQuestionJump}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pause Modal */}
      <PauseModal
        isOpen={showPauseModal}
        onClose={() => setShowPauseModal(false)}
        onResume={handleResume}
        onSaveAndExit={handleSaveAndExit}
        currentProgress={progressPercentage}
      />
    </div>
  );
};

export default AptitudeAssessmentQuiz;