import React, { useEffect, useState } from 'react';

import Button from '../../components/ui/Button';
import CollegeSearchModal from './components/CollegeSearchModal';
import ComparisonFilters from './components/ComparisonFilters';
import ComparisonSummary from './components/ComparisonSummary';
import ComparisonTable from './components/ComparisonTable';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import { Link } from 'react-router-dom';
import MobileComparisonView from './components/MobileComparisonView';

const CollegeComparison = () => {
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState({
    focus: 'all',
    sortBy: 'name',
    showOnlyDifferences: false,
    highlightBest: false,
    expandAll: false
  });

  // Mock initial colleges for demonstration
  const initialColleges = [
    {
      id: 'college-1',
      name: 'Government Degree College, Jammu',
      location: 'Jammu, Jammu & Kashmir',
      type: 'Government College',
      established: 1980,
      rating: 3.6,
      reviews: 169,
      logo: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 60.0, obc: 58.0, sc: 55.0, st: 52.0 },
      fees: { tuition: 7000, hostel: 0, other: 0 },
      facilities: ['Library', 'Labs', 'WiFi'],
      placement: { 
        percentage: 0, 
        average_package: 2.5, 
        highest_package: 4.0,
        top_recruiters: ['Local Government', 'Private Sector']
      },
      courses: {
        undergraduate: ['B.Sc (Medical)', 'B.Sc (Non-Medical)', 'B.A.', 'B.Com'],
        postgraduate: []
      },
      naac_grade: 'B',
      affiliation: 'University of Jammu',
      state: 'Jammu & Kashmir'
    },
    {
      id: 'college-2',
      name: 'Government Degree College, Kathua',
      location: 'Kathua, Jammu & Kashmir',
      type: 'Government College',
      established: 1985,
      rating: 3.9,
      reviews: 610,
      logo: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 58.0, obc: 56.0, sc: 53.0, st: 50.0 },
      fees: { tuition: 7000, hostel: 24000, other: 0 },
      facilities: ['Library', 'Hostel', 'Labs', 'WiFi'],
      placement: { 
        percentage: 45, 
        average_package: 2.8, 
        highest_package: 4.5,
        top_recruiters: ['Local Government', 'Private Sector']
      },
      courses: {
        undergraduate: ['B.Sc (Medical)', 'B.Sc (Non-Medical)', 'B.A.', 'B.Com'],
        postgraduate: []
      },
      naac_grade: 'B+',
      affiliation: 'University of Jammu',
      state: 'Jammu & Kashmir'
    },
    {
      id: 'college-3',
      name: 'Government Medical College, Rajouri',
      location: 'Rajouri, Jammu & Kashmir',
      type: 'Government Medical College',
      established: 2019,
      rating: 3.8,
      reviews: 1,
      logo: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 75.0, obc: 73.0, sc: 70.0, st: 68.0 },
      fees: { tuition: 26250, hostel: 3500, other: 5000 },
      facilities: ['Library', 'Hostel', 'Hospital', 'Labs', 'WiFi', 'Research Centers'],
      placement: { 
        percentage: 85, 
        average_package: 8.5, 
        highest_package: 15.0,
        top_recruiters: ['Government Hospitals', 'Private Hospitals']
      },
      courses: {
        undergraduate: ['MBBS', 'Nursing', 'Paramedical'],
        postgraduate: ['MD', 'MS', 'M.Sc Nursing']
      },
      naac_grade: 'A',
      affiliation: 'University of Jammu',
      state: 'Jammu & Kashmir'
    }
  ];

  useEffect(() => {
    // Initialize with sample colleges
    setSelectedColleges(initialColleges);

    // Check if mobile view
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAddCollege = (college) => {
    if (selectedColleges?.length < 4 && !selectedColleges?.find(c => c?.id === college?.id)) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  const handleRemoveCollege = (collegeId) => {
    setSelectedColleges(selectedColleges?.filter(c => c?.id !== collegeId));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      focus: 'all',
      sortBy: 'name',
      showOnlyDifferences: false,
      highlightBest: false,
      expandAll: false
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Icon name="GitCompare" size={32} className="text-primary" />
                <h1 className="text-3xl font-bold text-foreground">College Comparison</h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Compare multiple government colleges side-by-side to make informed admission decisions based on your preferences and priorities.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon name="Building2" size={20} className="text-primary" />
                  <span className="font-semibold text-foreground">{selectedColleges?.length}/4</span>
                </div>
                <p className="text-sm text-muted-foreground">Colleges Selected</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon name="Target" size={20} className="text-success" />
                  <span className="font-semibold text-foreground">
                    {selectedColleges?.length > 0 ? 'Active' : 'Ready'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Comparison Status</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon name="BarChart3" size={20} className="text-warning" />
                  <span className="font-semibold text-foreground">15+</span>
                </div>
                <p className="text-sm text-muted-foreground">Criteria Compared</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setIsSearchModalOpen(true)}
                disabled={selectedColleges?.length >= 4}
              >
                Add College
              </Button>
              
              {selectedColleges?.length > 0 && (
                <Button
                  variant="outline"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => setSelectedColleges([])}
                  className="text-error hover:text-error"
                >
                  Clear All
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Link to="/stream-exploration">
                <Button variant="ghost" iconName="ArrowLeft" iconPosition="left">
                  Back to Exploration
                </Button>
              </Link>
              <Link to="/user-dashboard">
                <Button variant="outline" iconName="Home" iconPosition="left">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Filters */}
          {selectedColleges?.length > 0 && (
            <div className="mb-6">
              <ComparisonFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters}
              />
            </div>
          )}

          {/* Comparison Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Comparison */}
            <div className="lg:col-span-2">
              {isMobile ? (
                <MobileComparisonView
                  colleges={selectedColleges}
                  onRemoveCollege={handleRemoveCollege}
                />
              ) : (
                <ComparisonTable
                  colleges={selectedColleges}
                  onRemoveCollege={handleRemoveCollege}
                  onExpandRow={() => {}} // Add missing required prop
                  filters={filters}
                />
              )}
            </div>

            {/* Summary Panel */}
            <div className="lg:col-span-1">
              <ComparisonSummary
                colleges={selectedColleges}
                userPreferences={{
                  priorities: ['fees', 'placement', 'location'],
                  budget: 50000,
                  preferredLocation: 'Jammu',
                  courseInterest: 'B.Tech',
                  careerGoals: ['Software Engineer', 'Data Scientist']
                }}
              />
            </div>
          </div>

          {/* Empty State */}
          {selectedColleges?.length === 0 && (
            <div className="text-center py-16">
              <Icon name="GitCompare" size={64} className="text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Start Your College Comparison
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Add colleges to compare their features, facilities, fees, and placement statistics side-by-side.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setIsSearchModalOpen(true)}
                >
                  Add Your First College
                </Button>
                <Link to="/stream-exploration">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Compass"
                    iconPosition="left"
                  >
                    Explore Colleges
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 bg-muted/30 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Icon name="HelpCircle" size={20} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">How to Use College Comparison</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Add up to 4 colleges using the "Add College" button</li>
                  <li>• Use filters to focus on specific criteria like academics or fees</li>
                  <li>• Expand rows for detailed information about each criterion</li>
                  <li>• Check the recommendation scores based on your preferences</li>
                  <li>• Export comparison reports for offline reference</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Search Modal */}
      <CollegeSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onAddCollege={handleAddCollege}
        selectedColleges={selectedColleges}
      />
    </div>
  );
};

export default CollegeComparison;