import React, { useEffect } from 'react';

import FooterSection from './components/FooterSection';
import Header from '../../components/ui/Header';
import { Helmet } from 'react-helmet';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import StatsSection from './components/StatsSection';
import SuccessStoriesSection from './components/SuccessStoriesSection';
import TrustIndicatorsSection from './components/TrustIndicatorsSection';

const HomepageEducationalTechnologyPlatform = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>ShikshaPath  - Empowered Choices, Limitless Futures | Career Guidance Platform</title>
        <meta 
          name="description" 
          content="India's #1 AI-powered career guidance platform. Get personalized stream recommendations, college intelligence, and expert counseling. Democratizing quality career guidance for every Indian student." 
        />
        <meta 
          name="keywords" 
          content="career guidance, stream selection, college admission, career counseling, education technology, Indian students, ShikshaPath , AI career guidance" 
        />
        <meta name="author" content="ShikshaPath " />
        <meta property="og:title" content="ShikshaPath  - Taleem Se Tarakki Tak Starts Here" />
        <meta 
          property="og:description" 
          content="Empowering Indian students with AI-driven career guidance and personalized educational pathways. Join 50,000+ students who found their perfect career path." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shikshapath.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ShikshaPath  - Career Guidance Platform" />
        <meta 
          name="twitter:description" 
          content="India's most trusted career guidance platform. Get personalized recommendations and expert support for your educational journey." 
        />
        <link rel="canonical" href="https://shikshapath.in" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Real-time Statistics */}
          <StatsSection />

          {/* How It Works */}
          <HowItWorksSection />

          {/* Success Stories */}
          <SuccessStoriesSection />

          {/* Trust Indicators */}
          <TrustIndicatorsSection />
        </main>

        {/* Footer */}
        <FooterSection />

    
      </div>
    </>
  );
};

export default HomepageEducationalTechnologyPlatform;