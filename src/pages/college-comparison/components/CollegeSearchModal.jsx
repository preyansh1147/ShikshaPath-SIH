import React, { useEffect, useState } from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CollegeSearchModal = ({ isOpen, onClose, onAddCollege, selectedColleges }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    state: '',
    type: '',
    course: ''
  });
  const [filteredColleges, setFilteredColleges] = useState([]);

  // Mock college data
const allColleges = [
    {
      id: 'college-1',
      name: 'St. Stephen’s College, Delhi University',
      location: 'New Delhi, Delhi',
      type: 'Government College',
      established: 1881,
      rating: 4.6,
      reviews: 1200,
      logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800',
      cutoff: { general: 97.0, obc: 95.0, sc: 90.0, st: 85.0 },
      fees: { tuition: 42000, hostel: 60000, other: 5000 },
      facilities: ['Library', 'Hostel', 'Labs', 'WiFi'],
      courses: { undergraduate: ['B.A.', 'B.Sc', 'B.Com'], postgraduate: [] },
      state: 'Delhi'
    },
    {
      id: 'college-2',
      name: 'Indian Institute of Technology, Bombay',
      location: 'Mumbai, Maharashtra',
      type: 'IIT',
      established: 1958,
      rating: 4.8,
      reviews: 3000,
      logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      cutoff: { general: 99.0, obc: 97.0, sc: 94.0, st: 90.0 },
      fees: { tuition: 210000, hostel: 35000, other: 20000 },
      facilities: ['Library', 'Labs', 'WiFi', 'Hostel', 'Innovation Centers'],
      courses: { undergraduate: ['B.Tech'], postgraduate: ['M.Tech', 'PhD'] },
      state: 'Maharashtra'
    },
    {
      id: 'college-3',
      name: 'Presidency University',
      location: 'Kolkata, West Bengal',
      type: 'State University',
      established: 1817,
      rating: 4.2,
      reviews: 800,
      logo: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800',
      cutoff: { general: 92.0, obc: 90.0, sc: 85.0, st: 80.0 },
      fees: { tuition: 15000, hostel: 20000, other: 5000 },
      facilities: ['Library', 'Labs', 'WiFi', 'Hostel'],
      courses: { undergraduate: ['B.A.', 'B.Sc'], postgraduate: ['M.A.', 'M.Sc'] },
      state: 'West Bengal'
    },
    {
      id: 'college-4',
      name: 'Christ University',
      location: 'Bengaluru, Karnataka',
      type: 'Private University',
      established: 1969,
      rating: 4.5,
      reviews: 1500,
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
      cutoff: { general: 85.0, obc: 80.0, sc: 75.0, st: 70.0 },
      fees: { tuition: 180000, hostel: 90000, other: 10000 },
      facilities: ['Library', 'Hostel', 'Labs', 'WiFi', 'Sports Complex'],
      courses: { undergraduate: ['BBA', 'B.Com', 'B.A.'], postgraduate: ['MBA'] },
      state: 'Karnataka'
    },
    {
      id: 'college-5',
      name: 'Banaras Hindu University (BHU)',
      location: 'Varanasi, Uttar Pradesh',
      type: 'Central University',
      established: 1916,
      rating: 4.7,
      reviews: 2000,
      logo: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
      cutoff: { general: 90.0, obc: 87.0, sc: 83.0, st: 80.0 },
      fees: { tuition: 12000, hostel: 15000, other: 5000 },
      facilities: ['Library', 'Hostel', 'Labs', 'Hospital', 'WiFi'],
      courses: { undergraduate: ['B.Sc', 'B.A.', 'B.Com'], postgraduate: ['MBBS'] },
      state: 'Uttar Pradesh'
    },
    {
      id: 'college-6',
      name: 'Indian Institute of Science (IISc)',
      location: 'Bengaluru, Karnataka',
      type: 'Deemed University',
      established: 1909,
      rating: 4.9,
      reviews: 1800,
      logo: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800',
      cutoff: { general: 98.0, obc: 96.0, sc: 93.0, st: 90.0 },
      fees: { tuition: 25000, hostel: 20000, other: 10000 },
      facilities: ['Library', 'Labs', 'Research Centers', 'Hostel', 'WiFi'],
      courses: { undergraduate: ['B.Sc (Research)'], postgraduate: ['M.Sc', 'PhD'] },
      state: 'Karnataka'
    },
    {
      id: 'college-7',
      name: 'Jawaharlal Nehru University (JNU)',
      location: 'New Delhi, Delhi',
      type: 'Central University',
      established: 1969,
      rating: 4.4,
      reviews: 900,
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
      cutoff: { general: 88.0, obc: 85.0, sc: 80.0, st: 75.0 },
      fees: { tuition: 4000, hostel: 6000, other: 2000 },
      facilities: ['Library', 'Hostel', 'Labs', 'WiFi'],
      courses: { undergraduate: ['B.A.'], postgraduate: ['M.A.', 'PhD'] },
      state: 'Delhi'
    },
    {
      id: 'college-8',
      name: 'Anna University',
      location: 'Chennai, Tamil Nadu',
      type: 'State University',
      established: 1978,
      rating: 4.3,
      reviews: 1400,
      logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      cutoff: { general: 94.0, obc: 91.0, sc: 87.0, st: 84.0 },
      fees: { tuition: 50000, hostel: 25000, other: 5000 },
      facilities: ['Library', 'Hostel', 'Labs', 'WiFi'],
      courses: { undergraduate: ['B.E.', 'B.Tech'], postgraduate: ['M.Tech', 'MBA'] },
      state: 'Tamil Nadu'
    },
    {
      id: 'college-9',
      name: 'Aligarh Muslim University (AMU)',
      location: 'Aligarh, Uttar Pradesh',
      type: 'Central University',
      established: 1920,
      rating: 4.4,
      reviews: 1000,
      logo: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800',
      cutoff: { general: 89.0, obc: 85.0, sc: 82.0, st: 78.0 },
      fees: { tuition: 28000, hostel: 15000, other: 5000 },
      facilities: ['Library', 'Hostel', 'Labs', 'Hospital'],
      courses: { undergraduate: ['B.A.', 'B.Sc', 'LLB'], postgraduate: ['MBBS'] },
      state: 'Uttar Pradesh'
    },
    {
      id: 'college-10',
      name: 'Indian Institute of Management Ahmedabad (IIMA)',
      location: 'Ahmedabad, Gujarat',
      type: 'IIM',
      established: 1961,
      rating: 4.9,
      reviews: 2500,
      logo: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
      cutoff: { general: 99.0, obc: 97.0, sc: 95.0, st: 90.0 },
      fees: { tuition: 2300000, hostel: 200000, other: 50000 },
      facilities: ['Library', 'Hostel', 'WiFi', 'Labs'],
      courses: { undergraduate: [], postgraduate: ['MBA', 'PGP', 'PhD'] },
      state: 'Gujarat'
    }
  ];

  const stateOptions = [
    { value: '', label: 'All States' },
    { value: 'Jammu & Kashmir', label: 'Jammu & Kashmir' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'West Bengal', label: 'West Bengal' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'Government College', label: 'Government College' },
    { value: 'Government Medical College', label: 'Government Medical College' },
    { value: 'Government Polytechnic', label: 'Government Polytechnic' },
    { value: 'Central University', label: 'Central University' },
    { value: 'State University', label: 'State University' },
    { value: 'Private University', label: 'Private University' },
    { value: 'Deemed University', label: 'Deemed University' }
  ];

  const courseOptions = [
    { value: '', label: 'All Courses' },
    { value: 'B.A.', label: 'Bachelor of Arts' },
    { value: 'B.Sc (Medical)', label: 'B.Sc (Medical)' },
    { value: 'B.Sc (Non-Medical)', label: 'B.Sc (Non-Medical)' },
    { value: 'B.Com.', label: 'Bachelor of Commerce' },
    { value: 'BCA', label: 'Bachelor of Computer Applications' },
    { value: 'MBBS', label: 'Bachelor of Medicine and Bachelor of Surgery' },
    { value: 'Nursing', label: 'Nursing' },
    { value: 'Paramedical', label: 'Paramedical' },
    { value: 'Diploma in Engineering', label: 'Diploma in Engineering' },
    { value: 'BBA', label: 'Bachelor of Business Administration' },
    { value: 'B.Tech', label: 'Bachelor of Technology' }
  ];

  useEffect(() => {
    let filtered = allColleges?.filter(college => {
      // Exclude already selected colleges
      if (selectedColleges?.some(selected => selected?.id === college?.id)) {
        return false;
      }

      // Search term filter
      if (searchTerm && !college?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
          !college?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase())) {
        return false;
      }

      // State filter
      if (filters?.state && college?.state !== filters?.state) {
        return false;
      }

      // Type filter
      if (filters?.type && college?.type !== filters?.type) {
        return false;
      }

      // Course filter
      if (filters?.course) {
        const hasUGCourse = college?.courses?.undergraduate?.includes(filters?.course);
        const hasPGCourse = college?.courses?.postgraduate?.includes(filters?.course);
        if (!hasUGCourse && !hasPGCourse) {
          return false;
        }
      }

      return true;
    });

    setFilteredColleges(filtered);
  }, [searchTerm, filters, selectedColleges]);

  const handleAddCollege = (college) => {
    onAddCollege(college);
    onClose();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      state: '',
      type: '',
      course: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Add College to Comparison</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Search and select colleges to compare (Maximum 4 colleges)
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <Input
                type="search"
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
              />
            </div>
            <Select
              placeholder="Select State"
              options={stateOptions}
              value={filters?.state}
              onChange={(value) => setFilters(prev => ({ ...prev, state: value }))}
            />
            <Select
              placeholder="Select Type"
              options={typeOptions}
              value={filters?.type}
              onChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
            />
            <Select
              placeholder="Select Course"
              options={courseOptions}
              value={filters?.course}
              onChange={(value) => setFilters(prev => ({ ...prev, course: value }))}
            />
          </div>
          
          {(searchTerm || filters?.state || filters?.type || filters?.course) && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-muted-foreground">
                {filteredColleges?.length} college{filteredColleges?.length !== 1 ? 's' : ''} found
              </span>
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                iconPosition="left"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {filteredColleges?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredColleges?.map((college) => (
                <div
                  key={college?.id}
                  className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth"
                >
                  <div className="flex items-start space-x-3">
                    <Image
                      src={college?.logo}
                      alt={college?.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm mb-1">
                        {college?.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {college?.location} • {college?.type}
                      </p>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-warning fill-current" />
                          <span className="text-xs font-medium">{college?.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{college?.reviews}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Est. {college?.established}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs">
                          <span className="text-muted-foreground">Cutoff: </span>
                          <span className="font-medium text-primary">{college?.cutoff?.general}%</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Plus"
                          iconPosition="left"
                          onClick={() => handleAddCollege(college)}
                          disabled={selectedColleges?.length >= 4}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Colleges Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <span className="text-sm text-muted-foreground">
            {selectedColleges?.length}/4 colleges selected for comparison
          </span>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollegeSearchModal;