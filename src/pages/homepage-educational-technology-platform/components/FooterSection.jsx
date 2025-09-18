import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Link } from 'react-router-dom';
import React from 'react';

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Career Discovery', path: '/career-discovery-portal' },
      { name: 'College Intelligence', path: '/college-intelligence-dashboard' },
      { name: 'Personal Guidance', path: '/personal-guidance-center' },
      { name: 'Resource Hub', path: '/resource-timeline-hub' },
      { name: 'Parent Portal', path: '/parent-educator-portal' }
    ],
    resources: [
      { name: 'Assessment Tests', path: '/career-discovery-portal' },
      { name: 'College Database', path: '/college-intelligence-dashboard' },
      { name: 'Scholarship Guide', path: '/resource-timeline-hub' },
      { name: 'Study Materials', path: '/resource-timeline-hub' },
      { name: 'Success Stories', path: '/homepage-educational-technology-platform' }
    ],
    support: [
      { name: 'Help Center', path: '/personal-guidance-center' },
      { name: 'Expert Counselors', path: '/personal-guidance-center' },
      { name: 'Community Forum', path: '/personal-guidance-center' },
      { name: 'Contact Us', path: '/personal-guidance-center' },
      { name: 'Live Chat', path: '/personal-guidance-center' }
    ],
    company: [
      { name: 'About ShikshaPath ', path: '/homepage-educational-technology-platform' },
      { name: 'Our Mission', path: '/homepage-educational-technology-platform' },
      { name: 'Privacy Policy', path: '/homepage-educational-technology-platform' },
      { name: 'Terms of Service', path: '/homepage-educational-technology-platform' },
      { name: 'Careers', path: '/homepage-educational-technology-platform' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/shikshapath' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/shikshpathpro' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/shikshapath' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/shikshapath' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com/shikshapath' }
  ];

  const contactInfo = [
    {
      icon: 'Phone',
      title: 'Call Us',
      details: '+91 1800-123-4567',
      subtitle: 'Toll-free support'
    },
    {
      icon: 'Mail',
      title: 'Email Us',
      details: 'support@pathfinderpro.in',
      subtitle: '24/7 email support'
    },
    {
      icon: 'MapPin',
      title: 'Visit Us',
      details: 'Bangalore, Karnataka',
      subtitle: 'India'
    }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'bn', name: 'বাংলা' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 cultural-pattern opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-elevation-2">
                    <Icon name="Navigation" size={24} color="white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Sparkles" size={8} color="white" strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-inter tracking-tight">ShikshaPath </h3>
                  <p className="text-sm text-white/70">Taleem Se Tarakki Tak</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Empowering Indian students with AI-driven career guidance and personalized educational pathways. 
                Making quality counseling accessible to every student, everywhere.
              </p>

              {/* Newsletter Signup */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Stay Updated</h4>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Send"
                    className="bg-primary hover:bg-primary/90"
                  />
                </div>
                <p className="text-xs text-white/60">
                  Get career tips, college updates, and scholarship alerts
                </p>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Platform Links */}
                <div>
                  <h4 className="font-semibold text-white mb-4 flex items-center">
                    <Icon name="Compass" size={16} className="mr-2" />
                    Platform
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks?.platform?.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link?.path}
                          className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources Links */}
                <div>
                  <h4 className="font-semibold text-white mb-4 flex items-center">
                    <Icon name="BookOpen" size={16} className="mr-2" />
                    Resources
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks?.resources?.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link?.path}
                          className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support Links */}
                <div>
                  <h4 className="font-semibold text-white mb-4 flex items-center">
                    <Icon name="HeadphonesIcon" size={16} className="mr-2" />
                    Support
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks?.support?.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link?.path}
                          className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company Links */}
                <div>
                  <h4 className="font-semibold text-white mb-4 flex items-center">
                    <Icon name="Building" size={16} className="mr-2" />
                    Company
                  </h4>
                  <ul className="space-y-3">
                    {footerLinks?.company?.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link?.path}
                          className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="py-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo?.map((contact, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Icon name={contact?.icon} size={18} className="text-primary" />
                </div>
                <div>
                  <h5 className="font-medium text-white text-sm">{contact?.title}</h5>
                  <p className="text-white/80 text-sm">{contact?.details}</p>
                  <p className="text-white/60 text-xs">{contact?.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-white/70 text-sm">Follow us:</span>
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={16} />
                </a>
              ))}
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-white/70 text-sm">Language:</span>
              <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                {languages?.map((lang) => (
                  <option key={lang?.code} value={lang?.code} className="text-text-primary">
                    {lang?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Copyright */}
            <div className="text-center lg:text-right">
              <p className="text-white/70 text-sm">
                © {currentYear} ShikshaPath . All rights reserved.
              </p>
              <p className="text-white/60 text-xs mt-1">
                Made with ❤️ for Indian students
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center space-x-6 text-center">
            <div className="flex items-center space-x-2 text-white/60 text-xs">
              <Icon name="Shield" size={14} />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60 text-xs">
              <Icon name="Lock" size={14} />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60 text-xs">
              <Icon name="Award" size={14} />
              <span>Government Recognized</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60 text-xs">
              <Icon name="Users" size={14} />
              <span>50,000+ Students Served</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;