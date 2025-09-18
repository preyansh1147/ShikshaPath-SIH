import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustIndicatorsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const partnerships = [
    {
      name: 'Ministry of Education',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      type: 'Government Partnership',
      description: 'Official recognition and support from India\'s education ministry'
    },
    {
      name: 'CBSE Board',
      logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      type: 'Educational Board',
      description: 'Endorsed by Central Board of Secondary Education'
    },
    {
      name: 'UGC Recognition',
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      type: 'Higher Education',
      description: 'University Grants Commission approved platform'
    },
    {
      name: 'AICTE Collaboration',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      type: 'Technical Education',
      description: 'All India Council for Technical Education partner'
    }
  ];

  const certifications = [
    {
      title: 'ISO 27001 Certified',
      icon: 'Shield',
      description: 'International standard for information security management',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'GDPR Compliant',
      icon: 'Lock',
      description: 'Full compliance with data protection regulations',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'SSL Encrypted',
      icon: 'ShieldCheck',
      description: '256-bit encryption for all data transmission',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'SOC 2 Audited',
      icon: 'FileCheck',
      description: 'Regular security and availability audits',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const mediaRecognition = [
    {
      outlet: 'The Times of India',
      headline: 'ShikshaPath  Revolutionizes Career Guidance in India',
      date: '2024-08-15',
      category: 'Education Technology'
    },
    {
      outlet: 'Economic Times',
      headline: 'Startup Making Quality Career Counseling Accessible',
      date: '2024-07-22',
      category: 'Startup News'
    },
    {
      outlet: 'India Today',
      headline: 'AI-Powered Platform Helps Students Make Better Choices',
      date: '2024-06-10',
      category: 'Technology'
    },
    {
      outlet: 'Hindustan Times',
      headline: 'Bridging the Career Guidance Gap in Rural India',
      date: '2024-05-28',
      category: 'Social Impact'
    }
  ];

  const awards = [
    {
      title: 'Best EdTech Innovation 2024',
      organization: 'India Education Awards',
      icon: 'Trophy',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Social Impact Award',
      organization: 'Digital India Summit',
      icon: 'Award',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Startup of the Year',
      organization: 'TechCrunch India',
      icon: 'Star',
      color: 'from-purple-500 to-pink-600'
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

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cultural-pattern opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success/10 rounded-full text-success text-sm font-medium mb-4">
            <Icon name="ShieldCheck" size={16} className="mr-2" />
            Trusted & Verified
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Backed by Trust & Excellence
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            ShikshaPath  is recognized and trusted by government bodies, educational institutions, 
            and media outlets across India for our commitment to quality and security.
          </p>
        </div>

        {/* Government Partnerships */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">Government Partnerships</h3>
            <p className="text-text-secondary">Official recognition and collaboration with Indian education authorities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerships?.map((partner, index) => (
              <div
                key={index}
                className={`bg-surface rounded-2xl p-6 border border-border hover:shadow-elevation-3 transition-all duration-300 hover:scale-105 ${
                  isVisible ? `opacity-100 translate-y-0 delay-${index * 100}` : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden bg-muted">
                    <Image
                      src={partner?.logo}
                      alt={partner?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-text-primary mb-1">{partner?.name}</h4>
                  <p className="text-xs text-primary font-medium mb-2">{partner?.type}</p>
                  <p className="text-sm text-text-secondary">{partner?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Certifications */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">Security & Compliance</h3>
            <p className="text-text-secondary">Your data is protected with industry-leading security standards</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div
                key={index}
                className={`bg-surface rounded-2xl p-6 border border-border hover:shadow-elevation-3 transition-all duration-300 hover:scale-105 ${
                  isVisible ? `opacity-100 translate-y-0 delay-${index * 100}` : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${cert?.color} flex items-center justify-center`}>
                    <Icon name={cert?.icon} size={24} color="white" />
                  </div>
                  <h4 className="font-bold text-text-primary mb-2">{cert?.title}</h4>
                  <p className="text-sm text-text-secondary">{cert?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">Awards & Recognition</h3>
            <p className="text-text-secondary">Honored for innovation and impact in education technology</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards?.map((award, index) => (
              <div
                key={index}
                className={`bg-surface rounded-2xl p-8 border border-border hover:shadow-elevation-3 transition-all duration-300 hover:scale-105 ${
                  isVisible ? `opacity-100 translate-y-0 delay-${index * 150}` : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${award?.color} flex items-center justify-center shadow-elevation-2`}>
                    <Icon name={award?.icon} size={28} color="white" />
                  </div>
                  <h4 className="font-bold text-text-primary text-lg mb-2">{award?.title}</h4>
                  <p className="text-text-secondary">{award?.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Coverage */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">Media Coverage</h3>
            <p className="text-text-secondary">Featured in leading publications for our impact on Indian education</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaRecognition?.map((media, index) => (
              <div
                key={index}
                className={`bg-surface rounded-2xl p-6 border border-border hover:shadow-elevation-2 transition-all duration-300 ${
                  isVisible ? `opacity-100 translate-y-0 delay-${index * 100}` : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Newspaper" size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-primary text-sm">{media?.outlet}</h4>
                      <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded-full">
                        {media?.category}
                      </span>
                    </div>
                    <h5 className="font-semibold text-text-primary mb-2 leading-tight">
                      {media?.headline}
                    </h5>
                    <p className="text-sm text-text-secondary">
                      Published on {new Date(media.date)?.toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Stats */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 border border-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-text-secondary">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">256-bit</div>
              <div className="text-text-secondary">SSL Encryption</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-text-secondary">Security Monitoring</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">GDPR</div>
              <div className="text-text-secondary">Compliant Platform</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;