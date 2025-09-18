import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    academicLevel: '',
    currentStream: '',
    boardType: '',
    passingYear: '',
    percentage: '',
    state: '',
    district: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const academicLevelOptions = [
    { value: 'class10', label: 'Class 10 Completed' },
    { value: 'class12', label: 'Class 12 Completed' },
    { value: 'graduate', label: 'Graduate' }
  ];

  const streamOptions = [
    { value: 'science', label: 'Science' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'arts', label: 'Arts/Humanities' },
    { value: 'vocational', label: 'Vocational' }
  ];

  const boardOptions = [
    { value: 'cbse', label: 'CBSE' },
    { value: 'icse', label: 'ICSE' },
    { value: 'state', label: 'State Board' },
    { value: 'igcse', label: 'IGCSE' },
    { value: 'ib', label: 'International Baccalaureate' }
  ];

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date()?.getFullYear() - i;
    return { value: year?.toString(), label: year?.toString() };
  });

  const percentageOptions = [
    { value: '90-100', label: '90% - 100%' },
    { value: '80-89', label: '80% - 89%' },
    { value: '70-79', label: '70% - 79%' },
    { value: '60-69', label: '60% - 69%' },
    { value: '50-59', label: '50% - 59%' },
    { value: 'below-50', label: 'Below 50%' }
  ];

  const stateOptions = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'assam', label: 'Assam' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'goa', label: 'Goa' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
    { value: 'jharkhand', label: 'Jharkhand' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'sikkim', label: 'Sikkim' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'tripura', label: 'Tripura' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'uttarakhand', label: 'Uttarakhand' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'delhi', label: 'Delhi' }
  ];

  const districtOptions = [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'pune', label: 'Pune' },
    { value: 'nashik', label: 'Nashik' },
    { value: 'nagpur', label: 'Nagpur' },
    { value: 'aurangabad', label: 'Aurangabad' },
    { value: 'solapur', label: 'Solapur' },
    { value: 'kolhapur', label: 'Kolhapur' },
    { value: 'sangli', label: 'Sangli' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.academicLevel) {
      newErrors.academicLevel = 'Please select your academic level';
    }

    if (!formData?.boardType) {
      newErrors.boardType = 'Please select your board type';
    }

    if (!formData?.passingYear) {
      newErrors.passingYear = 'Please select your passing year';
    }

    if (!formData?.percentage) {
      newErrors.percentage = 'Please select your percentage range';
    }

    if (!formData?.state) {
      newErrors.state = 'Please select your state';
    }

    if (!formData?.district) {
      newErrors.district = 'Please select your district';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="User" size={20} className="mr-2 text-primary" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          description="We'll use this to send you important updates and notifications"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter your 10-digit mobile number"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              description="Minimum 8 characters required"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Academic Background Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="GraduationCap" size={20} className="mr-2 text-primary" />
          Academic Background
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Academic Level"
            placeholder="Select your current level"
            options={academicLevelOptions}
            value={formData?.academicLevel}
            onChange={(value) => handleInputChange('academicLevel', value)}
            error={errors?.academicLevel}
            required
          />

          {(formData?.academicLevel === 'class12' || formData?.academicLevel === 'graduate') && (
            <Select
              label="Current Stream"
              placeholder="Select your stream"
              description="Choose your current or most recent stream"
              options={streamOptions}
              value={formData?.currentStream}
              onChange={(value) => handleInputChange('currentStream', value)}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Board Type"
            placeholder="Select your board"
            options={boardOptions}
            value={formData?.boardType}
            onChange={(value) => handleInputChange('boardType', value)}
            error={errors?.boardType}
            required
          />

          <Select
            label="Passing Year"
            placeholder="Select year"
            options={yearOptions}
            value={formData?.passingYear}
            onChange={(value) => handleInputChange('passingYear', value)}
            error={errors?.passingYear}
            required
          />

          <Select
            label="Percentage Range"
            placeholder="Select range"
            options={percentageOptions}
            value={formData?.percentage}
            onChange={(value) => handleInputChange('percentage', value)}
            error={errors?.percentage}
            required
          />
        </div>
      </div>
      {/* Location Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="MapPin" size={20} className="mr-2 text-primary" />
          Location Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="State"
            placeholder="Select your state"
            description="This helps us recommend nearby colleges"
            options={stateOptions}
            value={formData?.state}
            onChange={(value) => handleInputChange('state', value)}
            error={errors?.state}
            searchable
            required
          />

          <Select
            label="District"
            placeholder="Select your district"
            options={districtOptions}
            value={formData?.district}
            onChange={(value) => handleInputChange('district', value)}
            error={errors?.district}
            searchable
            required
          />
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms and Conditions and Privacy Policy"
          description="By creating an account, you agree to our data usage policy for personalized recommendations"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />
      </div>
      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="left"
          fullWidth
          className="sm:flex-1"
        >
          Create Account
        </Button>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => navigate('/user-login')}
          className="sm:w-auto"
        >
          Already have an account? Sign In
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;