import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Header from '../../components/ui/Header';
import TimelineCard from './components/TimelineCard';
import ResourceCard from './components/ResourceCard';
import ScholarshipCard from './components/ScholarshipCard';
import ExamPrepCard from './components/ExamPrepCard';
import IndustryInsightCard from './components/IndustryInsightCard';
import DeadlineTracker from './components/DeadlineTracker';

const ResourceTimelineHub = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('12');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for timeline items
  const timelineItems = [
    {
      id: 1,
      title: "JEE Main Application Form",
      category: "Entrance Exam",
      description: "Complete and submit JEE Main application form with required documents and fee payment.",
      deadline: "2025-01-15",
      priority: "high",
      status: "upcoming",
      hasResources: true,
      hasReminder: true
    },
    {
      id: 2,
      title: "NEET Registration",
      category: "Medical Entrance",
      description: "Register for NEET 2025 examination and upload necessary documents.",
      deadline: "2025-01-20",
      priority: "high",
      status: "upcoming",
      hasResources: true,
      hasReminder: false
    },
    {
      id: 3,
      title: "Class 12 Board Exam Preparation",
      category: "Board Exams",
      description: "Complete syllabus revision and practice previous year question papers.",
      deadline: "2025-02-15",
      priority: "medium",
      status: "in-progress",
      hasResources: true,
      hasReminder: true
    },
    {
      id: 4,
      title: "Scholarship Application - Merit Cum Means",
      category: "Scholarship",
      description: "Apply for government merit cum means scholarship for higher education.",
      deadline: "2025-01-30",
      priority: "medium",
      status: "upcoming",
      hasResources: false,
      hasReminder: true
    },
    {
      id: 5,
      title: "College Application - DU",
      category: "College Application",
      description: "Submit application for Delhi University undergraduate programs.",
      deadline: "2025-02-28",
      priority: "high",
      status: "upcoming",
      hasResources: true,
      hasReminder: false
    }
  ];

  // Mock data for resources
  const resources = [
    {
      id: 1,
      title: "JEE Main Physics Complete Notes",
      description: "Comprehensive physics notes covering all topics for JEE Main preparation with solved examples.",
      type: "pdf",
      author: "Dr. Rajesh Kumar",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      rating: 4.8,
      downloads: 15420,
      fileSize: 25600000,
      duration: null,
      tags: ["Physics", "JEE Main", "Notes", "Theory"],
      isBookmarked: false,
      isOfflineAvailable: true
    },
    {
      id: 2,
      title: "NEET Biology Video Lectures",
      description: "Complete video lecture series for NEET biology preparation by expert faculty.",
      type: "video",
      author: "Prof. Meera Sharma",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      rating: 4.9,
      downloads: 8750,
      fileSize: null,
      duration: "45 hours",
      tags: ["Biology", "NEET", "Video", "Lectures"],
      isBookmarked: true,
      isOfflineAvailable: false
    },
    {
      id: 3,
      title: "Mathematics Practice Questions",
      description: "1000+ practice questions for Class 12 mathematics with detailed solutions.",
      type: "practice",
      author: "Arun Mathur",
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop",
      rating: 4.7,
      downloads: 12300,
      fileSize: 15800000,
      duration: null,
      tags: ["Mathematics", "Practice", "Class 12", "Solutions"],
      isBookmarked: false,
      isOfflineAvailable: true
    },
    {
      id: 4,
      title: "Chemistry Quick Revision Notes",
      description: "Last-minute revision notes for chemistry covering important formulas and concepts.",
      type: "notes",
      author: "Dr. Priya Singh",
      thumbnail: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=400&h=300&fit=crop",
      rating: 4.6,
      downloads: 9800,
      fileSize: 8400000,
      duration: null,
      tags: ["Chemistry", "Revision", "Quick Notes", "Formulas"],
      isBookmarked: true,
      isOfflineAvailable: true
    }
  ];

  // Mock data for scholarships
  const scholarships = [
    {
      id: 1,
      name: "National Merit Scholarship",
      provider: "Ministry of Education, Government of India",
      type: "government",
      amount: 50000,
      amountType: "per year",
      deadline: "2025-01-31",
      eligibility: ["Class 12 passed", "Minimum 80% marks", "Family income < ₹8 lakhs", "Indian citizen"],
      applicants: 25000,
      successRate: 15,
      isBookmarked: false
    },
    {
      id: 2,
      name: "Kishore Vaigyanik Protsahan Yojana",
      provider: "Indian Institute of Science",
      type: "government",
      amount: 75000,
      amountType: "per year",
      deadline: "2025-02-15",
      eligibility: ["Science stream", "KVPY exam qualified", "Class 11/12 student", "Research aptitude"],
      applicants: 8500,
      successRate: 25,
      isBookmarked: true
    },
    {
      id: 3,
      name: "Tata Scholarship for Excellence",
      provider: "Tata Trusts",
      type: "private",
      amount: 100000,
      amountType: "one-time",
      deadline: "2025-01-25",
      eligibility: ["Merit-based", "Engineering/Medical aspirant", "Financial need", "Leadership qualities"],
      applicants: 12000,
      successRate: 8,
      isBookmarked: false
    },
    {
      id: 4,
      name: "Inspire Scholarship",
      provider: "Department of Science & Technology",
      type: "government",
      amount: 80000,
      amountType: "per year",
      deadline: "2025-02-28",
      eligibility: ["Top 1% in Class 12", "Science subjects", "Pursuing higher education", "Age limit 27 years"],
      applicants: 18000,
      successRate: 12,
      isBookmarked: false
    }
  ];

  // Mock data for exam preparation
  const examPrep = [
    {
      id: 1,
      name: "JEE Main",
      fullName: "Joint Entrance Examination Main",
      difficulty: "hard",
      progress: 65,
      totalQuestions: 2500,
      practiceTests: 25,
      accuracy: 78,
      examDate: "2025-04-15",
      timeSpent: 145,
      subjects: [
        { name: "Physics", progress: 70 },
        { name: "Chemistry", progress: 68 },
        { name: "Mathematics", progress: 58 }
      ],
      weakAreas: ["Calculus", "Organic Chemistry", "Modern Physics"]
    },
    {
      id: 2,
      name: "NEET",
      fullName: "National Eligibility cum Entrance Test",
      difficulty: "hard",
      progress: 72,
      totalQuestions: 1800,
      practiceTests: 18,
      accuracy: 82,
      examDate: "2025-05-05",
      timeSpent: 128,
      subjects: [
        { name: "Physics", progress: 75 },
        { name: "Chemistry", progress: 78 },
        { name: "Biology", progress: 68 }
      ],
      weakAreas: ["Human Physiology", "Thermodynamics"]
    },
    {
      id: 3,
      name: "CLAT",
      fullName: "Common Law Admission Test",
      difficulty: "medium",
      progress: 45,
      totalQuestions: 1200,
      practiceTests: 12,
      accuracy: 65,
      examDate: "2025-05-12",
      timeSpent: 85,
      subjects: [
        { name: "English", progress: 55 },
        { name: "GK & Current Affairs", progress: 40 },
        { name: "Legal Reasoning", progress: 42 },
        { name: "Logical Reasoning", progress: 48 },
        { name: "Quantitative Techniques", progress: 50 }
      ],
      weakAreas: ["Current Affairs", "Legal Reasoning"]
    }
  ];

  // Mock data for industry insights
  const industryInsights = [
    {
      id: 1,
      title: "AI and Machine Learning: The Future of Technology Careers",
      summary: "Artificial Intelligence and Machine Learning are reshaping the technology landscape, creating unprecedented opportunities for skilled professionals in India.",
      category: "technology",
      trend: "up",
      growthRate: "+45%",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      publishedDate: "2025-01-10",
      readTime: 8,
      views: 15420,
      isNew: true,
      isBookmarked: false,
      highlights: [
        "AI/ML jobs expected to grow by 45% in next 3 years",
        "Average salary range: ₹8-25 lakhs per annum for freshers",
        "Top hiring companies: Google, Microsoft, Amazon, Flipkart"
      ],
      tags: ["AI", "Machine Learning", "Technology", "Career Growth"],
      relatedCareers: ["Data Scientist", "ML Engineer", "AI Researcher", "Software Developer"]
    },
    {
      id: 2,
      title: "Healthcare Revolution: Emerging Opportunities in Medical Technology",
      summary: "The healthcare sector is experiencing rapid digitization, opening new career paths in medical technology and digital health solutions.",
      category: "healthcare",
      trend: "up",
      growthRate: "+38%",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
      publishedDate: "2025-01-08",
      readTime: 6,
      views: 12800,
      isNew: true,
      isBookmarked: true,
      highlights: [
        "Telemedicine adoption increased by 300% post-pandemic",
        "Biomedical engineering jobs growing at 15% annually",
        "Digital health startups raised $2.1 billion in 2024"
      ],
      tags: ["Healthcare", "Medical Technology", "Digital Health", "Biomedical"],
      relatedCareers: ["Biomedical Engineer", "Health Informatics", "Medical Device Designer"]
    },
    {
      id: 3,
      title: "Green Energy Sector: Sustainable Career Opportunities",
      summary: "India's commitment to renewable energy is creating thousands of jobs in solar, wind, and other sustainable energy sectors.",
      category: "energy",
      trend: "up",
      growthRate: "+52%",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop",
      publishedDate: "2025-01-05",
      readTime: 7,
      views: 9650,
      isNew: false,
      isBookmarked: false,
      highlights: [
        "India aims for 500 GW renewable energy by 2030",
        "Solar industry alone expected to create 1 million jobs",
        "Government incentives for green energy professionals"
      ],
      tags: ["Renewable Energy", "Solar", "Wind Energy", "Sustainability"],
      relatedCareers: ["Solar Engineer", "Wind Technician", "Energy Analyst", "Environmental Engineer"]
    }
  ];

  // Mock data for deadlines
  const [deadlines, setDeadlines] = useState([
    {
      id: 1,
      title: "JEE Main Application",
      category: "Entrance Exam",
      date: "2025-01-15",
      priority: "high"
    },
    {
      id: 2,
      title: "NEET Registration",
      category: "Medical Entrance",
      date: "2025-01-20",
      priority: "high"
    },
    {
      id: 3,
      title: "Scholarship Application",
      category: "Financial Aid",
      date: "2025-01-30",
      priority: "medium"
    },
    {
      id: 4,
      title: "College Application - DU",
      category: "College",
      date: "2025-02-28",
      priority: "high"
    },
    {
      id: 5,
      title: "Board Exam Registration",
      category: "Board Exam",
      date: "2025-01-12",
      priority: "critical"
    }
  ]);

  const classOptions = [
    { value: '10', label: 'Class 10' },
    { value: '11', label: 'Class 11' },
    { value: '12', label: 'Class 12' },
    { value: 'graduate', label: 'Graduate' }
  ];

  const streamOptions = [
    { value: 'all', label: 'All Streams' },
    { value: 'science', label: 'Science' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'arts', label: 'Arts' },
    { value: 'vocational', label: 'Vocational' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'entrance-exam', label: 'Entrance Exams' },
    { value: 'scholarship', label: 'Scholarships' },
    { value: 'college-application', label: 'College Applications' },
    { value: 'board-exam', label: 'Board Exams' },
    { value: 'career-guidance', label: 'Career Guidance' }
  ];

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: 'Calendar', count: timelineItems?.length },
    { id: 'resources', label: 'Resources', icon: 'BookOpen', count: resources?.length },
    { id: 'scholarships', label: 'Scholarships', icon: 'Award', count: scholarships?.length },
    { id: 'exam-prep', label: 'Exam Prep', icon: 'Target', count: examPrep?.length },
    { id: 'insights', label: 'Industry Insights', icon: 'TrendingUp', count: industryInsights?.length },
    { id: 'deadlines', label: 'Deadline Tracker', icon: 'Clock', count: deadlines?.length }
  ];

  // Event handlers
  const handleMarkComplete = (itemId) => {
    console.log('Mark complete:', itemId);
  };

  const handleViewDetails = (item) => {
    console.log('View details:', item);
  };

  const handleDownload = (resource) => {
    console.log('Download resource:', resource);
  };

  const handleBookmark = (id) => {
    console.log('Bookmark item:', id);
  };

  const handleView = (item) => {
    console.log('View item:', item);
  };

  const handleApply = (scholarship) => {
    console.log('Apply for scholarship:', scholarship);
  };

  const handleStartPrep = (exam) => {
    console.log('Start exam prep:', exam);
  };

  const handleViewAnalytics = (exam) => {
    console.log('View analytics:', exam);
  };

  const handleTakePractice = (exam) => {
    console.log('Take practice test:', exam);
  };

  const handleReadMore = (insight) => {
    console.log('Read more:', insight);
  };

  const handleShare = (insight) => {
    console.log('Share insight:', insight);
  };

  const handleAddDeadline = () => {
    console.log('Add new deadline');
  };

  const handleUpdateDeadline = (deadline) => {
    console.log('Update deadline:', deadline);
  };

  const handleDeleteDeadline = (deadlineId) => {
    setDeadlines(deadlines?.filter(d => d?.id !== deadlineId));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timeline':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timelineItems?.map((item) => (
              <TimelineCard
                key={item?.id}
                item={item}
                onMarkComplete={handleMarkComplete}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        );

      case 'resources':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {resources?.map((resource) => (
              <ResourceCard
                key={resource?.id}
                resource={resource}
                onDownload={handleDownload}
                onBookmark={handleBookmark}
                onView={handleView}
              />
            ))}
          </div>
        );

      case 'scholarships':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scholarships?.map((scholarship) => (
              <ScholarshipCard
                key={scholarship?.id}
                scholarship={scholarship}
                onApply={handleApply}
                onViewDetails={handleViewDetails}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        );

      case 'exam-prep':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {examPrep?.map((exam) => (
              <ExamPrepCard
                key={exam?.id}
                exam={exam}
                onStartPrep={handleStartPrep}
                onViewAnalytics={handleViewAnalytics}
                onTakePractice={handleTakePractice}
              />
            ))}
          </div>
        );

      case 'insights':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industryInsights?.map((insight) => (
              <IndustryInsightCard
                key={insight?.id}
                insight={insight}
                onReadMore={handleReadMore}
                onBookmark={handleBookmark}
                onShare={handleShare}
              />
            ))}
          </div>
        );

      case 'deadlines':
        return (
          <DeadlineTracker
            deadlines={deadlines}
            onAddDeadline={handleAddDeadline}
            onUpdateDeadline={handleUpdateDeadline}
            onDeleteDeadline={handleDeleteDeadline}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Resource & Timeline Hub
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Your centralized command center for academic success. Track deadlines, access study materials, 
                discover scholarships, and stay updated with industry insights.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-surface border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">25+</div>
                <div className="text-sm text-text-secondary">Active Deadlines</div>
              </div>
              <div className="bg-surface border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-secondary mb-1">500+</div>
                <div className="text-sm text-text-secondary">Study Resources</div>
              </div>
              <div className="bg-surface border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-1">150+</div>
                <div className="text-sm text-text-secondary">Scholarships</div>
              </div>
              <div className="bg-surface border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-warning mb-1">50+</div>
                <div className="text-sm text-text-secondary">Industry Reports</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="flex-1 min-w-64 max-w-md">
                <Input
                  type="search"
                  placeholder="Search resources, scholarships, exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
              </div>
              <Select
                options={classOptions}
                value={selectedClass}
                onChange={setSelectedClass}
                placeholder="Select Class"
                className="w-32"
              />
              <Select
                options={streamOptions}
                value={selectedStream}
                onChange={setSelectedStream}
                placeholder="Select Stream"
                className="w-36"
              />
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Category"
                className="w-40"
              />
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-surface border-b border-border sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-text-secondary'
                  }`}>
                    {tab?.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {renderTabContent()}
          </div>
        </section>

        {/* Quick Actions Floating Panel */}
        <div className="fixed bottom-6 right-6 z-40">
          <div className="flex flex-col space-y-2">
            <Button
              variant="default"
              size="icon"
              iconName="Plus"
              className="rounded-full shadow-elevation-3 bg-primary hover:bg-primary/90"
              title="Add new item"
            />
            <Button
              variant="outline"
              size="icon"
              iconName="Filter"
              className="rounded-full shadow-elevation-2 bg-surface"
              title="Advanced filters"
            />
            <Button
              variant="outline"
              size="icon"
              iconName="Download"
              className="rounded-full shadow-elevation-2 bg-surface"
              title="Download resources"
            />
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Link to="/homepage-educational-technology-platform" className="text-text-secondary hover:text-text-primary">
                Home
              </Link>
              <Link to="/career-discovery-portal" className="text-text-secondary hover:text-text-primary">
                Career Discovery
              </Link>
              <Link to="/college-intelligence-dashboard" className="text-text-secondary hover:text-text-primary">
                College Intelligence
              </Link>
              <Link to="/personal-guidance-center" className="text-text-secondary hover:text-text-primary">
                Personal Guidance
              </Link>
            </div>
            <div className="text-sm text-text-secondary">
              © {new Date()?.getFullYear()} ShikshaPath . All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResourceTimelineHub;