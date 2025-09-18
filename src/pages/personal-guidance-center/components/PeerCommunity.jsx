import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PeerCommunity = () => {
  const [selectedForum, setSelectedForum] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);

  const forums = [
    { id: 'all', name: 'All Forums', icon: 'MessageSquare', count: 1247 },
    { id: 'engineering', name: 'Engineering', icon: 'Cpu', count: 456 },
    { id: 'medical', name: 'Medical', icon: 'Stethoscope', count: 234 },
    { id: 'commerce', name: 'Commerce', icon: 'TrendingUp', count: 189 },
    { id: 'arts', name: 'Arts & Humanities', icon: 'Palette', count: 123 },
    { id: 'study-abroad', name: 'Study Abroad', icon: 'Plane', count: 167 },
    { id: 'scholarships', name: 'Scholarships', icon: 'Award', count: 78 }
  ];

  const posts = [
    {
      id: 1,
      title: "JEE Main 2026: Best Books for Physics Preparation?",
      content: "Hi everyone! I'm starting my JEE Main preparation and looking for recommendations on the best physics books. I've heard about HC Verma and DC Pandey, but would love to hear from those who've actually used them.",
      author: {
        name: "Arjun Sharma",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        class: "Class 11",
        location: "Delhi"
      },
      forum: "engineering",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      replies: 23,
      likes: 45,
      views: 234,
      tags: ["JEE Main", "Physics", "Books", "Preparation"],
      isAnswered: false,
      isPinned: false
    },
    {
      id: 2,
      title: "NEET Biology: How to memorize so many diagrams?",
      content: "I\'m struggling with biology diagrams for NEET. There are so many to remember! Does anyone have effective techniques for memorizing and reproducing them accurately in exams?",
      author: {
        name: "Priya Patel",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        class: "Class 12",
        location: "Gujarat"
      },
      forum: "medical",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      replies: 18,
      likes: 32,
      views: 189,
      tags: ["NEET", "Biology", "Diagrams", "Memory Techniques"],
      isAnswered: true,
      isPinned: false
    },
    {
      id: 3,
      title: "CA vs CS: Which is better for commerce students?",
      content: "I'm confused between CA and CS after 12th commerce. Can someone who has experience in either field share insights about career prospects, difficulty level, and job opportunities?",
      author: {
        name: "Rohit Agarwal",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        class: "Class 12",
        location: "Mumbai"
      },
      forum: "commerce",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      replies: 31,
      likes: 67,
      views: 456,
      tags: ["CA", "CS", "Commerce", "Career Choice"],
      isAnswered: true,
      isPinned: true
    },
    {
      id: 4,
      title: "Study Abroad: Germany vs Canada for Engineering",
      content: "Planning to pursue engineering abroad. Torn between Germany and Canada. Looking for insights on education quality, living costs, job prospects, and visa processes.",
      author: {
        name: "Sneha Reddy",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        class: "Class 12",
        location: "Hyderabad"
      },
      forum: "study-abroad",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      replies: 15,
      likes: 28,
      views: 167,
      tags: ["Study Abroad", "Germany", "Canada", "Engineering"],
      isAnswered: false,
      isPinned: false
    },
    {
      id: 5,
      title: "Merit Scholarship for SC/ST students - Application tips?",
      content: "I\'m applying for various merit scholarships as an SC student. Can anyone share tips on writing effective applications and which scholarships have higher success rates?",
      author: {
        name: "Vikash Kumar",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        class: "Class 12",
        location: "Bihar"
      },
      forum: "scholarships",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      replies: 9,
      likes: 21,
      views: 98,
      tags: ["Scholarships", "SC/ST", "Merit", "Application"],
      isAnswered: false,
      isPinned: false
    }
  ];

  const replies = [
    {
      id: 1,
      postId: 1,
      content: "I used HC Verma for concepts and DC Pandey for problem solving. HC Verma is great for understanding fundamentals, while DC Pandey has more variety in problems. I'd recommend starting with HC Verma.",
      author: {
        name: "Karan Singh",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face",
        class: "IIT Delhi (2024)",
        location: "Delhi"
      },
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      likes: 12,
      isHelpful: true
    },
    {
      id: 2,
      postId: 1,
      content: "Don\'t forget about Resnick Halliday! It\'s excellent for building strong conceptual foundation. Use it alongside HC Verma for best results.",
      author: {
        name: "Ananya Gupta",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
        class: "NIT Trichy (2023)",
        location: "Chennai"
      },
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      likes: 8,
      isHelpful: false
    }
  ];

  const filteredPosts = selectedForum === 'all' 
    ? posts 
    : posts?.filter(post => post?.forum === selectedForum);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const handleLike = (postId) => {
    console.log(`Liked post ${postId}`);
  };

  const handleReply = (postId) => {
    console.log(`Reply to post ${postId}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar - Forums */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="bg-surface rounded-xl border border-border shadow-elevation-1 p-4">
          <h3 className="font-semibold text-text-primary mb-4">Discussion Forums</h3>
          <div className="space-y-2">
            {forums?.map((forum) => (
              <button
                key={forum?.id}
                onClick={() => setSelectedForum(forum?.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                  selectedForum === forum?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={forum?.icon} size={16} />
                  <span className="text-sm font-medium">{forum?.name}</span>
                </div>
                <span className="text-xs opacity-75">{forum?.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface rounded-xl border border-border shadow-elevation-1 p-4 mt-4">
          <h4 className="font-semibold text-text-primary mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" fullWidth iconName="Plus" iconPosition="left">
              New Post
            </Button>
            <Button variant="outline" size="sm" fullWidth iconName="Search" iconPosition="left">
              Search Posts
            </Button>
            <Button variant="outline" size="sm" fullWidth iconName="Bookmark" iconPosition="left">
              Saved Posts
            </Button>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              {forums?.find(f => f?.id === selectedForum)?.name || 'All Forums'}
            </h2>
            <p className="text-text-secondary">Connect with peers and get answers to your questions</p>
          </div>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Ask Question
          </Button>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts?.map((post) => (
            <div
              key={post?.id}
              className="bg-surface rounded-xl border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 p-6"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <Image
                    src={post?.author?.avatar}
                    alt={post?.author?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-text-primary">{post?.author?.name}</h4>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-xs text-text-secondary">{post?.author?.class}</span>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-xs text-text-secondary">{post?.author?.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-text-secondary">{formatTimeAgo(post?.timestamp)}</span>
                      {post?.isPinned && (
                        <Icon name="Pin" size={12} className="text-primary" />
                      )}
                      {post?.isAnswered && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-success/10 text-success">
                          <Icon name="CheckCircle" size={10} className="mr-1" />
                          Answered
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-text-primary mb-2 cursor-pointer hover:text-primary transition-colors duration-200">
                  {post?.title}
                </h3>
                <p className="text-text-secondary text-sm line-clamp-3">{post?.content}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Stats & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="MessageSquare" size={14} />
                    <span>{post?.replies} replies</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} />
                    <span>{post?.likes} likes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span>{post?.views} views</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Heart"
                    onClick={() => handleLike(post?.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageSquare"
                    onClick={() => handleReply(post?.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Share"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPost(post)}
                  >
                    View Discussion
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" iconName="ChevronDown" iconPosition="right">
            Load More Posts
          </Button>
        </div>
      </div>
      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border shadow-elevation-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-3">
                  <Image
                    src={selectedPost?.author?.avatar}
                    alt={selectedPost?.author?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">{selectedPost?.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium text-text-primary">{selectedPost?.author?.name}</span>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-xs text-text-secondary">{selectedPost?.author?.class}</span>
                      <span className="text-xs text-text-secondary">•</span>
                      <span className="text-xs text-text-secondary">{formatTimeAgo(selectedPost?.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1 hover:bg-muted rounded-md transition-colors duration-200"
                >
                  <Icon name="X" size={20} className="text-text-secondary" />
                </button>
              </div>

              {/* Post Content */}
              <div className="mb-6">
                <p className="text-text-secondary mb-4">{selectedPost?.content}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPost?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Replies */}
              <div className="border-t border-border pt-6">
                <h4 className="font-semibold text-text-primary mb-4">
                  {selectedPost?.replies} Replies
                </h4>
                
                <div className="space-y-4">
                  {replies?.filter(reply => reply?.postId === selectedPost?.id)?.map((reply) => (
                      <div key={reply?.id} className="flex space-x-3 p-4 bg-muted/50 rounded-lg">
                        <Image
                          src={reply?.author?.avatar}
                          alt={reply?.author?.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-text-primary text-sm">{reply?.author?.name}</span>
                            <span className="text-xs text-text-secondary">{reply?.author?.class}</span>
                            <span className="text-xs text-text-secondary">•</span>
                            <span className="text-xs text-text-secondary">{formatTimeAgo(reply?.timestamp)}</span>
                            {reply?.isHelpful && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-success/10 text-success">
                                <Icon name="CheckCircle" size={10} className="mr-1" />
                                Helpful
                              </span>
                            )}
                          </div>
                          <p className="text-text-secondary text-sm mb-2">{reply?.content}</p>
                          <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1 text-xs text-text-secondary hover:text-text-primary">
                              <Icon name="Heart" size={12} />
                              <span>{reply?.likes}</span>
                            </button>
                            <button className="text-xs text-text-secondary hover:text-text-primary">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Reply Input */}
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <textarea
                    placeholder="Write your reply..."
                    className="w-full p-3 bg-surface border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <Button variant="default" size="sm" iconName="Send" iconPosition="right">
                      Post Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerCommunity;