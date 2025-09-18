import React, { useEffect, useState } from 'react';

import BookmarkedResources from './components/BookmarkedResources';
import Button from '../../components/ui/Button';
import CategoryFilter from './components/CategoryFilter';
import FilterPanel from './components/FilterPanel';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import QuickActionButton from '../../components/ui/QuickActionButton';
import RecommendedSection from './components/RecommendedSection';
import ResourceCard from './components/ResourceCard';
import ResourceViewer from './components/ResourceViewer';
import SearchBar from './components/SearchBar';
import { useNavigate } from 'react-router-dom';

const ResourceLibrary = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    type: 'all',
    language: 'all',
    streams: [],
    minRating: null,
    freeOnly: false,
    recentOnly: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('english');

  // Mock data
  const categories = [
    { id: 'all', name: 'All Resources', icon: 'Library' },
    { id: 'arts-humanities', name: 'Arts & Humanities', icon: 'Palette' },
    { id: 'science', name: 'Science', icon: 'FlaskConical' },
    { id: 'commerce', name: 'Commerce', icon: 'Calculator' },
    { id: 'general', name: 'General & Multi-Stream', icon: 'BookOpen' },
    { id: 'exam', name: 'Exam Preparation', icon: 'ClipboardCheck' },
    { id: 'skills', name: 'Skill Development', icon: 'Target' },
    { id: 'college', name: 'College Information', icon: 'Building2' }
  ];

  const mockResources = [
    // Arts & Humanities Resources
    {
      id: 1,
      title: "edX Arts & Humanities",
      description: "University-level arts & humanities courses from top universities worldwide. Access free and paid courses in literature, history, philosophy, and cultural studies.",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      type: "Website",
      difficulty: "Intermediate",
      duration: "Self-paced",
      rating: 4.7,
      downloads: "15.2K",
      tags: ["Arts", "Humanities", "University Courses", "Literature", "History"],
      category: "arts-humanities",
      language: "English",
      author: "edX",
      lastUpdated: "20 Dec 2024",
      isNew: true,
      isBookmarked: false,
      progress: 0,
      url: "https://www.edx.org/learn/arts-and-humanities",
      sampleContent: "Explore university-level courses in arts and humanities from leading institutions worldwide. Perfect for students interested in literature, history, philosophy, and cultural studies."
    },
    {
      id: 2,
      title: "Coursera Humanities",
      description: "Global universities' arts & history programs. Access courses from top institutions in humanities, social sciences, and cultural studies.",
      thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      type: "Website",
      difficulty: "Intermediate",
      duration: "Self-paced",
      rating: 4.6,
      downloads: "12.8K",
      tags: ["Humanities", "Global Universities", "Arts", "History", "Social Sciences"],
      category: "arts-humanities",
      language: "English",
      author: "Coursera",
      lastUpdated: "18 Dec 2024",
      isNew: false,
      isBookmarked: true,
      progress: 25,
      url: "https://www.coursera.org/browse/arts-and-humanities"
    },
    {
      id: 3,
      title: "NDLI - National Digital Library of India",
      description: "Free Indian resources including e-books, journals, and academic papers. Access thousands of educational materials in multiple Indian languages.",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      type: "Website",
      difficulty: "Beginner",
      duration: "Self-paced",
      rating: 4.8,
      downloads: "25.6K",
      tags: ["Free Resources", "E-books", "Journals", "Indian Languages", "Academic Papers"],
      category: "arts-humanities",
      language: "Multi-language",
      author: "IIT Kharagpur",
      lastUpdated: "15 Dec 2024",
      isNew: true,
      isBookmarked: false,
      progress: 0,
      url: "https://ndl.iitkgp.ac.in/"
    },
    {
      id: 4,
      title: "CrashCourse - Arts & Humanities",
      description: "History, literature, philosophy explained simply through engaging animated videos. Perfect for students who want to understand complex topics easily.",
      thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      type: "YouTube Channel",
      difficulty: "Beginner",
      duration: "10-15 min per video",
      rating: 4.9,
      downloads: "45.3K",
      tags: ["YouTube", "Animated Videos", "History", "Literature", "Philosophy"],
      category: "arts-humanities",
      language: "English",
      author: "CrashCourse",
      lastUpdated: "22 Dec 2024",
      isNew: false,
      isBookmarked: true,
      progress: 40,
      url: "https://www.youtube.com/user/crashcourse"
    },
    {
      id: 5,
      title: "TED-Ed - Arts & Culture",
      description: "Animated lessons across arts & culture. Short, engaging videos that make learning about art, culture, and humanities fun and accessible.",
      thumbnail: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      type: "YouTube Channel",
      difficulty: "Beginner",
      duration: "5-10 min per video",
      rating: 4.7,
      downloads: "32.1K",
      tags: ["TED-Ed", "Animated Lessons", "Arts", "Culture", "Short Videos"],
      category: "arts-humanities",
      language: "English",
      author: "TED-Ed",
      lastUpdated: "19 Dec 2024",
      isNew: false,
      isBookmarked: false,
      progress: 0,
      url: "https://www.youtube.com/user/TEDEducation"
    },

    // Science Resources
    {
      id: 6,
      title: "Khan Academy Science",
      description: "Free science basics covering Physics, Chemistry, Biology, and Mathematics. Comprehensive lessons with practice exercises and progress tracking.",
      thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      type: "Website",
      difficulty: "Beginner",
      duration: "Self-paced",
      rating: 4.8,
      downloads: "85.2K",
      tags: ["Science", "Physics", "Chemistry", "Biology", "Mathematics", "Free"],
      category: "science",
      language: "English",
      author: "Khan Academy",
      lastUpdated: "21 Dec 2024",
      isNew: true,
      isBookmarked: false,
      progress: 0,
      url: "https://www.khanacademy.org/science"
    },
    {
      id: 7,
      title: "NPTEL - IIT Courses",
      description: "IITs' free science & engineering courses. Access high-quality educational content from India's premier technical institutions.",
      thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      type: "Website",
      difficulty: "Advanced",
      duration: "Self-paced",
      rating: 4.9,
      downloads: "67.8K",
      tags: ["IIT", "Engineering", "Science", "Free Courses", "NPTEL"],
      category: "science",
      language: "English",
      author: "IITs",
      lastUpdated: "20 Dec 2024",
      isNew: false,
      isBookmarked: true,
      progress: 15,
      url: "https://nptel.ac.in/"
    },
    {
      id: 8,
      title: "Physics Wallah",
      description: "Indian physics, chemistry & maths prep for JEE/NEET. Comprehensive video lectures with practice problems and doubt clearing sessions.",
      thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      type: "YouTube Channel",
      difficulty: "Intermediate",
      duration: "1-2 hours per lecture",
      rating: 4.7,
      downloads: "125.6K",
      tags: ["Physics", "Chemistry", "Mathematics", "JEE", "NEET", "Indian Content"],
      category: "science",
      language: "Hindi/English",
      author: "Physics Wallah",
      lastUpdated: "23 Dec 2024",
      isNew: true,
      isBookmarked: true,
      progress: 30,
      url: "https://www.youtube.com/c/PhysicsWallah"
    },
    {
      id: 9,
      title: "Kurzgesagt - In a Nutshell",
      description: "Science concepts explained visually through beautiful animations. Complex scientific topics made simple and engaging for all ages.",
      thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      type: "YouTube Channel",
      difficulty: "Beginner",
      duration: "10-15 min per video",
      rating: 4.9,
      downloads: "78.9K",
      tags: ["Science", "Animations", "Visual Learning", "Complex Topics", "Engaging"],
      category: "science",
      language: "English",
      author: "Kurzgesagt",
      lastUpdated: "17 Dec 2024",
      isNew: false,
      isBookmarked: false,
      progress: 0,
      url: "https://www.youtube.com/c/inanutshell"
    },

    // Commerce Resources
    {
      id: 10,
      title: "Investopedia",
      description: "Finance, accounting, economics explained simply. Comprehensive resource for understanding financial concepts, market analysis, and economic principles.",
      thumbnail: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=400&h=300&fit=crop",
      type: "Website",
      difficulty: "Intermediate",
      duration: "Self-paced",
      rating: 4.6,
      downloads: "42.3K",
      tags: ["Finance", "Accounting", "Economics", "Market Analysis", "Business"],
      category: "commerce",
      language: "English",
      author: "Investopedia",
      lastUpdated: "19 Dec 2024",
      isNew: true,
      isBookmarked: false,
      progress: 0,
      url: "https://www.investopedia.com/"
    },
    {
      id: 11,
      title: "CA Rachana Phadke Ranade",
      description: "Stock market & commerce concepts simplified. Learn about investing, trading, and financial planning from India's leading finance educator.",
      thumbnail: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=400&h=300&fit=crop",
      type: "YouTube Channel",
      difficulty: "Beginner",
      duration: "15-30 min per video",
      rating: 4.8,
      downloads: "89.7K",
      tags: ["Stock Market", "Commerce", "Investing", "Trading", "Finance Education"],
      category: "commerce",
      language: "Hindi/English",
      author: "CA Rachana Phadke Ranade",
      lastUpdated: "21 Dec 2024",
      isNew: false,
      isBookmarked: true,
      progress: 20,
      url: "https://www.youtube.com/c/CArachana"
    },
    {
      id: 12,
      title: "Commerce Baba",
      description: "Accounts & business studies for students. Comprehensive coverage of commerce subjects with practical examples and exam preparation tips.",
      thumbnail: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=400&h=300&fit=crop",
      type: "YouTube Channel",
      difficulty: "Beginner",
      duration: "20-45 min per video",
      rating: 4.5,
      downloads: "56.2K",
      tags: ["Accounts", "Business Studies", "Commerce", "Student Content", "Exam Prep"],
      category: "commerce",
      language: "Hindi",
      author: "Commerce Baba",
      lastUpdated: "18 Dec 2024",
      isNew: false,
      isBookmarked: false,
      progress: 0,
      url: "https://www.youtube.com/@commercebaba"
    },

    // General & Multi-Stream Resources
    {
      id: 13,
      title: "Swayam - Government MOOC Platform",
      description: "Government of India MOOC platform covering all streams. Access free courses from top Indian universities and institutions.",
      thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      type: "Website",
      difficulty: "All Levels",
      duration: "Self-paced",
      rating: 4.7,
      downloads: "95.4K",
      tags: ["Government Platform", "MOOC", "All Streams", "Free Courses", "Indian Universities"],
      category: "general",
      language: "Multi-language",
      author: "Government of India",
      lastUpdated: "22 Dec 2024",
      isNew: true,
      isBookmarked: false,
      progress: 0,
      url: "https://swayam.gov.in/"
    },
    {
      id: 14,
      title: "BYJU'S Free Learning",
      description: "Free study resources for Class 6–12. Comprehensive learning platform with interactive videos, practice tests, and personalized learning paths.",
      thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      type: "Website",
      difficulty: "All Levels",
      duration: "Self-paced",
      rating: 4.5,
      downloads: "156.8K",
      tags: ["Free Resources", "Class 6-12", "Interactive Learning", "All Subjects", "Practice Tests"],
      category: "general",
      language: "English/Hindi",
      author: "BYJU'S",
      lastUpdated: "20 Dec 2024",
      isNew: false,
      isBookmarked: true,
      progress: 35,
      url: "https://byjus.com/"
    },
    {
      id: 15,
      title: "StudyIQ Education",
      description: "Competitive exams & current affairs. Comprehensive coverage of UPSC, SSC, banking, and other competitive exam preparation with current affairs updates.",
      thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      type: "YouTube Channel",
      difficulty: "Intermediate",
      duration: "30-60 min per video",
      rating: 4.6,
      downloads: "112.3K",
      tags: ["Competitive Exams", "Current Affairs", "UPSC", "SSC", "Banking"],
      category: "general",
      language: "Hindi/English",
      author: "StudyIQ Education",
      lastUpdated: "23 Dec 2024",
      isNew: true,
      isBookmarked: false,
      progress: 0,
      url: "https://www.youtube.com/@StudyIQeducation"
    },

    // Exam Preparation Resources
    {
      id: 16,
      title: "JEE Main Preparation Strategy 2025",
      description: "Complete preparation guide for JEE Main with study schedule, important topics, previous year analysis, and expert tips for success.",
      thumbnail: "https://images.pixabay.com/photo/2016/11/29/06/15/book-1867171_1280.jpg?w=400&h=300&fit=crop",
      type: "PDF",
      difficulty: "Advanced",
      duration: "2 hours read",
      rating: 4.9,
      downloads: "5.2K",
      tags: ["JEE", "Engineering", "Exam Prep", "Mathematics", "Physics"],
      category: "exam",
      language: "English",
      author: "IIT Alumni Team",
      lastUpdated: "10 Dec 2024",
      isNew: true,
      isBookmarked: false,
      progress: 0
    },
    {
      id: 17,
      title: "NEET Biology Quick Revision Notes",
      description: "Comprehensive biology revision notes for NEET preparation covering all important topics with diagrams and mnemonics.",
      thumbnail: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?w=400&h=300&fit=crop",
      type: "PDF",
      difficulty: "Advanced",
      duration: "3 hours read",
      rating: 4.8,
      downloads: "6.5K",
      tags: ["NEET", "Biology", "Medical", "Revision Notes"],
      category: "exam",
      language: "English",
      author: "Medical Prep Team",
      lastUpdated: "28 Nov 2024",
      isNew: false,
      isBookmarked: true,
      progress: 45
    },

    // Skill Development Resources
    {
      id: 18,
      title: "Digital Skills for Modern Careers",
      description: "Essential digital skills every student should learn including coding basics, digital marketing, and data analysis fundamentals.",
      thumbnail: "https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg?w=400&h=300&fit=crop",
      type: "Interactive",
      difficulty: "Intermediate",
      duration: "1.5 hours",
      rating: 4.5,
      downloads: "2.7K",
      tags: ["Digital Skills", "Coding", "Technology", "Future Skills"],
      category: "skills",
      language: "English",
      author: "Tech Academy",
      lastUpdated: "3 Dec 2024",
      isNew: true,
      isBookmarked: true,
      progress: 20
    },

    // College Information Resources
    {
      id: 19,
      title: "Government College Admission Guide",
      description: "Complete guide to government college admissions, entrance exams, cut-offs, and application procedures for various streams.",
      thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      type: "PDF",
      difficulty: "Intermediate",
      duration: "1 hour read",
      rating: 4.6,
      downloads: "4.1K",
      tags: ["Government Colleges", "Admissions", "Cut-offs", "Applications"],
      category: "college",
      language: "Hindi",
      author: "Education Ministry",
      lastUpdated: "1 Dec 2024",
      isNew: false,
      isBookmarked: false,
      progress: 0
    }
  ];

  const searchSuggestions = [
    "Arts & Humanities",
    "Science resources",
    "Commerce & Finance",
    "JEE preparation",
    "NEET biology",
    "Physics Wallah",
    "Khan Academy",
    "NPTEL courses",
    "Government colleges",
    "Digital skills",
    "YouTube channels",
    "Free courses",
    "Exam preparation",
    "Career guidance",
    "Swayam platform",
    "BYJU'S learning"
  ];

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'english';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Filter resources based on selected filters
  const getFilteredResources = () => {
    let filtered = mockResources;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(resource => resource?.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered?.filter(resource =>
        resource?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        resource?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        resource?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
      );
    }

    // Difficulty filter
    if (filters?.difficulty !== 'all') {
      filtered = filtered?.filter(resource => 
        resource?.difficulty?.toLowerCase() === filters?.difficulty
      );
    }

    // Type filter
    if (filters?.type !== 'all') {
      filtered = filtered?.filter(resource => 
        resource?.type?.toLowerCase() === filters?.type
      );
    }

    // Language filter
    if (filters?.language !== 'all') {
      filtered = filtered?.filter(resource => 
        resource?.language?.toLowerCase()?.includes(filters?.language)
      );
    }

    // Stream filter
    if (filters?.streams && filters?.streams?.length > 0) {
      filtered = filtered?.filter(resource =>
        filters?.streams?.some(stream =>
          resource?.tags?.some(tag => tag?.toLowerCase()?.includes(stream?.toLowerCase()))
        )
      );
    }

    // Rating filter
    if (filters?.minRating) {
      filtered = filtered?.filter(resource => resource?.rating >= filters?.minRating);
    }

    // Free only filter (assuming all resources are free for this demo)
    if (filters?.freeOnly) {
      // In a real app, you'd filter by price
      filtered = filtered;
    }

    // Recent only filter
    if (filters?.recentOnly) {
      filtered = filtered?.filter(resource => resource?.isNew);
    }

    return filtered;
  };

  const getResourceCounts = () => {
    const counts = {};
    categories?.forEach(category => {
      if (category?.id === 'all') {
        counts[category.id] = mockResources?.length;
      } else {
        counts[category.id] = mockResources?.filter(r => r?.category === category?.id)?.length;
      }
    });
    return counts;
  };

  const getRecommendedResources = () => {
    // Mock recommendation logic - in real app, this would be based on user profile
    return mockResources?.filter(resource => 
      resource?.rating >= 4.5 || resource?.isNew
    )?.slice(0, 4);
  };

  const getBookmarkedResources = () => {
    return mockResources?.filter(resource => resource?.isBookmarked);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      difficulty: 'all',
      type: 'all',
      language: 'all',
      streams: [],
      minRating: null,
      freeOnly: false,
      recentOnly: false
    });
  };

  const handleBookmark = (resourceId, isBookmarked) => {
    // In a real app, this would update the backend
    console.log(`Resource ${resourceId} ${isBookmarked ? 'bookmarked' : 'unbookmarked'}`);
  };

  const handleDownload = (resource) => {
    // In a real app, this would trigger actual download
    console.log(`Downloading ${resource?.title}`);
  };

  const handleViewResource = (resource) => {
    setSelectedResource(resource);
  };

  const filteredResources = getFilteredResources();
  const resourceCounts = getResourceCounts();
  const recommendedResources = getRecommendedResources();
  const bookmarkedResources = getBookmarkedResources();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center">
                <Icon name="Library" size={32} className="mr-3 text-primary" />
                Resource Library
              </h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive study materials and career guidance resources
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                iconName="Languages"
                onClick={() => {
                  const newLang = currentLanguage === 'english' ? 'hindi' : 'english';
                  setCurrentLanguage(newLang);
                  localStorage.setItem('selectedLanguage', newLang);
                }}
              >
                {currentLanguage === 'english' ? 'हिंदी' : 'English'}
              </Button>
              <Button
                variant="outline"
                iconName="SlidersHorizontal"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            suggestions={searchSuggestions}
            placeholder="Search for study materials, career guides, exam prep..."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              resourceCounts={resourceCounts}
            />

            {/* Advanced Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Recommended Section */}
            {selectedCategory === 'all' && !searchTerm && (
              <RecommendedSection
                recommendations={recommendedResources}
                onBookmark={handleBookmark}
                onDownload={handleDownload}
                onView={handleViewResource}
              />
            )}

            {/* Bookmarked Resources */}
            {selectedCategory === 'all' && !searchTerm && bookmarkedResources?.length > 0 && (
              <BookmarkedResources
                bookmarkedResources={bookmarkedResources}
                onBookmark={handleBookmark}
                onDownload={handleDownload}
                onView={handleViewResource}
              />
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {searchTerm ? `Search Results for "${searchTerm}"` : 
                   selectedCategory === 'all' ? 'All Resources' : 
                   categories?.find(c => c?.id === selectedCategory)?.name}
                </h2>
                <p className="text-muted-foreground">
                  {filteredResources?.length} resource{filteredResources?.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Grid3X3"
                  className="hidden sm:flex"
                >
                  Grid View
                </Button>
              </div>
            </div>

            {/* Resources Grid */}
            {filteredResources?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredResources?.map((resource) => (
                  <ResourceCard
                    key={resource?.id}
                    resource={resource}
                    onBookmark={handleBookmark}
                    onDownload={handleDownload}
                    onView={handleViewResource}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Resources Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    handleClearFilters();
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Resource Viewer Modal */}
      {selectedResource && (
        <ResourceViewer
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
          onBookmark={handleBookmark}
          onDownload={handleDownload}
        />
      )}
      <QuickActionButton />
    </div>
  );
};

export default ResourceLibrary;