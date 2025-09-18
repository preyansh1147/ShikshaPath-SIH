import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CollegeDetailsModal = ({ college, isOpen, onClose, onCompare, onVirtualTour }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !college) return null;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'Info' },
    { id: 'courses', name: 'Courses & Fees', icon: 'BookOpen' },
    { id: 'admissions', name: 'Admissions', icon: 'FileText' },
    { id: 'placements', name: 'Placements', icon: 'TrendingUp' },
    { id: 'facilities', name: 'Facilities', icon: 'Building' },
    { id: 'reviews', name: 'Reviews', icon: 'MessageSquare' }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}
      />
    ));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative h-64 rounded-lg overflow-hidden">
        <Image
          src={college?.image}
          alt={college?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-bold mb-2">{college?.name}</h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Icon name="MapPin" size={16} className="mr-1" />
              {college?.location}
            </div>
            <div className="flex items-center">
              <Icon name="Calendar" size={16} className="mr-1" />
              Est. {college?.established}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-primary">₹{college?.fees?.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Annual Fees</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-accent">{college?.placement}%</div>
          <div className="text-sm text-text-secondary">Placement Rate</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-secondary">{college?.rating}</div>
          <div className="text-sm text-text-secondary">Rating</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-professional">1:{college?.facultyRatio}</div>
          <div className="text-sm text-text-secondary">Faculty Ratio</div>
        </div>
      </div>

      {/* About */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">About the College</h3>
        <p className="text-text-secondary leading-relaxed">
          {college?.description || `${college?.name} is a prestigious institution known for its academic excellence and industry connections. The college offers a wide range of undergraduate and postgraduate programs with state-of-the-art facilities and experienced faculty. With a strong focus on practical learning and research, students are well-prepared for successful careers in their chosen fields.`}
        </p>
      </div>

      {/* Key Highlights */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">Key Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Award" size={16} className="text-primary" />
              <span className="text-sm">NAAC A+ Accredited</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm">5000+ Active Students</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="BookOpen" size={16} className="text-primary" />
              <span className="text-sm">50+ Academic Programs</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Building" size={16} className="text-primary" />
              <span className="text-sm">Modern Infrastructure</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Wifi" size={16} className="text-primary" />
              <span className="text-sm">Campus-wide WiFi</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Home" size={16} className="text-primary" />
              <span className="text-sm">{college?.hostel ? 'Hostel Available' : 'Day Scholar Only'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Available Courses</h3>
        <div className="space-y-4">
          {college?.courseDetails?.map((course, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-text-primary">{course?.name}</h4>
                <span className="text-lg font-semibold text-primary">₹{course?.fees?.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-text-secondary">
                <div>
                  <span className="font-medium">Duration:</span> {course?.duration}
                </div>
                <div>
                  <span className="font-medium">Seats:</span> {course?.seats}
                </div>
                <div>
                  <span className="font-medium">Eligibility:</span> {course?.eligibility}
                </div>
                <div>
                  <span className="font-medium">Cut-off:</span> {course?.cutoff}%
                </div>
              </div>
            </div>
          )) || (
            <div className="space-y-4">
              {college?.courses?.map((course, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-text-primary">{course}</h4>
                    <span className="text-lg font-semibold text-primary">₹{college?.fees?.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAdmissions = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Admission Process</h3>
        <div className="space-y-4">
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Important Dates</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-text-secondary">Application Start:</span>
                <span className="ml-2">March 15, 2025</span>
              </div>
              <div>
                <span className="font-medium text-text-secondary">Application End:</span>
                <span className="ml-2">June 30, 2025</span>
              </div>
              <div>
                <span className="font-medium text-text-secondary">Entrance Exam:</span>
                <span className="ml-2">July 15, 2025</span>
              </div>
              <div>
                <span className="font-medium text-text-secondary">Result Declaration:</span>
                <span className="ml-2">August 1, 2025</span>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Required Documents</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                '10th Mark Sheet', '12th Mark Sheet', 'Transfer Certificate', 'Character Certificate',
                'Caste Certificate (if applicable)', 'Income Certificate', 'Passport Size Photos', 'Aadhar Card'
              ]?.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Icon name="FileText" size={14} className="text-primary" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Quota-wise Cut-offs (Previous Year)</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm font-medium">General</span>
                <span className="text-sm font-semibold text-primary">{college?.cutoff}%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm font-medium">OBC</span>
                <span className="text-sm font-semibold text-primary">{college?.cutoff - 5}%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm font-medium">SC/ST</span>
                <span className="text-sm font-semibold text-primary">{college?.cutoff - 10}%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium">EWS</span>
                <span className="text-sm font-semibold text-primary">{college?.cutoff - 2}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlacements = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{college?.placement}%</div>
          <div className="text-sm text-text-secondary">Placement Rate</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">₹{college?.averagePackage || '6.5'}L</div>
          <div className="text-sm text-text-secondary">Average Package</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">₹{college?.highestPackage || '25'}L</div>
          <div className="text-sm text-text-secondary">Highest Package</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Top Recruiting Companies</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(college?.topCompanies || [
            'TCS', 'Infosys', 'Wipro', 'Accenture', 'IBM', 'Microsoft', 'Amazon', 'Google'
          ])?.map((company, index) => (
            <div key={index} className="text-center p-3 border border-border rounded-lg">
              <div className="font-medium text-sm text-text-primary">{company}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Placement Trends</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-sm font-medium">2023-24</span>
            <span className="text-sm font-semibold text-primary">{college?.placement}% placed</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-sm font-medium">2022-23</span>
            <span className="text-sm font-semibold text-primary">{college?.placement - 2}% placed</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-sm font-medium">2021-22</span>
            <span className="text-sm font-semibold text-primary">{college?.placement - 5}% placed</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFacilities = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Academic Facilities</h3>
          <div className="space-y-3">
            {[
              { name: 'Central Library', icon: 'BookOpen', description: '24/7 access with 2L+ books' },
              { name: 'Computer Labs', icon: 'Monitor', description: 'Latest hardware & software' },
              { name: 'Research Labs', icon: 'Microscope', description: 'State-of-the-art equipment' },
              { name: 'Auditorium', icon: 'Users', description: '1000+ seating capacity' }
            ]?.map((facility, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                <Icon name={facility?.icon} size={20} className="text-primary mt-1" />
                <div>
                  <div className="font-medium text-text-primary">{facility?.name}</div>
                  <div className="text-sm text-text-secondary">{facility?.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Student Facilities</h3>
          <div className="space-y-3">
            {[
              { name: 'Hostel', icon: 'Home', description: college?.hostel ? 'AC & Non-AC rooms available' : 'Not available' },
              { name: 'Cafeteria', icon: 'Coffee', description: 'Hygienic food & beverages' },
              { name: 'Sports Complex', icon: 'Trophy', description: 'Indoor & outdoor sports' },
              { name: 'Medical Center', icon: 'Heart', description: '24/7 medical assistance' }
            ]?.map((facility, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                <Icon name={facility?.icon} size={20} className="text-primary mt-1" />
                <div>
                  <div className="font-medium text-text-primary">{facility?.name}</div>
                  <div className="text-sm text-text-secondary">{facility?.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Student Reviews</h3>
        <div className="flex items-center space-x-2">
          <div className="flex">{renderStars(college?.rating)}</div>
          <span className="text-sm font-medium">{college?.rating} out of 5</span>
        </div>
      </div>

      <div className="space-y-4">
        {[
          {
            name: 'Rahul Sharma',
            course: 'B.Tech CSE, 2023',
            rating: 5,
            review: 'Excellent college with great faculty and placement opportunities. The infrastructure is modern and the campus life is vibrant.',
            date: '2 months ago'
          },
          {
            name: 'Priya Patel',
            course: 'B.Tech ECE, 2022',
            rating: 4,
            review: 'Good college overall. Faculty is knowledgeable and helpful. Could improve on hostel facilities.',
            date: '4 months ago'
          },
          {
            name: 'Amit Kumar',
            course: 'MBA, 2024',
            rating: 5,
            review: 'Amazing placement record and industry connections. The practical approach to learning is commendable.',
            date: '1 month ago'
          }
        ]?.map((review, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {review?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-text-primary">{review?.name}</div>
                  <div className="text-sm text-text-secondary">{review?.course}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex">{renderStars(review?.rating)}</div>
                <div className="text-xs text-text-secondary mt-1">{review?.date}</div>
              </div>
            </div>
            <p className="text-sm text-text-secondary">{review?.review}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
        >
          Write a Review
        </Button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'courses': return renderCourses();
      case 'admissions': return renderAdmissions();
      case 'placements': return renderPlacements();
      case 'facilities': return renderFacilities();
      case 'reviews': return renderReviews();
      default: return renderOverview();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-elevation-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Image
              src={college?.image}
              alt={college?.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{college?.name}</h2>
              <p className="text-sm text-text-secondary">{college?.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => onCompare(college)}
            >
              Compare
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Video"
              iconPosition="left"
              onClick={() => onVirtualTour(college)}
              className="bg-secondary hover:bg-secondary/90"
            >
              Virtual Tour
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CollegeDetailsModal;