import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Mock credentials for demo
  const mockCredentials = {
    student: { email: "student@shikshapath.com", password: "student123" },
    parent: { email: "parent@shikshapath.com", password: "parent123" },
    // counselor: { email: "counselor@shikshapath.com", password: "counselor123" }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (isLocked) {
      setErrors({ general: 'Account temporarily locked. Please try again in 15 minutes.' });
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (isValidCredentials) {
        // Store login state
        if (formData?.rememberMe) {
          localStorage.setItem('shikshaPath_rememberMe', 'true');
          localStorage.setItem('shikshaPath_userEmail', formData?.email);
        }
        localStorage.setItem('shikshaPath_isAuthenticated', 'true');
        localStorage.setItem('shikshaPath_loginTime', new Date()?.toISOString());

        // Navigate to dashboard
        if(formData?.email === mockCredentials?.student?.email) {
          localStorage.setItem('shikshaPath_userType', 'student');
          navigate('/user-dashboard');
        } else if(formData?.email === mockCredentials?.parent?.email) {
          localStorage.setItem('shikshaPath_userType', 'parent');
          navigate('/parent-educator-portal');
        } 

      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        if (newAttempts >= 5) {
          setIsLocked(true);
          setErrors({ 
            general: 'Too many failed attempts. Account locked for 15 minutes.' 
          });
        } else {
          setErrors({ 
            general: `Invalid email or password. ${5 - newAttempts} attempts remaining.\n\nDemo Credentials:\nStudent: student@shikshapath.com / student123\nParent: parent@shikshapath.com / parent123\nCounselor: counselor@shikshapath.com / counselor123` 
          });
        }
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would trigger password reset flow
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-soft p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="User" size={24} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to access your personalized career guidance
          </p>
        </div>

        {/* Error Message */}
        {errors?.general && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
              <div className="text-sm text-error whitespace-pre-line">
                {errors?.general}
              </div>
            </div>
          </div>
        )}

        {/* Rate Limiting Warning */}
        {loginAttempts > 2 && !isLocked && (
          <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-warning" />
              <span className="text-sm text-warning">
                Security Notice: {5 - loginAttempts} attempts remaining
              </span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLocked}
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLocked}
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              disabled={isLocked}
              size="sm"
            />

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
              disabled={isLocked}
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLocked}
            iconName="LogIn"
            iconPosition="left"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Social Login Options */}
        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            iconName="Mail"
            iconPosition="left"
            disabled={isLocked}
            onClick={() => alert('Google Sign-In would be integrated here')}
          >
            Continue with Google
          </Button>

          <Button
            variant="outline"
            fullWidth
            iconName="Smartphone"
            iconPosition="left"
            disabled={isLocked}
            onClick={() => alert('Phone Sign-In would be integrated here')}
          >
            Continue with Phone
          </Button>
        </div>

        {/* Registration Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/user-registration"
              className="text-primary hover:text-primary/80 font-medium transition-smooth"
            >
              Create Account
            </Link>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Get personalized career guidance and college recommendations
          </p>
        </div>
      </div>
      {/* Security Notice */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          <Icon name="Shield" size={12} className="inline mr-1" />
          Your data is protected with industry-standard encryption
        </p>
      </div>
    </div>
  );
};

export default LoginForm;