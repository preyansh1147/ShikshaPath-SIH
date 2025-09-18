import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VirtualTourModal = ({ college, isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState('campus');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !college) return null;

  const tourSections = [
    {
      id: 'campus',
      name: 'Campus Overview',
      icon: 'Building',
      description: 'Explore the main campus and facilities'
    },
    {
      id: 'library',
      name: 'Library',
      icon: 'BookOpen',
      description: 'State-of-the-art library with digital resources'
    },
    {
      id: 'labs',
      name: 'Laboratories',
      icon: 'Microscope',
      description: 'Modern labs and research facilities'
    },
    {
      id: 'hostel',
      name: 'Hostel',
      icon: 'Home',
      description: 'Student accommodation and dining facilities'
    },
    {
      id: 'sports',
      name: 'Sports Complex',
      icon: 'Trophy',
      description: 'Sports facilities and recreational areas'
    }
  ];

  const tourContent = {
    campus: {
      images: [
        'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
        'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800'
      ],
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      highlights: [
        'Sprawling 150-acre campus with modern architecture',
        'Green spaces and landscaped gardens throughout',
        'Central plaza for student gatherings and events',
        'Accessible pathways and infrastructure'
      ]
    },
    library: {
      images: [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800'
      ],
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      highlights: [
        '24/7 access with over 2 lakh books and journals',
        'Digital library with online databases and e-resources',
        'Silent study areas and group discussion rooms',
        'Modern computer lab with high-speed internet'
      ]
    },
    labs: {
      images: [
        'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800',
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
        'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800'
      ],
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      highlights: [
        'State-of-the-art equipment for all engineering streams',
        'Research labs with industry-standard instruments',
        'Computer labs with latest software and hardware',
        'Safety protocols and trained technical staff'
      ]
    },
    hostel: {
      images: [
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
      ],
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      highlights: [
        'Separate hostels for boys and girls with 24/7 security',
        'AC and non-AC rooms with modern amenities',
        'Hygienic mess with nutritious vegetarian meals',
        'Common rooms, Wi-Fi, and recreational facilities'
      ]
    },
    sports: {
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
        'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
      ],
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      highlights: [
        'Multi-purpose indoor stadium for various sports',
        'Olympic-size swimming pool with trained lifeguards',
        'Cricket ground, football field, and tennis courts',
        'Gymnasium with modern fitness equipment'
      ]
    }
  };

  const currentContent = tourContent?.[currentView];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === currentContent?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentContent?.images?.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-6xl max-h-[90vh] bg-white rounded-xl shadow-elevation-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Video" size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Virtual Tour</h2>
              <p className="text-sm text-text-secondary">{college?.name}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-80 border-r border-border bg-muted/20 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-4">Tour Sections</h3>
              <div className="space-y-2">
                {tourSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => {
                      setCurrentView(section?.id);
                      setCurrentImageIndex(0);
                      setIsPlaying(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      currentView === section?.id
                        ? 'bg-primary text-primary-foreground shadow-elevation-1'
                        : 'hover:bg-muted text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={section?.icon} size={18} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{section?.name}</div>
                        <div className={`text-xs ${
                          currentView === section?.id 
                            ? 'text-primary-foreground/80' 
                            : 'text-text-secondary'
                        }`}>
                          {section?.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Student Guide */}
              <div className="mt-6 p-4 bg-white rounded-lg border border-border">
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                    alt="Student Guide"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-sm text-text-primary">Priya Sharma</div>
                    <div className="text-xs text-text-secondary">Final Year, CSE</div>
                  </div>
                </div>
                <p className="text-xs text-text-secondary mb-3">
                  "Hi! I'm your virtual guide. I'll show you around our amazing campus and share my experiences as a student here."
                </p>
                <Button
                  variant="outline"
                  size="xs"
                  fullWidth
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Chat with Guide
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={tourSections?.find(s => s?.id === currentView)?.icon} 
                    size={24} 
                    className="text-primary" 
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {tourSections?.find(s => s?.id === currentView)?.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {tourSections?.find(s => s?.id === currentView)?.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Camera"
                    iconPosition="left"
                  >
                    360° View
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    iconName={isPlaying ? "Pause" : "Play"}
                    iconPosition="left"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? 'Pause' : 'Play'} Video
                  </Button>
                </div>
              </div>

              {/* Media Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={currentContent?.images?.[currentImageIndex]}
                      alt={`${currentView} view ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
                    >
                      <Icon name="ChevronRight" size={16} />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                      {currentImageIndex + 1} / {currentContent?.images?.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="flex space-x-2">
                    {currentContent?.images?.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'border-primary' :'border-transparent hover:border-border'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video Player */}
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-black">
                    {isPlaying ? (
                      <iframe
                        src={currentContent?.video}
                        title={`${currentView} video tour`}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Button
                          variant="default"
                          size="lg"
                          iconName="Play"
                          iconPosition="left"
                          onClick={() => setIsPlaying(true)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Play Video Tour
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium text-text-primary mb-2">Video Highlights</h4>
                    <ul className="space-y-1">
                      {currentContent?.highlights?.map((highlight, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                          <Icon name="Check" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h4 className="font-medium text-text-primary mb-4 flex items-center">
                  <Icon name="Map" size={18} className="mr-2" />
                  Campus Map & Location
                </h4>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title={college?.name}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${college?.coordinates?.lat || 28.6139},${college?.coordinates?.lng || 77.2090}&z=14&output=embed`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;