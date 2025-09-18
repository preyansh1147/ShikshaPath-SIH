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
      id: 'college-5',
      name: 'Government Degree College, Jammu',
      location: 'Jammu, Jammu & Kashmir',
      type: 'Government College',
      established: 1980,
      rating: 3.6,
      reviews: 169,
      logo: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 60.0, obc: 58.0, sc: 55.0, st: 52.0 },
      fees: { tuition: 7000, hostel: 0, other: 0 },
      facilities: ['Library', 'Labs', 'WiFi'],
      courses: {
        undergraduate: ['B.Sc (Medical)', 'B.Sc (Non-Medical)', 'B.A.', 'B.Com'],
        postgraduate: []
      },
      state: 'Jammu & Kashmir'
    },
    {
      id: 'college-6',
      name: 'Government Degree College, Kathua',
      location: 'Kathua, Jammu & Kashmir',
      type: 'Government College',
      established: 1985,
      rating: 3.9,
      reviews: 610,
      logo: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 58.0, obc: 56.0, sc: 53.0, st: 50.0 },
      fees: { tuition: 7000, hostel: 24000, other: 0 },
      facilities: ['Library', 'Hostel', 'Labs', 'WiFi'],
      courses: {
        undergraduate: ['B.Sc (Medical)', 'B.Sc (Non-Medical)', 'B.A.', 'B.Com'],
        postgraduate: []
      },
      state: 'Jammu & Kashmir'
    },
    {
      id: 'college-7',
      name: 'Government Degree College, Poonch',
      location: 'Poonch, Jammu & Kashmir',
      type: 'Government College',
      established: 1990,
      rating: 3.0,
      reviews: 50,
      logo: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 55.0, obc: 53.0, sc: 50.0, st: 48.0 },
      fees: { tuition: 7020, hostel: 20000, other: 0 },
      facilities: ['Library', 'Hostel', 'Labs', 'WiFi'],
      courses: {
        undergraduate: ['B.Sc (Medical)', 'B.Sc (Non-Medical)', 'B.A.', 'B.Com', 'BCA'],
        postgraduate: []
      },
      state: 'Jammu & Kashmir'
    },
    {
      id: 'college-8',
      name: 'Government Degree College, Rajouri',
      location: 'Rajouri, Jammu & Kashmir',
      type: 'Government College',
      established: 1988,
      rating: 3.8,
      reviews: 1,
      logo: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 57.0, obc: 55.0, sc: 52.0, st: 50.0 },
      fees: { tuition: 7000, hostel: 20000, other: 0 },
      facilities: ['Library', 'Hostel', 'Labs', 'WiFi'],
      courses: {
        undergraduate: ['B.Sc (Medical)', 'B.Sc (Non-Medical)', 'B.A.', 'B.Com'],
        postgraduate: []
      },
      state: 'Jammu & Kashmir'
    },
    {
      id: 'college-9',
      name: 'Government Medical College, Rajouri',
      location: 'Rajouri, Jammu & Kashmir',
      type: 'Government Medical College',
      established: 2019,
      rating: 3.8,
      reviews: 1,
      logo: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 75.0, obc: 73.0, sc: 70.0, st: 68.0 },
      fees: { tuition: 26250, hostel: 3500, other: 5000 },
      facilities: ['Library', 'Hostel', 'Hospital', 'Labs', 'WiFi', 'Research Centers'],
      courses: {
        undergraduate: ['MBBS', 'Nursing', 'Paramedical'],
        postgraduate: ['MD', 'MS', 'M.Sc Nursing']
      },
      state: 'Jammu & Kashmir'
    },
    {
      id: 'college-10',
      name: 'Government Polytechnic College, Udhampur',
      location: 'Udhampur, Jammu & Kashmir',
      type: 'Government Polytechnic',
      established: 1995,
      rating: 4.0,
      reviews: 34,
      logo: 'https://images.pexels.com/photos/1581091226825-a6a2a5aee158.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 50.0, obc: 48.0, sc: 45.0, st: 43.0 },
      fees: { tuition: 2130, hostel: 0, other: 0 },
      facilities: ['Library', 'Labs', 'WiFi', 'Workshop'],
      courses: {
        undergraduate: ['Diploma in Engineering (Various branches)'],
        postgraduate: []
      },
      state: 'Jammu & Kashmir'
    },
    {
      id: 'college-11',
      name: 'Government Degree College for Boys, Anantnag',
      location: 'Anantnag, Jammu & Kashmir',
      type: 'Government College',
      established: 1987,
      rating: 3.9,
      reviews: 88,
      logo: 'https://images.pexels.com/photos/1571260899304-425eee4c7efc.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 56.0, obc: 54.0, sc: 51.0, st: 49.0 },
      fees: { tuition: 6000, hostel: 20000, other: 0 },
      facilities: ['Library', 'Hostel', 'Labs', 'WiFi'],
      courses: {
        undergraduate: ['B.Sc (Medical)', 'B.Sc (Non-Medical)', 'B.A.', 'B.Com'],
        postgraduate: []
      },
      state: 'Jammu & Kashmir'
    },
    {
      id: 'college-12',
      name: 'Government Degree College for Boys, Udhampur',
      location: 'Udhampur, Jammu & Kashmir',
      type: 'Government College',
      established: 1982,
      rating: 3.5,
      reviews: 11,
      logo: 'https://images.pexels.com/photos/1580582932707-520aed937b7b.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 62.0, obc: 60.0, sc: 57.0, st: 55.0 },
      fees: { tuition: 20000, hostel: 25000, other: 0 },
      facilities: ['Library', 'Hostel', 'Labs', 'WiFi'],
      courses: {
        undergraduate: ['B.Sc (Medical)', 'B.Sc (Non-Medical)', 'B.A.', 'B.Com'],
        postgraduate: []
      },
      state: 'Jammu & Kashmir'
    },
    {
      id: 'college-13',
      name: 'Government Degree College, Mendhar (Poonch)',
      location: 'Mendhar, Poonch, Jammu & Kashmir',
      type: 'Government College',
      established: 1992,
      rating: 3.2,
      reviews: 0,
      logo: 'https://images.pexels.com/photos/1523050854058-8df90110c9d1.jpeg?auto=compress&cs=tinysrgb&w=400',
      cutoff: { general: 54.0, obc: 52.0, sc: 49.0, st: 47.0 },
      fees: { tuition: 6000, hostel: 0, other: 0 },
      facilities: ['Library', 'Labs', 'WiFi'],
      courses: {
        undergraduate: ['B.Sc (Medical)', 'B.Sc (Non-Medical)', 'B.A.', 'B.Com'],
        postgraduate: []
      },
      state: 'Jammu & Kashmir'
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