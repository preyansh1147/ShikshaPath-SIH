import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ParentResources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);

  const categories = [
    { id: 'all', name: 'All Resources', icon: 'BookOpen', count: 45 },
    { id: 'career-guidance', name: 'Career Guidance', icon: 'Compass', count: 12 },
    { id: 'exam-prep', name: 'Exam Preparation', icon: 'GraduationCap', count: 8 },
    { id: 'college-selection', name: 'College Selection', icon: 'School', count: 10 },
    { id: 'financial-planning', name: 'Financial Planning', icon: 'PiggyBank', count: 7 },
    { id: 'emotional-support', name: 'Emotional Support', icon: 'Heart', count: 8 }
  ];

  const resources = [
    {
      id: 1,
      title: "Understanding Modern Career Options: A Parent\'s Guide",
      description: "Comprehensive guide to help parents understand emerging career fields and how to support their children\'s career choices in the digital age.",
      category: "career-guidance",
      type: "guide",
      readTime: "15 min read",
      downloads: 1234,
      rating: 4.8,
      author: "Dr. Meera Sharma",
      publishDate: "September 10, 2025",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      content: `This comprehensive guide helps parents navigate the complex landscape of modern career options available to their children.\n\nKey topics covered:\n• Understanding new-age careers in technology\n• How to support your child's career exploration\n• Balancing parental expectations with child's interests\n• Financial planning for different career paths\n\nThe guide includes practical worksheets and conversation starters to help families make informed decisions together.`,
      tags: ["Career Planning", "Parent Guide", "Modern Careers"]
    },
    {
      id: 2,
      title: "JEE & NEET: What Parents Need to Know",
      description: "Essential information for parents about India's most competitive entrance exams, including preparation strategies and emotional support tips.",
      category: "exam-prep",
      type: "article",
      readTime: "12 min read",
      downloads: 987,
      rating: 4.7,
      author: "Prof. Rajesh Kumar",
      publishDate: "September 8, 2025",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
      content: `A detailed overview of JEE and NEET examinations from a parent's perspective.\n\nWhat you'll learn:\n• Exam structure and preparation timeline\n• How to create a supportive home environment\n• Managing stress and expectations\n• Alternative options if exams don't go as planned\n\nIncludes real stories from parents whose children have successfully navigated these exams.`,
      tags: ["JEE", "NEET", "Entrance Exams", "Parent Support"]
    },
    {
      id: 3,
      title: "College Selection Checklist for Parents",
      description: "Step-by-step checklist to help parents and students evaluate colleges based on academics, infrastructure, placement records, and cultural fit.",
      category: "college-selection",
      type: "checklist",
      readTime: "8 min read",
      downloads: 756,
      rating: 4.9,
      author: "Ms. Anita Desai",
      publishDate: "September 5, 2025",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
      content: `A practical checklist to evaluate colleges systematically.\n\nEvaluation criteria:\n• Academic reputation and faculty quality\n• Infrastructure and facilities\n• Placement records and industry connections\n• Campus culture and student life\n• Location and accessibility\n• Fee structure and financial aid\n\nDownloadable PDF checklist included for easy reference during college visits.`,
      tags: ["College Selection", "Checklist", "Evaluation"]
    },
    {
      id: 4,
      title: "Education Financing: Loans, Scholarships & Planning",
      description: "Complete guide to financing your child's education, including education loans, scholarship opportunities, and long-term financial planning strategies.",category: "financial-planning",type: "guide",readTime: "20 min read",
      downloads: 654,
      rating: 4.6,
      author: "CA Rohit Agarwal",publishDate: "September 3, 2025",image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop",
      content: `Comprehensive financial planning guide for education expenses.\n\nTopics covered:\n• Education loan options and eligibility\n• Scholarship opportunities and application process\n• Tax benefits on education expenses\n• Creating an education fund\n• International education financing\n\nIncludes calculators and templates for financial planning.`,
      tags: ["Education Loans", "Scholarships", "Financial Planning"]
    },
    {
      id: 5,
      title: "Supporting Your Child Through Academic Stress",description: "Practical strategies for parents to help their children manage academic pressure, maintain mental health, and build resilience during crucial years.",category: "emotional-support",type: "article",readTime: "10 min read",
      downloads: 543,
      rating: 4.8,
      author: "Dr. Priya Malhotra",publishDate: "September 1, 2025",image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop",
      content: `Learn how to provide emotional support during your child's academic journey.\n\nKey strategies:\n• Recognizing signs of academic stress\n• Creating a supportive home environment\n• Encouraging healthy study habits\n• When to seek professional help\n• Building resilience and confidence\n\nIncludes warning signs checklist and communication tips.`,
      tags: ["Mental Health", "Academic Stress", "Emotional Support"]
    }
  ];

  const webinars = [
    {
      id: 1,
      title: "Parenting in the Digital Age: Career Guidance for Gen Z",
      date: "September 20, 2025",
      time: "7:00 PM - 8:30 PM",
      speaker: "Dr. Meera Sharma & Panel of Parents",
      registered: 234,
      maxCapacity: 500,
      isUpcoming: true
    },
    {
      id: 2,
      title: "Understanding Your Child\'s Learning Style",
      date: "September 25, 2025",
      time: "6:30 PM - 8:00 PM",
      speaker: "Prof. Rajesh Kumar",
      registered: 156,
      maxCapacity: 300,
      isUpcoming: true
    }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources?.filter(resource => resource?.category === selectedCategory);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'guide': return 'BookOpen';
      case 'article': return 'FileText';
      case 'checklist': return 'CheckSquare';
      case 'video': return 'Play';
      default: return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'guide': return 'text-primary';
      case 'article': return 'text-secondary';
      case 'checklist': return 'text-success';
      case 'video': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Parent Resource Center</h2>
        <p className="text-text-secondary">Guidance materials to help you support your child's educational journey</p>
      </div>
      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground shadow-elevation-1'
                : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.name}</span>
            <span className="text-xs opacity-75">({category?.count})</span>
          </button>
        ))}
      </div>
      {/* Featured Webinars */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-text-primary">Upcoming Parent Webinars</h3>
          <Button variant="outline" size="sm" iconName="Calendar">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {webinars?.map((webinar) => (
            <div key={webinar?.id} className="bg-surface rounded-lg border border-border p-4">
              <h4 className="font-semibold text-text-primary mb-2">{webinar?.title}</h4>
              <div className="space-y-2 text-sm text-text-secondary mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={14} />
                  <span>{webinar?.date} at {webinar?.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={14} />
                  <span>{webinar?.speaker}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={14} />
                  <span>{webinar?.registered}/{webinar?.maxCapacity} registered</span>
                </div>
              </div>
              <Button variant="default" size="sm" fullWidth iconName="UserPlus" iconPosition="left">
                Register Free
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources?.map((resource) => (
          <div
            key={resource?.id}
            className="bg-surface rounded-xl border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 overflow-hidden cursor-pointer"
            onClick={() => setSelectedResource(resource)}
          >
            {/* Resource Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={resource?.image}
                alt={resource?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface/90 ${getTypeColor(resource?.type)}`}>
                  <Icon name={getTypeIcon(resource?.type)} size={12} className="mr-1" />
                  {resource?.type}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-1 bg-surface/90 rounded-full px-2 py-1">
                  <Icon name="Star" size={12} className="text-warning" />
                  <span className="text-xs font-medium">{resource?.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Resource Info */}
              <div className="mb-4">
                <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">{resource?.title}</h3>
                <p className="text-sm text-text-secondary line-clamp-3">{resource?.description}</p>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{resource?.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Download" size={12} />
                    <span>{resource?.downloads}</span>
                  </div>
                </div>
                <span>{resource?.publishDate}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {resource?.tags?.slice(0, 2)?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {resource?.tags?.length > 2 && (
                  <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                    +{resource?.tags?.length - 2}
                  </span>
                )}
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="User" size={12} className="text-primary" />
                  </div>
                  <span className="text-xs text-text-secondary">{resource?.author}</span>
                </div>
                <Button variant="outline" size="sm" iconName="ExternalLink">
                  Read
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Resource Detail Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-elevation-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedResource?.type)}`}>
                      <Icon name={getTypeIcon(selectedResource?.type)} size={12} className="mr-1" />
                      {selectedResource?.type}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning" />
                      <span className="text-xs font-medium">{selectedResource?.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{selectedResource?.title}</h3>
                  <p className="text-text-secondary">{selectedResource?.description}</p>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="p-1 hover:bg-muted rounded-md transition-colors duration-200 ml-4"
                >
                  <Icon name="X" size={20} className="text-text-secondary" />
                </button>
              </div>

              {/* Resource Image */}
              <div className="mb-6">
                <Image
                  src={selectedResource?.image}
                  alt={selectedResource?.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <div className="text-xs text-text-secondary">Author</div>
                  <div className="text-sm font-medium text-text-primary">{selectedResource?.author}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Icon name="Clock" size={16} className="text-primary" />
                  </div>
                  <div className="text-xs text-text-secondary">Read Time</div>
                  <div className="text-sm font-medium text-text-primary">{selectedResource?.readTime}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Icon name="Download" size={16} className="text-primary" />
                  </div>
                  <div className="text-xs text-text-secondary">Downloads</div>
                  <div className="text-sm font-medium text-text-primary">{selectedResource?.downloads}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Icon name="Calendar" size={16} className="text-primary" />
                  </div>
                  <div className="text-xs text-text-secondary">Published</div>
                  <div className="text-sm font-medium text-text-primary">{selectedResource?.publishDate}</div>
                </div>
              </div>

              {/* Content Preview */}
              <div className="mb-6">
                <h4 className="font-semibold text-text-primary mb-3">Content Overview</h4>
                <div className="prose prose-sm max-w-none">
                  <p className="text-text-secondary whitespace-pre-line">{selectedResource?.content}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h4 className="font-semibold text-text-primary mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedResource?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                >
                  Download PDF
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  iconName="ExternalLink"
                  iconPosition="left"
                >
                  Read Full Article
                </Button>
                <Button
                  variant="outline"
                  iconName="Share"
                />
                <Button
                  variant="outline"
                  iconName="Bookmark"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentResources;