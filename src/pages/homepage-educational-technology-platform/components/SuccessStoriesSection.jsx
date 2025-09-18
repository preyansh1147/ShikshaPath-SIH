import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SuccessStoriesSection = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef(null);

  const successStories = [
    {
      id: 1,
      name: 'Priya Sharma',
      age: 18,
      location: 'Jaipur, Rajasthan',
      previousPath: 'Confused about stream selection after Class 10',
      currentPath: 'Computer Science Engineering at IIT Delhi',
      story: `I was completely lost after Class 10. My parents wanted me to take Science, but I wasn't sure if I had the aptitude for it. ShikshaPath 's assessment revealed my strong logical thinking and problem-solving skills. The platform guided me through the entire journey - from choosing PCM to preparing for JEE. Today, I'm living my dream at IIT Delhi!`,achievement: 'JEE Advanced Rank 247',image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',videoThumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',category: 'Engineering',
      timelineSteps: [
        'Took aptitude assessment','Chose Science stream','Started JEE preparation','Got expert mentoring','Secured IIT Delhi admission'
      ]
    },
    {
      id: 2,
      name: 'Arjun Patel',age: 19,location: 'Ahmedabad, Gujarat',previousPath: 'Wanted engineering but discovered passion for design',currentPath: 'Product Design at National Institute of Design',story: `Everyone expected me to become an engineer like my father. But ShikshaPath 's career exploration opened my eyes to design thinking. The platform showed me how creativity and technology could merge. The counselors helped me convince my family, and now I'm pursuing my true passion at NID.`,achievement: 'NID Entrance Rank 12',image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',videoThumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',category: 'Design',
      timelineSteps: [
        'Explored career options','Discovered design aptitude','Built portfolio with guidance','Family counseling sessions','Secured NID admission'
      ]
    },
    {
      id: 3,
      name: 'Meera Krishnan',age: 17,location: 'Chennai, Tamil Nadu',previousPath: 'Rural background with limited career awareness',currentPath: 'MBBS at Government Medical College',story: `Coming from a small village, I had no idea about career options beyond basic jobs. ShikshaPath 's multilingual support in Tamil helped me understand various possibilities. The scholarship guidance was invaluable - I secured a full scholarship for my medical studies. This platform truly democratizes career guidance.`,
      achievement: 'NEET Score 680/720',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      videoThumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      category: 'Medical',
      timelineSteps: [
        'Used Tamil language support',
        'Discovered medical aptitude',
        'NEET preparation guidance',
        'Scholarship application help',
        'Secured medical college seat'
      ]
    },
    {
      id: 4,
      name: 'Rohit Singh',
      age: 18,
      location: 'Lucknow, Uttar Pradesh',
      previousPath: 'Interested in business but lacked direction',
      currentPath: 'BBA at Shaheed Sukhdev College of Business Studies',
      story: `I knew I wanted to do business, but didn't know where to start. ShikshaPath 's commerce stream guidance and college intelligence helped me find the perfect BBA program. The platform's industry insights and alumni connections gave me clarity about my future entrepreneurial journey.`,achievement: 'DU Cutoff 98.5%',image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',videoThumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',category: 'Business',
      timelineSteps: [
        'Explored commerce options','Identified business aptitude','College comparison analysis','Application strategy planning','Secured top college admission'
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef?.current) {
      observer?.observe(sectionRef?.current);
    }

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !isPlaying) {
      const interval = setInterval(() => {
        setActiveStory((prev) => (prev + 1) % successStories?.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [isVisible, isPlaying, successStories?.length]);

  const currentStory = successStories?.[activeStory];

  const getCategoryColor = (category) => {
    const colors = {
      Engineering: 'from-blue-500 to-indigo-600',
      Design: 'from-purple-500 to-pink-600',
      Medical: 'from-green-500 to-emerald-600',
      Business: 'from-orange-500 to-red-600'
    };
    return colors?.[category] || 'from-gray-500 to-gray-600';
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
    // In a real implementation, this would open a video modal
    console.log('Playing video for:', currentStory?.name);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cultural-pattern opacity-20"></div>
      <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-success/20 to-accent/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-secondary/20 to-warning/20 rounded-full blur-2xl"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success/10 rounded-full text-success text-sm font-medium mb-4">
            <Icon name="Star" size={16} className="mr-2" />
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Dreams Turned Into Reality
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Meet students who transformed their confusion into clarity and achieved their educational goals with ShikshaPath 
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Cards Navigation */}
          <div className="space-y-4">
            {successStories?.map((story, index) => (
              <div
                key={story?.id}
                className={`cursor-pointer transition-all duration-500 ${
                  activeStory === index ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setActiveStory(index)}
              >
                <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeStory === index
                    ? 'border-primary bg-primary/5 shadow-elevation-3'
                    : 'border-border bg-surface hover:border-primary/30 hover:shadow-elevation-2'
                }`}>
                  <div className="flex items-center space-x-4">
                    {/* Profile Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-elevation-2">
                        <Image
                          src={story?.image}
                          alt={story?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${getCategoryColor(story?.category)} flex items-center justify-center`}>
                        <Icon name="Award" size={12} color="white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-bold text-lg ${
                          activeStory === index ? 'text-primary' : 'text-text-primary'
                        }`}>
                          {story?.name}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activeStory === index ? 'bg-primary/20 text-primary' : 'bg-muted text-text-secondary'
                        }`}>
                          {story?.category}
                        </span>
                      </div>
                      
                      <p className="text-sm text-text-secondary mb-2">
                        {story?.location} • Age {story?.age}
                      </p>

                      <p className="text-sm text-text-secondary line-clamp-2">
                        {story?.currentPath}
                      </p>

                      <div className={`mt-2 text-xs font-medium ${
                        activeStory === index ? 'text-success' : 'text-text-secondary'
                      }`}>
                        🏆 {story?.achievement}
                      </div>
                    </div>

                    {/* Play Button */}
                    <div className={`flex-shrink-0 transition-all duration-300 ${
                      activeStory === index ? 'text-primary scale-110' : 'text-text-secondary'
                    }`}>
                      <Icon name="Play" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Story Details */}
          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-surface rounded-3xl overflow-hidden shadow-elevation-4 border border-border">
              {/* Video Thumbnail */}
              <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200">
                <Image
                  src={currentStory?.videoThumbnail}
                  alt={`${currentStory?.name} success story`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Play Button Overlay */}
                <button
                  onClick={handlePlayVideo}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-elevation-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon name="Play" size={24} className="text-primary ml-1" />
                  </div>
                </button>

                {/* Category Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(currentStory?.category)} text-white text-sm font-medium`}>
                  {currentStory?.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {currentStory?.name}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {currentStory?.location} • {currentStory?.currentPath}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 bg-success/10 rounded-full text-success text-sm font-medium">
                    <Icon name="Trophy" size={14} className="mr-2" />
                    {currentStory?.achievement}
                  </div>
                </div>

                {/* Story */}
                <blockquote className="text-text-secondary leading-relaxed mb-6 italic">
                  "{currentStory?.story}"
                </blockquote>

                {/* Journey Timeline */}
                <div className="mb-6">
                  <h4 className="font-semibold text-text-primary mb-3">Journey Highlights:</h4>
                  <div className="space-y-2">
                    {currentStory?.timelineSteps?.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-text-secondary">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="default"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary"
                  >
                    Start Your Journey
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Users"
                    iconPosition="left"
                  >
                    More Stories
                  </Button>
                </div>
              </div>
            </div>

            {/* Story Navigation */}
            <div className="mt-6 flex justify-center space-x-2">
              {successStories?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStory(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeStory === index ? 'bg-primary scale-125' : 'bg-border hover:bg-primary/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;