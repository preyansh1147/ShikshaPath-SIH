import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SuccessStories = ({ 
  selectedStream,
  className = "" 
}) => {
  const [currentStory, setCurrentStory] = useState(0);

  const successStories = {
    Science: [
      {
        id: 1,
        name: "Dr. Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
        currentRole: "Senior Research Scientist at ISRO",
        stream: "Science (PCM)",
        college: "IIT Delhi",
        year: "2018",
        story: `Started with Science stream focusing on Physics, Chemistry, and Mathematics. The analytical thinking and problem-solving skills developed during 11th-12th helped me crack JEE Advanced. Today, I'm working on India's space missions and contributing to cutting-edge research.`,
        achievement: "Led team that developed satellite navigation system",
        advice: "Science stream opens doors to endless possibilities. Focus on understanding concepts rather than memorizing formulas."
      },
      {
        id: 2,
        name: "Dr. Rajesh Kumar",
        avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
        currentRole: "Cardiologist at AIIMS",
        stream: "Science (PCB)",
        college: "AIIMS Delhi",
        year: "2015",
        story: `Chose Biology with Physics and Chemistry to pursue medicine. The rigorous study schedule and dedication during Class 11-12 prepared me for NEET. Now I'm saving lives and making a difference in healthcare.`,
        achievement: "Performed over 500 successful heart surgeries",
        advice: "Medical field requires dedication and empathy. Start preparing early and stay consistent with your studies."
      }
    ],
    Commerce: [
      {
        id: 3,
        name: "Anita Gupta",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
        currentRole: "Chartered Accountant & CFO",
        stream: "Commerce",
        college: "Shri Ram College of Commerce",
        year: "2017",
        story: `Commerce stream with Accountancy, Business Studies, and Economics gave me a strong foundation in business concepts. Cleared CA exams and now I'm the CFO of a Fortune 500 company.`,
        achievement: "Youngest CFO in company\'s history at age 28",
        advice: "Commerce offers diverse career paths. Focus on practical applications and stay updated with business trends."
      },
      {
        id: 4,
        name: "Vikram Singh",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        currentRole: "Investment Banker",
        stream: "Commerce",
        college: "Delhi School of Economics",
        year: "2019",
        story: `Commerce background helped me understand financial markets deeply. The analytical skills from Economics and mathematical concepts from Commerce Math are crucial in investment banking.`,
        achievement: "Managed portfolio worth ₹500 crores",
        advice: "Commerce is not just about accounting. It\'s about understanding how business and economy work together."
      }
    ],
    Arts: [
      {
        id: 5,
        name: "Meera Joshi",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763c5c?w=150&h=150&fit=crop&crop=face",
        currentRole: "IAS Officer",
        stream: "Arts (Humanities)",
        college: "Lady Shri Ram College",
        year: "2016",
        story: `Arts stream with History, Political Science, and Economics provided me with critical thinking and analytical skills. This foundation helped me crack UPSC and serve the nation as an IAS officer.`,
        achievement: "Implemented digital governance in rural districts",
        advice: "Arts stream develops critical thinking and communication skills that are valuable in any career path."
      },
      {
        id: 6,
        name: "Arjun Mehta",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        currentRole: "Senior Journalist & News Anchor",
        stream: "Arts",
        college: "Jamia Millia Islamia",
        year: "2018",
        story: `Arts subjects like English Literature and Political Science enhanced my communication and analytical skills. These skills are essential in journalism where you need to understand complex issues and communicate them clearly.`,
        achievement: "Won National Award for investigative journalism",
        advice: "Arts stream is perfect for those who love reading, writing, and understanding human society and culture."
      }
    ],
    Vocational: [
      {
        id: 7,
        name: "Ravi Patel",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        currentRole: "Senior Software Developer",
        stream: "Vocational (IT)",
        college: "Polytechnic Institute",
        year: "2020",
        story: `Vocational stream in Information Technology gave me practical skills from day one. While others were learning theory, I was already coding and building applications. This head start helped me land a job immediately after graduation.`,
        achievement: "Developed mobile app with 1M+ downloads",
        advice: "Vocational education provides practical skills that are immediately applicable in the job market."
      }
    ]
  };

  const currentStories = selectedStream ? successStories?.[selectedStream?.name] || [] : [];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % currentStories?.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + currentStories?.length) % currentStories?.length);
  };

  if (!selectedStream || currentStories?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 text-center ${className}`}>
        <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Success Stories</h3>
        <p className="text-sm text-muted-foreground">
          Select a stream to read inspiring success stories from alumni
        </p>
      </div>
    );
  }

  const story = currentStories?.[currentStory];

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-bold text-foreground">Success Stories</h3>
            <p className="text-sm text-muted-foreground">
              {selectedStream?.name} stream alumni who made it big
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {currentStory + 1} of {currentStories?.length}
            </span>
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStory}
                disabled={currentStories?.length <= 1}
                iconName="ChevronLeft"
                className="w-8 h-8 p-0"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={nextStory}
                disabled={currentStories?.length <= 1}
                iconName="ChevronRight"
                className="w-8 h-8 p-0"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Story Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Section */}
          <div className="md:w-1/3">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={story?.avatar}
                  alt={story?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-1">{story?.name}</h4>
              <p className="text-sm text-primary font-medium mb-2">{story?.currentRole}</p>
              
              {/* Details */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="GraduationCap" size={14} />
                  <span>{story?.stream}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Building" size={14} />
                  <span>{story?.college}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Calendar" size={14} />
                  <span>Graduated {story?.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="md:w-2/3">
            <div className="space-y-4">
              {/* Achievement Badge */}
              <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="Award" size={16} className="text-success mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-success mb-1">Key Achievement</h5>
                    <p className="text-sm text-foreground">{story?.achievement}</p>
                  </div>
                </div>
              </div>

              {/* Story */}
              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">Journey</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{story?.story}</p>
              </div>

              {/* Advice */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-primary mb-1">Advice for Students</h5>
                    <p className="text-sm text-foreground italic">"{story?.advice}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Dots */}
      {currentStories?.length > 1 && (
        <div className="p-6 pt-0">
          <div className="flex justify-center space-x-2">
            {currentStories?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === currentStory ? 'bg-primary' : 'bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;