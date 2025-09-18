import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SupportCenter = ({ userType }) => {
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [supportTicket, setSupportTicket] = useState({
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });

  const parentFAQs = [
    {
      id: 1,
      question: 'How can I access my child\'s assessment results?',
      answer: 'You can view your child\'s assessment results in the Parent Dashboard. Navigate to the "Child Progress" section where you\'ll find detailed reports on personality assessments, career interests, and recommended paths. All data is presented in an easy-to-understand format with explanations.',
      category: 'Dashboard'
    },
    {
      id: 2,
      question: 'What if my child is confused about career choices?',
      answer: 'It\'s completely normal for students to feel confused about career choices. We recommend starting with our interactive career exploration tools, scheduling a one-on-one counseling session, and using our family discussion guides to have productive conversations about interests and goals.',
      category: 'Career Guidance'
    },
    {
      id: 3,
      question: 'How do I help my child choose between Science, Commerce, and Arts?',
      answer: 'Stream selection should be based on your child\'s interests, aptitude, and career goals. Use our Stream Selection Guide, review the assessment results, and consider future career prospects. Remember that each stream offers diverse career opportunities in today\'s economy.',
      category: 'Stream Selection'
    },
    {
      id: 4,
      question: 'Are the career assessments scientifically valid?',
      answer: 'Yes, our assessments are based on established psychological frameworks and validated career assessment tools. They include personality tests, interest inventories, and aptitude evaluations that have been adapted for the Indian context and validated with local student populations.',
      category: 'Assessments'
    },
    {
      id: 5,
      question: 'How can I support my child without being pushy?',
      answer: 'The key is to be supportive while allowing autonomy. Use our family discussion guides, ask open-ended questions about their interests, provide information without pressure, and respect their choices while offering guidance. Focus on understanding rather than directing.',
      category: 'Parenting'
    }
  ];

  const educatorFAQs = [
    {
      id: 1,
      question: 'How can I integrate career guidance into my regular curriculum?',
      answer: 'Our Classroom Career Guidance Curriculum provides a structured 12-week program that can be integrated into existing subjects. Use career-related examples in math, science projects related to different industries, and literature that explores various professions.',
      category: 'Curriculum'
    },
    {
      id: 2,
      question: 'What resources are available for group assessments?',
      answer: 'We provide Group Assessment Activities that can be conducted with entire classes. These include interactive exercises, peer discussion formats, and collaborative career exploration activities that work well in classroom settings.',
      category: 'Assessments'
    },
    {
      id: 3,
      question: 'How do I handle students with conflicting career interests?',
      answer: 'Students with multiple interests can explore interdisciplinary careers or dual specializations. Help them identify common themes across their interests and explore emerging fields that combine multiple disciplines. Encourage them to see this as an advantage.',
      category: 'Student Support'
    },
    {
      id: 4,
      question: 'What should I tell parents during career discussions?',
      answer: 'Use our Parent-Teacher Conference Templates to structure conversations. Focus on the student\'s strengths, provide data-driven insights from assessments, explain modern career options, and emphasize the importance of supporting the student\'s natural inclinations.',
      category: 'Parent Communication'
    },
    {
      id: 5,
      question: 'How can I stay updated on current career trends?',
      answer: 'Attend our regular webinars, access our Industry Trends reports, join the educator community forums, and use our Professional Development resources. We also send monthly newsletters with the latest career market insights.',
      category: 'Professional Development'
    }
  ];

  const faqs = userType === 'parent' ? parentFAQs : educatorFAQs;

  const supportCategories = [
    { value: 'technical', label: 'Technical Support' },
    { value: 'account', label: 'Account Issues' },
    { value: 'guidance', label: 'Career Guidance' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'other', label: 'Other' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-red-600' }
  ];

  const contactMethods = [
    {
      method: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: 'Mon-Fri, 9 AM - 6 PM IST',
      icon: 'MessageCircle',
      action: 'Start Chat'
    },
    {
      method: 'Email Support',
      description: 'Send us detailed questions or feedback',
      availability: 'Response within 24 hours',
      icon: 'Mail',
      action: 'Send Email'
    },
    {
      method: 'Phone Support',
      description: 'Speak directly with our counselors',
      availability: 'Mon-Fri, 10 AM - 5 PM IST',
      icon: 'Phone',
      action: 'Call Now'
    },
    {
      method: 'Video Call',
      description: 'Schedule a personalized guidance session',
      availability: 'By appointment only',
      icon: 'Video',
      action: 'Schedule Call'
    }
  ];

  const handleTicketSubmit = (e) => {
    e?.preventDefault();
    console.log('Support ticket submitted:', supportTicket);
    // Handle ticket submission
    setSupportTicket({ subject: '', category: '', message: '', priority: 'medium' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Support Center
        </h2>
        <p className="text-text-secondary">
          Get help, find answers, and connect with our support team for personalized assistance.
        </p>
      </div>
      {/* Quick Contact Methods */}
      <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Contact Support</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactMethods?.map((contact, index) => (
            <div key={index} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-200 text-center">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                <Icon name={contact?.icon} size={24} className="text-primary" />
              </div>
              <h4 className="font-medium text-text-primary mb-2">{contact?.method}</h4>
              <p className="text-sm text-text-secondary mb-2">{contact?.description}</p>
              <p className="text-xs text-text-secondary mb-3">{contact?.availability}</p>
              <Button variant="outline" size="sm" fullWidth>
                {contact?.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-3">
            {faqs?.map((faq) => (
              <div key={faq?.id} className="border border-border rounded-lg">
                <button
                  onClick={() => setSelectedFAQ(selectedFAQ === faq?.id ? null : faq?.id)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                >
                  <span className="font-medium text-text-primary pr-4">{faq?.question}</span>
                  <Icon 
                    name={selectedFAQ === faq?.id ? "ChevronUp" : "ChevronDown"} 
                    size={20} 
                    className="text-text-secondary flex-shrink-0" 
                  />
                </button>
                {selectedFAQ === faq?.id && (
                  <div className="px-4 pb-4">
                    <div className="pt-2 border-t border-border">
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mb-2">
                        {faq?.category}
                      </span>
                      <p className="text-text-secondary text-sm leading-relaxed">{faq?.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-sm text-text-secondary mb-3">Can't find what you're looking for?</p>
            <Button variant="outline" size="sm" iconName="Search" iconPosition="left">
              Search All FAQs
            </Button>
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Submit Support Ticket
          </h3>
          
          <form onSubmit={handleTicketSubmit} className="space-y-4">
            <Input
              label="Subject"
              type="text"
              placeholder="Brief description of your issue"
              value={supportTicket?.subject}
              onChange={(e) => setSupportTicket({...supportTicket, subject: e?.target?.value})}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category
              </label>
              <select
                value={supportTicket?.category}
                onChange={(e) => setSupportTicket({...supportTicket, category: e?.target?.value})}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {supportCategories?.map((category) => (
                  <option key={category?.value} value={category?.value}>
                    {category?.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Priority Level
              </label>
              <div className="flex space-x-4">
                {priorityLevels?.map((priority) => (
                  <label key={priority?.value} className="flex items-center">
                    <input
                      type="radio"
                      name="priority"
                      value={priority?.value}
                      checked={supportTicket?.priority === priority?.value}
                      onChange={(e) => setSupportTicket({...supportTicket, priority: e?.target?.value})}
                      className="mr-2"
                    />
                    <span className={`text-sm ${priority?.color}`}>{priority?.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Message
              </label>
              <textarea
                value={supportTicket?.message}
                onChange={(e) => setSupportTicket({...supportTicket, message: e?.target?.value})}
                placeholder="Please provide detailed information about your issue..."
                rows={5}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <Button type="submit" variant="default" iconName="Send" iconPosition="left">
                Submit Ticket
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setSupportTicket({ subject: '', category: '', message: '', priority: 'medium' })}
              >
                Clear Form
              </Button>
            </div>
          </form>
          
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Response Time</p>
                <p className="text-xs text-blue-600">
                  We typically respond to support tickets within 24 hours during business days.
                  High priority issues are addressed within 4 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Additional Resources */}
      <div className="bg-surface rounded-xl p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Additional Resources</h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors duration-200">
            <Icon name="BookOpen" size={24} className="text-primary mb-3" />
            <h4 className="font-medium text-text-primary mb-2">User Guide</h4>
            <p className="text-sm text-text-secondary mb-3">
              Comprehensive guide to using all platform features effectively.
            </p>
            <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
              Read Guide
            </Button>
          </div>
          
          <div className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors duration-200">
            <Icon name="Play" size={24} className="text-primary mb-3" />
            <h4 className="font-medium text-text-primary mb-2">Video Tutorials</h4>
            <p className="text-sm text-text-secondary mb-3">
              Step-by-step video guides for common tasks and features.
            </p>
            <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
              Watch Videos
            </Button>
          </div>
          
          <div className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors duration-200">
            <Icon name="Users" size={24} className="text-primary mb-3" />
            <h4 className="font-medium text-text-primary mb-2">Community Forum</h4>
            <p className="text-sm text-text-secondary mb-3">
              Connect with other {userType}s and share experiences.
            </p>
            <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
              Join Forum
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;