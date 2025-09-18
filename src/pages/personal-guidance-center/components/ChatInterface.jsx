import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hello! I'm your AI guidance counselor. I can help you with:\n• Career exploration and planning\n• College admission guidance\n• Entrance exam preparation\n• Stream selection advice\n\nHow can I assist you today?`,timestamp: new Date(Date.now() - 300000),language: 'en'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const messagesEndRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
  ];

  const quickActions = [
    { id: 1, text: 'Engineering vs Medical', icon: 'Stethoscope' },
    { id: 2, text: 'JEE Preparation Tips', icon: 'BookOpen' },
    { id: 3, text: 'College Admission Deadlines', icon: 'Calendar' },
    { id: 4, text: 'Scholarship Opportunities', icon: 'Award' },
    { id: 5, text: 'Career After 12th', icon: 'GraduationCap' },
    { id: 6, text: 'Study Abroad Options', icon: 'Plane' }
  ];

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: getBotResponse(inputMessage),
        timestamp: new Date(),
        language: selectedLanguage
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message?.toLowerCase();
    
    if (lowerMessage?.includes('engineering') || lowerMessage?.includes('jee')) {
      return `Great question about engineering! Here's what you should know:\n\n• JEE Main is conducted twice a year (January & April)\n• Focus on Physics, Chemistry, and Mathematics\n• Top engineering colleges: IITs, NITs, IIITs\n• Alternative options: State engineering colleges, private universities\n\nWould you like specific preparation strategies or college recommendations?`;
    } else if (lowerMessage?.includes('medical') || lowerMessage?.includes('neet')) {
      return `Medical career is a noble choice! Key information:\n\n• NEET is the single entrance exam for medical colleges\n• Subjects: Physics, Chemistry, Biology\n• Government medical colleges have lower fees\n• Consider AIIMS and JIPMER for top institutions\n\nDo you need guidance on NEET preparation or medical college selection?`;
    } else if (lowerMessage?.includes('career') || lowerMessage?.includes('12th')) {
      return `After 12th, you have numerous career options:\n\n• Science: Engineering, Medical, Research, IT\n• Commerce: CA, CS, Banking, Management\n• Arts: Law, Journalism, Psychology, Design\n• Vocational: Digital Marketing, Animation, Hospitality\n\nWhat are your interests and strengths? I can suggest personalized career paths.`;
    } else {
      return `I understand your query. Let me help you with that.\n\nFor personalized guidance, I recommend:\n• Taking our career assessment test\n• Speaking with our expert counselors\n• Joining relevant peer discussion groups\n\nWould you like me to connect you with a human counselor for detailed guidance?`;
    }
  };

  const handleQuickAction = (action) => {
    setInputMessage(action?.text);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-elevation-2 h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <Icon name="Bot" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">AI Career Counselor</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-text-secondary">Online</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e?.target?.value)}
            className="text-xs bg-muted border border-border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {languages?.map(lang => (
              <option key={lang?.code} value={lang?.code}>
                {lang?.flag} {lang?.name}
              </option>
            ))}
          </select>
          <Button variant="ghost" size="sm" iconName="MoreVertical" />
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message?.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message?.type === 'user' ?'bg-primary text-primary-foreground ml-auto' :'bg-muted text-text-primary'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message?.content}</p>
              </div>
              <div className={`flex items-center space-x-2 mt-1 ${
                message?.type === 'user' ? 'justify-end' : 'justify-start'
              }`}>
                <span className="text-xs text-text-secondary">
                  {formatTime(message?.timestamp)}
                </span>
                {message?.type === 'user' && (
                  <Icon name="Check" size={12} className="text-success" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-border">
        <div className="flex flex-wrap gap-2">
          {quickActions?.slice(0, 3)?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleQuickAction(action)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-xs text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <Icon name={action?.icon} size={12} />
              <span>{action?.text}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e?.target?.value)}
              onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
              placeholder="Type your question here..."
              className="w-full px-4 py-2 pr-12 bg-muted border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <button
              onClick={() => setInputMessage('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage?.trim() || isTyping}
            variant="default"
            size="sm"
            iconName="Send"
            className="rounded-full px-4"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;