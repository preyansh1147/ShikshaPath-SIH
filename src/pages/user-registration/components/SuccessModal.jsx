import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessModal = ({ isOpen, onClose, userEmail }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleContinue = () => {
    onClose();
    navigate('/aptitude-assessment-quiz');
  };

  const handleGoToLogin = () => {
    onClose();
    navigate('/user-login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-elevated max-w-md w-full p-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Account Created Successfully!
          </h2>
          
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Welcome to ShikshaPath! We've sent a verification email to:
            </p>
            <p className="font-medium text-foreground bg-muted px-3 py-2 rounded-md">
              {userEmail}
            </p>
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-start space-x-2">
              <Icon name="Mail" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">
                  Check your email
                </p>
                <p className="text-xs text-muted-foreground">
                  Click the verification link to activate your account
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="Clock" size={16} className="text-warning mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">
                  Link expires in 24 hours
                </p>
                <p className="text-xs text-muted-foreground">
                  Don't forget to verify within 24 hours
                </p>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>
              Didn't receive the email? Check your spam folder or 
              <button className="text-primary hover:underline ml-1">
                resend verification email
              </button>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            variant="default"
            size="lg"
            onClick={handleContinue}
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
            className="sm:flex-1"
          >
            Continue to Assessment
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleGoToLogin}
            className="sm:w-auto"
          >
            Go to Sign In
          </Button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-smooth rounded-md hover:bg-muted"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;