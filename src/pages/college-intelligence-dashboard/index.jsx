import React, { useEffect, useState } from 'react';

import AdmissionTracker from './components/AdmissionTracker';
import Button from '../../components/ui/Button';
import CollegeCard from './components/CollegeCard';
import CollegeDetailsModal from './components/CollegeDetailsModal';
import ComparisonTable from './components/ComparisonTable';
import FilterPanel from './components/FilterPanel';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import { Link } from 'react-router-dom';
import VirtualTourModal from './components/VirtualTourModal';

const CollegeIntelligenceDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeView, setActiveView] = useState('grid');
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showCollegeDetails, setShowCollegeDetails] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 28.6139, lng: 77.2090 });

  const [filters, setFilters] = useState({
    state: 'All States',
    courseType: '',
    maxFees: 100000,
    quota: '',
    hostel: false,
    minRating: 0,
    maxDistance: 100,
    placement: 0
  });

  // Mock college data
  const mockColleges = [
    {
      id: 1,
      name: "Government Degree College, Jammu",
      location: "Jammu, Jammu & Kashmir",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
      rating: 3.6,
      fees: 7000,
      placement: 0,
      cutoff: 60,
      distance: 5,
      quota: "General",
      hostel: false,
      facultyRatio: 15,
      established: 1980,
      courses: ["B.Sc (Medical)", "B.Sc (Non-Medical)", "B.A.", "B.Com"],
      topCompanies: ["Local Government", "Private Sector"],
      averagePackage: "2.5",
      highestPackage: "4.0",
      coordinates: { lat: 32.7266, lng: 74.8570 }
    },
    {
      id: 2,
      name: "Government Degree College, Kathua",
      location: "Kathua, Jammu & Kashmir",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
      rating: 3.9,
      fees: 7000,
      placement: 45,
      cutoff: 58,
      distance: 8,
      quota: "General",
      hostel: true,
      facultyRatio: 12,
      established: 1985,
      courses: ["B.Sc (Medical)", "B.Sc (Non-Medical)", "B.A.", "B.Com"],
      topCompanies: ["Local Government", "Private Sector"],
      averagePackage: "2.8",
      highestPackage: "4.5",
      coordinates: { lat: 32.3704, lng: 75.5207 }
    },
    {
      id: 3,
      name: "Government Degree College, Poonch",
      location: "Poonch, Jammu & Kashmir",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800",
      rating: 3.0,
      fees: 7020,
      placement: 0,
      cutoff: 55,
      distance: 12,
      quota: "General",
      hostel: true,
      facultyRatio: 18,
      established: 1990,
      courses: ["B.Sc (Medical)", "B.Sc (Non-Medical)", "B.A.", "B.Com", "BCA"],
      topCompanies: ["Local Government", "Private Sector"],
      averagePackage: "2.2",
      highestPackage: "3.5",
      coordinates: { lat: 33.7703, lng: 74.0921 }
    },
    {
      id: 4,
      name: "Government Degree College, Rajouri",
      location: "Rajouri, Jammu & Kashmir",
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800",
      rating: 3.8,
      fees: 7000,
      placement: 0,
      cutoff: 57,
      distance: 15,
      quota: "General",
      hostel: true,
      facultyRatio: 14,
      established: 1988,
      courses: ["B.Sc (Medical)", "B.Sc (Non-Medical)", "B.A.", "B.Com"],
      topCompanies: ["Local Government", "Private Sector"],
      averagePackage: "2.6",
      highestPackage: "4.2",
      coordinates: { lat: 33.3777, lng: 74.3159 }
    },
    {
      id: 5,
      name: "Government Degree College, Udhampur",
      location: "Udhampur, Jammu & Kashmir",
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800",
      rating: 3.5,
      fees: 20000,
      placement: 0,
      cutoff: 62,
      distance: 20,
      quota: "General",
      hostel: true,
      facultyRatio: 16,
      established: 1982,
      courses: ["B.Sc (Medical)", "B.Sc (Non-Medical)", "B.A.", "B.Com"],
      topCompanies: ["Local Government", "Private Sector"],
      averagePackage: "2.8",
      highestPackage: "4.8",
      coordinates: { lat: 32.9242, lng: 75.1416 }
    },
    {
      id: 6,
      name: "Government Medical College, Rajouri",
      location: "Rajouri, Jammu & Kashmir",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800",
      rating: 3.8,
      fees: 26250,
      placement: 85,
      cutoff: 75,
      distance: 15,
      quota: "General",
      hostel: true,
      facultyRatio: 8,
      established: 2019,
      courses: ["MBBS", "Nursing", "Paramedical"],
      topCompanies: ["Government Hospitals", "Private Hospitals"],
      averagePackage: "8.5",
      highestPackage: "15.0",
      coordinates: { lat: 33.3777, lng: 74.3159 }
    },
    {
      id: 7,
      name: "Government Polytechnic College, Udhampur",
      location: "Udhampur, Jammu & Kashmir",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
      rating: 4.0,
      fees: 2130,
      placement: 0,
      cutoff: 50,
      distance: 20,
      quota: "General",
      hostel: false,
      facultyRatio: 20,
      established: 1995,
      courses: ["Diploma in Engineering (Various branches)"],
      topCompanies: ["Local Industries", "Government Sector"],
      averagePackage: "2.0",
      highestPackage: "3.5",
      coordinates: { lat: 32.9242, lng: 75.1416 }
    },
    {
      id: 8,
      name: "Government Degree College for Boys, Anantnag",
      location: "Anantnag, Jammu & Kashmir",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800",
      rating: 3.9,
      fees: 6000,
      placement: 0,
      cutoff: 56,
      distance: 25,
      quota: "General",
      hostel: true,
      facultyRatio: 15,
      established: 1987,
      courses: ["B.Sc (Medical)", "B.Sc (Non-Medical)", "B.A.", "B.Com"],
      topCompanies: ["Local Government", "Private Sector"],
      averagePackage: "2.4",
      highestPackage: "4.0",
      coordinates: { lat: 33.7311, lng: 75.1508 }
    },
    {
      id: 9,
      name: "Government Degree College for Boys, Udhampur",
      location: "Udhampur, Jammu & Kashmir",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
      rating: 3.5,
      fees: 20000,
      placement: 0,
      cutoff: 62,
      distance: 20,
      quota: "General",
      hostel: true,
      facultyRatio: 16,
      established: 1982,
      courses: ["B.Sc (Medical)", "B.Sc (Non-Medical)", "B.A.", "B.Com"],
      topCompanies: ["Local Government", "Private Sector"],
      averagePackage: "2.8",
      highestPackage: "4.8",
      coordinates: { lat: 32.9242, lng: 75.1416 }
    },
    {
      id: 10,
      name: "Government Degree College, Mendhar (Poonch)",
      location: "Mendhar, Poonch, Jammu & Kashmir",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800",
      rating: 3.2,
      fees: 6000,
      placement: 0,
      cutoff: 54,
      distance: 18,
      quota: "General",
      hostel: false,
      facultyRatio: 18,
      established: 1992,
      courses: ["B.Sc (Medical)", "B.Sc (Non-Medical)", "B.A.", "B.Com"],
      topCompanies: ["Local Government", "Private Sector"],
      averagePackage: "2.1",
      highestPackage: "3.8",
      coordinates: { lat: 33.7703, lng: 74.0921 }
    }
  ];

// Mock application data - Jammu & Kashmir colleges
const mockApplications = [
    {
      id: 1,
      collegeName: "National Institute of Technology Srinagar",
      course: "B.Tech Computer Science",
      applicationId: "NITS2025001234",
      status: "submitted",
      deadline: "2025-06-30",
      submittedDate: "2025-03-15",
      applicationFee: 1200,
      nextStep: "Entrance Exam",
      priority: "high",
      documentsRequired: 8,
      documents: [
        { name: "10th Certificate", submitted: true },
        { name: "12th Certificate", submitted: true },
        { name: "JEE Scorecard", submitted: false },
        { name: "Category Certificate", submitted: true }
      ],
      lastUpdated: "2025-03-20T10:30:00Z",
      updateMessage: "Application successfully submitted. Entrance exam scheduled for July 15, 2025."
    },
    {
      id: 2,
      collegeName: "University of Kashmir",
      course: "MBA",
      applicationId: "KU2025005678",
      status: "accepted",
      deadline: "2025-07-15",
      submittedDate: "2025-04-01",
      applicationFee: 1000,
      nextStep: "Fee Payment",
      priority: "high",
      documentsRequired: 6,
      documents: [
        { name: "10th Certificate", submitted: true },
        { name: "12th Certificate", submitted: true },
        { name: "Graduation Marksheet", submitted: true },
        { name: "Domicile Certificate", submitted: true }
      ],
      confirmationDeadline: "2025-08-15",
      lastUpdated: "2025-03-18T14:20:00Z",
      updateMessage: "Congratulations! You have been selected. Please confirm your admission by paying the fees."
    },
    {
      id: 3,
      collegeName: "Islamic University of Science and Technology",
      course: "Mass Communication",
      applicationId: "IUST2025009876",
      status: "pending",
      deadline: "2025-07-01",
      submittedDate: "2025-03-10",
      applicationFee: 900,
      nextStep: "Document Verification",
      priority: "medium",
      documentsRequired: 7,
      documents: [
        { name: "10th Certificate", submitted: true },
        { name: "12th Certificate", submitted: true },
        { name: "Transfer Certificate", submitted: false },
        { name: "Character Certificate", submitted: false }
      ],
      lastUpdated: "2025-03-16T09:15:00Z",
      updateMessage: "Document verification in progress. Please submit pending documents."
    }
  ];
  

  const [filteredColleges, setFilteredColleges] = useState(mockColleges);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
        },
        (error) => {
          console.log('Location access denied, using default location');
        }
      );
    }
  }, []);

  useEffect(() => {
    // Filter colleges based on search and filters
    let filtered = mockColleges?.filter(college => {
      const matchesSearch = college?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           college?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           college?.courses?.some(course => course?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
      
      const matchesState = filters?.state === 'All States' || college?.location?.includes(filters?.state);
      const matchesCourse = !filters?.courseType || college?.courses?.some(course => 
        course?.toLowerCase()?.includes(filters?.courseType?.toLowerCase()));
      const matchesFees = college?.fees <= filters?.maxFees;
      const matchesQuota = !filters?.quota || college?.quota === filters?.quota;
      const matchesHostel = !filters?.hostel || college?.hostel;
      const matchesRating = college?.rating >= filters?.minRating;
      const matchesDistance = college?.distance <= filters?.maxDistance;
      const matchesPlacement = college?.placement >= filters?.placement;

      return matchesSearch && matchesState && matchesCourse && matchesFees && 
             matchesQuota && matchesHostel && matchesRating && matchesDistance && matchesPlacement;
    });

    // Sort by distance (nearest first)
    filtered?.sort((a, b) => a?.distance - b?.distance);
    
    setFilteredColleges(filtered);
  }, [searchQuery, filters]);

  const handleCompareCollege = (college) => {
    if (selectedColleges?.find(c => c?.id === college?.id)) {
      setSelectedColleges(selectedColleges?.filter(c => c?.id !== college?.id));
    } else if (selectedColleges?.length < 5) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  const handleRemoveFromComparison = (collegeId) => {
    setSelectedColleges(selectedColleges?.filter(c => c?.id !== collegeId));
  };

  const handleViewDetails = (college) => {
    setSelectedCollege(college);
    setShowCollegeDetails(true);
  };

  const handleVirtualTour = (college) => {
    setSelectedCollege(college);
    setShowVirtualTour(true);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      state: 'All States',
      courseType: '',
      maxFees: 100000,
      quota: '',
      hostel: false,
      minRating: 0,
      maxDistance: 100,
      placement: 0
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                College Intelligence Dashboard
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Discover the perfect college with our AI-powered platform. Compare institutions, track applications, 
                and make informed decisions with comprehensive data and virtual tours.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search colleges, courses, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white shadow-elevation-1"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-primary">{filteredColleges?.length}</div>
                <div className="text-sm text-text-secondary">Colleges Found</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-accent">{selectedColleges?.length}/5</div>
                <div className="text-sm text-text-secondary">In Comparison</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-secondary">₹{Math.min(...filteredColleges?.map(c => c?.fees))?.toLocaleString()}</div>
                <div className="text-sm text-text-secondary">Lowest Fees</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-professional">{Math.max(...filteredColleges?.map(c => c?.placement))}%</div>
                <div className="text-sm text-text-secondary">Best Placement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Action Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                iconName="Filter"
                iconPosition="left"
                onClick={() => setIsFilterOpen(true)}
              >
                Filters
              </Button>
              
              <div className="flex items-center space-x-2 bg-white rounded-lg border border-border p-1">
                <button
                  onClick={() => setActiveView('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    activeView === 'grid' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="Grid3X3" size={18} />
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    activeView === 'list' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="List" size={18} />
                </button>
              </div>

              <select
                className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                defaultValue="distance"
              >
                <option value="distance">Sort by Distance</option>
                <option value="fees">Sort by Fees</option>
                <option value="rating">Sort by Rating</option>
                <option value="placement">Sort by Placement</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              {selectedColleges?.length > 0 && (
                <Button
                  variant="outline"
                  iconName="GitCompare"
                  iconPosition="left"
                  onClick={() => setShowComparison(!showComparison)}
                >
                  Compare ({selectedColleges?.length})
                </Button>
              )}
              
              <Button
                variant="default"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => setShowTracker(!showTracker)}
                className="bg-secondary hover:bg-secondary/90"
              >
                Admission Tracker
              </Button>
            </div>
          </div>

          {/* Comparison Table */}
          {showComparison && selectedColleges?.length > 0 && (
            <div className="mb-8">
              <ComparisonTable
                colleges={selectedColleges}
                onRemoveCollege={handleRemoveFromComparison}
                onClose={() => setShowComparison(false)}
              />
            </div>
          )}

          {/* Admission Tracker */}
          {showTracker && (
            <div className="mb-8">
              <AdmissionTracker
                applications={mockApplications}
                onUpdateStatus={(id, status) => console.log('Update status:', id, status)}
                onAddDeadline={() => console.log('Add deadline')}
              />
            </div>
          )}

          {/* College Grid/List */}
          <div className={`${
            activeView === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-6'
          }`}>
            {filteredColleges?.map((college) => (
              <CollegeCard
                key={college?.id}
                college={college}
                onCompare={handleCompareCollege}
                isComparing={selectedColleges?.some(c => c?.id === college?.id)}
                onViewDetails={handleViewDetails}
                onVirtualTour={handleVirtualTour}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredColleges?.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">No colleges found</h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your search criteria or filters to find more colleges.
              </p>
              <Button
                variant="outline"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={() => {
                  setSearchQuery('');
                  handleClearFilters();
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredColleges?.length > 0 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                iconName="ChevronDown"
                iconPosition="right"
              >
                Load More Colleges
              </Button>
            </div>
          )}
        </div>

        {/* Quick Navigation */}
        <div className="bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
              Explore More Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Home', path: '/homepage-educational-technology-platform', icon: 'Home' },
                { name: 'Career Discovery', path: '/career-discovery-portal', icon: 'Compass' },
                { name: 'Personal Guidance', path: '/personal-guidance-center', icon: 'Users' },
                { name: 'Resources Hub', path: '/resource-timeline-hub', icon: 'BookOpen' },
                { name: 'Parent Portal', path: '/parent-educator-portal', icon: 'UserCheck' },
                { name: 'Success Stories', path: '#', icon: 'Trophy' }
              ]?.map((item, index) => (
                <Link
                  key={index}
                  to={item?.path}
                  className="flex flex-col items-center p-4 bg-white rounded-lg border border-border hover:shadow-elevation-2 transition-all duration-200 group"
                >
                  <Icon name={item?.icon} size={24} className="text-primary group-hover:scale-110 transition-transform duration-200 mb-2" />
                  <span className="text-sm font-medium text-text-primary text-center">{item?.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
      {/* Virtual Tour Modal */}
      <VirtualTourModal
        college={selectedCollege}
        isOpen={showVirtualTour}
        onClose={() => {
          setShowVirtualTour(false);
          setSelectedCollege(null);
        }}
      />
      {/* College Details Modal */}
      <CollegeDetailsModal
        college={selectedCollege}
        isOpen={showCollegeDetails}
        onClose={() => {
          setShowCollegeDetails(false);
          setSelectedCollege(null);
        }}
        onCompare={handleCompareCollege}
        onVirtualTour={handleVirtualTour}
      />
    </div>
  );
};

export default CollegeIntelligenceDashboard;