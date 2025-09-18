import Icon from '../../../components/AppIcon';
import React from 'react';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Data Encryption',
      description: 'All your personal information is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Authentication',
      description: 'Multi-factor authentication and secure password requirements'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protection',
      description: 'Your data is never shared with third parties without your consent'
    },
    {
      icon: 'Server',
      title: 'Secure Storage',
      description: 'Data stored in certified secure servers with regular backups'
    }
  ];

  const trustSignals = [
    {
      icon: 'Award',
      text: 'Government Certified Platform'
    },
    {
      icon: 'CheckCircle',
      text: 'ISO 27001 Compliant'
    },
    {
      icon: 'Users',
      text: 'Trusted by 50,000+ Students'
    },
    {
      icon: 'Globe',
      text: 'Available Across India'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Security Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="ShieldCheck" size={32} className="text-success" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          Your Security is Our Priority
        </h3>
        <p className="text-muted-foreground">
          We use industry-leading security measures to protect your personal information
        </p>
      </div>
      {/* Security Features */}
      <div className="space-y-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-card border border-border rounded-lg"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={feature?.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Trust Signals */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-large text-foreground mb-3 text-center">
          Trusted & Certified
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {trustSignals?.map((signal, index) => (
            <div key={index} className="flex items-center space-x-2 justify-center">
              <Icon name={signal?.icon} size={16} className="text-success" />
              <span className="text-sm text-foreground">{signal?.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;