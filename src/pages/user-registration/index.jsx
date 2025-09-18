import React, { useState } from 'react';

import BenefitsSection from './components/BenefitsSection';
import Header from 'components/ui/Header';
import Icon from '../../components/AppIcon';
import { Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import RegistrationProgress from './components/RegistrationProgress';
import SuccessModal from './components/SuccessModal';

const UserRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleRegistrationSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration data:', formData);
      setRegisteredEmail(formData?.email);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error - show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header/>
      {/* Main Content */}
      <main className="py-16 px-16 my-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Registration Form */}
          <div className="space-y-8">
            {/* Progress Indicator */}
            <RegistrationProgress currentStep={1} totalSteps={3} />

            {/* Registration Form */}
            <div className="bg-card border border-border rounded-lg shadow-soft p-6 lg:p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Start Your Career Journey
                </h1>
                <p className="text-muted-foreground">
                  Create your account to get personalized career guidance and college recommendations
                </p>
              </div>

              <RegistrationForm 
                onSubmit={handleRegistrationSubmit}
                isLoading={isLoading}
              />
            </div>

            {/* Additional Info */}
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">
                    Why do we need this information?
                  </p>
                  <p className="text-muted-foreground">
                    Your academic background and location help us provide personalized college recommendations 
                    and career guidance tailored specifically to your situation and goals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="lg:sticky lg:top-8">
            <BenefitsSection />
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Icon name="Navigation" size={14} color="white" />
                </div>
                <span className="font-semibold text-foreground">ShikshaPath</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Guiding students towards their perfect career path through personalized recommendations and expert guidance.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/user-login" className="hover:text-foreground transition-smooth">Sign In</Link></li>
                <li><Link to="/aptitude-assessment-quiz" className="hover:text-foreground transition-smooth">Take Assessment</Link></li>
                <li><Link to="/stream-exploration" className="hover:text-foreground transition-smooth">Explore Streams</Link></li>
                <li><Link to="/college-comparison" className="hover:text-foreground transition-smooth">Compare Colleges</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-smooth">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-smooth">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-foreground mb-3">Connect</h3>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-smooth">
                  <Icon name="Facebook" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-smooth">
                  <Icon name="Twitter" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-smooth">
                  <Icon name="Instagram" size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} ShikshaPath. All rights reserved. | Empowering students to make informed career decisions.
            </p>
          </div>
        </div>
      </footer>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        userEmail={registeredEmail}
      />
    </div>
  );
};

export default UserRegistration;