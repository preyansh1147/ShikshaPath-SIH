import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ResourceLibrary = ({ userType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', count: 156 },
    { id: 'guides', name: 'Career Guides', count: 45 },
    { id: 'worksheets', name: 'Worksheets', count: 32 },
    { id: 'presentations', name: 'Presentations', count: 28 },
    { id: 'templates', name: 'Templates', count: 24 },
    { id: 'videos', name: 'Video Content', count: 27 }
  ];

  const parentResources = [
    {
      id: 1,
      title: 'Understanding Modern Career Options',
      description: 'A comprehensive guide to emerging careers in technology, healthcare, and creative industries',
      category: 'guides',
      type: 'PDF Guide',
      downloads: 2341,
      rating: 4.8,
      language: 'English, Hindi',
      icon: 'BookOpen',
      featured: true
    },
    {
      id: 2,
      title: 'Family Career Discussion Toolkit',
      description: 'Structured conversation starters and activities for productive career discussions',
      category: 'worksheets',
      type: 'Interactive Worksheet',
      downloads: 1876,
      rating: 4.7,
      language: 'English, Hindi, Tamil',
      icon: 'MessageSquare',
      featured: true
    },
    {
      id: 3,
      title: 'College Cost Calculator',
      description: 'Plan and budget for your child\'s higher education expenses',
      category: 'templates',
      type: 'Excel Template',
      downloads: 1543,
      rating: 4.6,
      language: 'English',
      icon: 'Calculator',
      featured: false
    },
    {
      id: 4,
      title: 'Stream Selection Guide for Class 10',
      description: 'Help your child choose between Science, Commerce, and Arts streams',
      category: 'guides',
      type: 'PDF Guide',
      downloads: 3210,
      rating: 4.9,
      language: 'English, Hindi, Bengali',
      icon: 'Compass',
      featured: true
    },
    {
      id: 5,
      title: 'Supporting Your Child\'s Career Journey',
      description: 'Video series on effective parenting strategies for career guidance',
      category: 'videos',
      type: 'Video Series',
      downloads: 987,
      rating: 4.5,
      language: 'English, Hindi',
      icon: 'Play',
      featured: false
    }
  ];

  const educatorResources = [
    {
      id: 1,
      title: 'Classroom Career Guidance Curriculum',
      description: '12-week structured program for integrating career guidance into regular classes',
      category: 'guides',
      type: 'Curriculum Guide',
      downloads: 1876,
      rating: 4.8,
      language: 'English',
      icon: 'BookOpen',
      featured: true
    },
    {
      id: 2,
      title: 'Group Assessment Activities',
      description: 'Interactive exercises for conducting career assessments with entire classes',
      category: 'worksheets',
      type: 'Activity Pack',
      downloads: 2134,
      rating: 4.7,
      language: 'English, Hindi',
      icon: 'Users',
      featured: true
    },
    {
      id: 3,
      title: 'Parent-Teacher Conference Templates',
      description: 'Ready-to-use templates for discussing student career progress with parents',
      category: 'templates',
      type: 'Document Templates',
      downloads: 1432,
      rating: 4.6,
      language: 'English, Hindi',
      icon: 'FileText',
      featured: false
    },
    {
      id: 4,
      title: 'Career Fair Organization Kit',
      description: 'Complete guide to organizing successful career fairs in schools',
      category: 'guides',
      type: 'Organization Kit',
      downloads: 876,
      rating: 4.5,
      language: 'English',
      icon: 'Calendar',
      featured: false
    },
    {
      id: 5,
      title: 'Digital Career Counseling Presentation',
      description: 'Modern, engaging slides covering contemporary career options',
      category: 'presentations',
      type: 'PowerPoint',
      downloads: 2987,
      rating: 4.9,
      language: 'English, Hindi',
      icon: 'Presentation',
      featured: true
    }
  ];

  const resources = userType === 'parent' ? parentResources : educatorResources;

  const filteredResources = resources?.filter(resource => {
    const matchesSearch = resource?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         resource?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResources = resources?.filter(resource => resource?.featured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Resource Library
        </h2>
        <p className="text-text-secondary">
          {userType === 'parent' ?'Comprehensive resources to help you support your child\'s career journey' :'Professional tools and materials to enhance your career guidance capabilities'
          }
        </p>
      </div>
      {/* Search and Filters */}
      <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          <Button variant="default" iconName="Search" iconPosition="left">
            Search
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:bg-muted/80 hover:text-text-primary'
              }`}
            >
              {category?.name} ({category?.count})
            </button>
          ))}
        </div>
      </div>
      {/* Featured Resources */}
      {selectedCategory === 'all' && (
        <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Featured Resources</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredResources?.map((resource) => (
              <div key={resource?.id} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-elevation-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name={resource?.icon} size={20} className="text-primary" />
                  </div>
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                    Featured
                  </span>
                </div>
                <h4 className="font-semibold text-text-primary mb-2">{resource?.title}</h4>
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">{resource?.description}</p>
                <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
                  <span>{resource?.type}</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                    <span>{resource?.rating}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" fullWidth iconName="Download" iconPosition="left">
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* All Resources */}
      <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            All Resources ({filteredResources?.length})
          </h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Filter" size={16} />
            <span>Sort by: Most Downloaded</span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredResources?.map((resource) => (
            <div key={resource?.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-200">
              <div className="p-3 bg-muted rounded-lg">
                <Icon name={resource?.icon} size={24} className="text-text-secondary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-text-primary">{resource?.title}</h4>
                  {resource?.featured && (
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium ml-2">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary mb-3">{resource?.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="FileText" size={12} />
                    <span>{resource?.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Download" size={12} />
                    <span>{resource?.downloads} downloads</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                    <span>{resource?.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Globe" size={12} />
                    <span>{resource?.language}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button variant="default" size="sm" iconName="Download" iconPosition="left">
                  Download
                </Button>
                <Button variant="ghost" size="sm" iconName="Eye" iconPosition="left">
                  Preview
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredResources?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">No resources found</h4>
            <p className="text-text-secondary">Try adjusting your search terms or category filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;