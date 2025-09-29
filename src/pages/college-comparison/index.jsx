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
    },
    {
      id: 'college-4',
      name: 'St. Xavier\'s College, Mumbai',
      location: 'Mumbai, Maharashtra',
      type: 'Autonomous College',
      established: 1869,
      rating: 4.5,
      reviews: 2150,
      logo: 'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 92.0, obc: 90.0, sc: 88.0, st: 85.0 },
      fees: { tuition: 25000, hostel: 60000, other: 5000 },
      facilities: ['Library', 'Auditorium', 'Cafeteria', 'WiFi'],
      placement: {
        percentage: 65,
        average_package: 5.5,
        highest_package: 10.0,
        top_recruiters: ['Deloitte', 'EY', 'Google']
      },
      courses: {
        undergraduate: ['B.A.', 'B.Com', 'B.Sc'],
        postgraduate: ['M.A.', 'M.Com', 'M.Sc']
      },
      naac_grade: 'A+',
      affiliation: 'University of Mumbai',
      state: 'Maharashtra'
    },
    {
      id: 'college-5',
      name: 'Presidency University, Kolkata',
      location: 'Kolkata, West Bengal',
      type: 'State University',
      established: 1817,
      rating: 4.2,
      reviews: 1300,
      logo: 'https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 88.0, obc: 85.0, sc: 80.0, st: 78.0 },
      fees: { tuition: 12000, hostel: 30000, other: 2000 },
      facilities: ['Library', 'Labs', 'WiFi', 'Canteen'],
      placement: {
        percentage: 50,
        average_package: 4.2,
        highest_package: 8.0,
        top_recruiters: ['Infosys', 'Wipro', 'TCS']
      },
      courses: {
        undergraduate: ['B.A.', 'B.Sc (Hons)'],
        postgraduate: ['M.A.', 'M.Sc']
      },
      naac_grade: 'A',
      affiliation: 'State University',
      state: 'West Bengal'
    },
    {
      id: 'college-6',
      name: 'Christ University, Bangalore',
      location: 'Bangalore, Karnataka',
      type: 'Private University',
      established: 1969,
      rating: 4.3,
      reviews: 1800,
      logo: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 85.0, obc: 82.0, sc: 78.0, st: 75.0 },
      fees: { tuition: 120000, hostel: 50000, other: 15000 },
      facilities: ['Library', 'Auditorium', 'WiFi', 'Hostel'],
      placement: {
        percentage: 70,
        average_package: 6.0,
        highest_package: 12.0,
        top_recruiters: ['Deloitte', 'Amazon', 'KPMG']
      },
      courses: {
        undergraduate: ['BBA', 'B.Com', 'BA (Hons)', 'B.Sc'],
        postgraduate: ['MBA', 'M.Com', 'MA']
      },
      naac_grade: 'A+',
      affiliation: 'Deemed University',
      state: 'Karnataka'
    },
    {
      id: 'college-7',
      name: 'Fergusson College, Pune',
      location: 'Pune, Maharashtra',
      type: 'Autonomous College',
      established: 1885,
      rating: 4.4,
      reviews: 1400,
      logo: 'https://images.pexels.com/photos/2893675/pexels-photo-2893675.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 90.0, obc: 88.0, sc: 85.0, st: 80.0 },
      fees: { tuition: 18000, hostel: 40000, other: 5000 },
      facilities: ['Library', 'Sports Complex', 'WiFi', 'Canteen'],
      placement: {
        percentage: 60,
        average_package: 4.0,
        highest_package: 9.0,
        top_recruiters: ['Infosys', 'TCS', 'Capgemini']
      },
      courses: {
        undergraduate: ['B.Sc', 'B.A.', 'B.Com'],
        postgraduate: ['M.Sc', 'M.A.']
      },
      naac_grade: 'A',
      affiliation: 'Savitribai Phule Pune University',
      state: 'Maharashtra'
    },
    {
      id: 'college-8',
      name: 'Loyola College, Chennai',
      location: 'Chennai, Tamil Nadu',
      type: 'Autonomous College',
      established: 1925,
      rating: 4.6,
      reviews: 1600,
      logo: 'https://images.pexels.com/photos/2893555/pexels-photo-2893555.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 91.0, obc: 88.0, sc: 85.0, st: 82.0 },
      fees: { tuition: 30000, hostel: 40000, other: 10000 },
      facilities: ['Library', 'Auditorium', 'WiFi', 'Hostel'],
      placement: {
        percentage: 80,
        average_package: 5.0,
        highest_package: 11.0,
        top_recruiters: ['Wipro', 'Accenture', 'Cognizant']
      },
      courses: {
        undergraduate: ['B.Com', 'B.Sc', 'B.A.'],
        postgraduate: ['M.Com', 'M.Sc', 'M.A.']
      },
      naac_grade: 'A++',
      affiliation: 'University of Madras',
      state: 'Tamil Nadu'
    },
    {
      id: 'college-9',
      name: 'Miranda House, Delhi University',
      location: 'New Delhi, Delhi NCR',
      type: 'Women’s College',
      established: 1948,
      rating: 4.7,
      reviews: 1950,
      logo: 'https://images.pexels.com/photos/2893550/pexels-photo-2893550.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 95.0, obc: 93.0, sc: 90.0, st: 88.0 },
      fees: { tuition: 17000, hostel: 50000, other: 2000 },
      facilities: ['Library', 'Labs', 'WiFi', 'Auditorium'],
      placement: {
        percentage: 75,
        average_package: 5.5,
        highest_package: 13.0,
        top_recruiters: ['Big 4', 'NGOs', 'Consultancies']
      },
      courses: {
        undergraduate: ['B.A. (Hons)', 'B.Sc (Hons)'],
        postgraduate: ['M.A.', 'M.Sc']
      },
      naac_grade: 'A++',
      affiliation: 'University of Delhi',
      state: 'Delhi'
    },
    {
      id: 'college-10',
      name: 'National College, Trichy',
      location: 'Tiruchirapalli, Tamil Nadu',
      type: 'Autonomous College',
      established: 1919,
      rating: 4.0,
      reviews: 950,
      logo: 'https://images.pexels.com/photos/2893601/pexels-photo-2893601.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 80.0, obc: 78.0, sc: 75.0, st: 72.0 },
      fees: { tuition: 10000, hostel: 25000, other: 3000 },
      facilities: ['Library', 'Hostel', 'WiFi'],
      placement: {
        percentage: 55,
        average_package: 3.5,
        highest_package: 6.5,
        top_recruiters: ['IT Services', 'Manufacturing Firms']
      },
      courses: {
        undergraduate: ['B.Sc', 'B.A.', 'B.Com'],
        postgraduate: ['M.Sc', 'M.A.', 'M.Com']
      },
      naac_grade: 'A',
      affiliation: 'Bharathidasan University',
      state: 'Tamil Nadu'
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