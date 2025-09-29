import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import { Link } from "react-router-dom";
import React from "react";

const SavedColleges = () => {
    const savedColleges = [
        {
            id: 1,
            name: "National Institute of Technology Srinagar",
            location: "Srinagar, Jammu & Kashmir",
            type: "Engineering",
            deadline: new Date("2025-04-15"),
            cutoff: "JEE Mains Rank 5000",
            fees: "₹60,000/year",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=200&fit=crop",
            isBookmarked: true
        },
        {
            id: 2,
            name: "University of Kashmir",
            location: "Srinagar, Jammu & Kashmir",
            type: "General / Liberal Arts",
            deadline: new Date("2025-05-20"),
            cutoff: "85% in Class 12 / CUET",
            fees: "₹30,000/year",
            image: "https://images.unsplash.com/photo-1617196030323-9a3f7b6a2f2e?w=400&h=200&fit=crop",
            isBookmarked: true
        },
        {
            id: 3,
            name: "Islamic University of Science and Technology",
            location: "Awantipora, Pulwama, J&K",
            type: "Science & Technology",
            deadline: new Date("2025-06-10"),
            cutoff: "CUET / JEE Score",
            fees: "₹32,000/year",
            image: "https://images.unsplash.com/photo-1528747045269-390fe33c19d4?w=400&h=200&fit=crop",
            isBookmarked: true
        },
        {
            id: 4,
            name: "Indian Institute of Technology Bombay",
            location: "Mumbai, Maharashtra",
            type: "Engineering",
            deadline: new Date("2025-03-31"),
            cutoff: "JEE Advanced Rank 1000",
            fees: "₹2,00,000/year",
            image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=200&fit=crop",
            isBookmarked: true
        },
        {
            id: 5,
            name: "University of Delhi",
            location: "New Delhi, Delhi NCR",
            type: "General / Commerce / Arts",
            deadline: new Date("2025-06-15"),
            cutoff: "CUET UG / 95% in Class 12",
            fees: "₹15,000/year",
            image: "https://images.unsplash.com/photo-1562771379-eafdca7a2fa5?w=400&h=200&fit=crop",
            isBookmarked: true
        },
        {
            id: 6,
            name: "Christ University",
            location: "Bengaluru, Karnataka",
            type: "Commerce / Management",
            deadline: new Date("2025-04-10"),
            cutoff: "CUET / Christ Entrance Test",
            fees: "₹1,80,000/year",
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=200&fit=crop",
            isBookmarked: true
        },
        {
            id: 7,
            name: "Jadavpur University",
            location: "Kolkata, West Bengal",
            type: "Engineering / Arts / Science",
            deadline: new Date("2025-05-25"),
            cutoff: "WBJEE Rank / Merit-based",
            fees: "₹10,000/year",
            image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=200&fit=crop",
            isBookmarked: true
        },
        {
            id: 8,
            name: "Banaras Hindu University",
            location: "Varanasi, Uttar Pradesh",
            type: "Multidisciplinary",
            deadline: new Date("2025-06-05"),
            cutoff: "CUET UG",
            fees: "₹20,000/year",
            image: "https://images.unsplash.com/photo-1552632074-4c98c7f1f3c4?w=400&h=200&fit=crop",
            isBookmarked: true
        },
        {
            id: 9,
            name: "Savitribai Phule Pune University",
            location: "Pune, Maharashtra",
            type: "General / Science",
            deadline: new Date("2025-06-12"),
            cutoff: "University Entrance / Merit-based",
            fees: "₹25,000/year",
            image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=200&fit=crop",
            isBookmarked: true
        },
        {
            id: 10,
            name: "Amity University",
            location: "Noida, Uttar Pradesh",
            type: "Private / Multidisciplinary",
            deadline: new Date("2025-07-01"),
            cutoff: "CUET / Amity Entrance",
            fees: "₹3,00,000/year",
            image: "https://images.unsplash.com/photo-1604014237744-df4fa1be7f30?w=400&h=200&fit=crop",
            isBookmarked: true
        },
        {
            id: 11,
            name: "Anna University",
            location: "Chennai, Tamil Nadu",
            type: "Engineering",
            deadline: new Date("2025-05-10"),
            cutoff: "TNEA Counseling / 12th Board Marks",
            fees: "₹25,000/year",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop",
            isBookmarked: true
        },
        {
            id: 12,
            name: "Jawaharlal Nehru Technological University",
            location: "Hyderabad, Telangana",
            type: "Engineering / Tech",
            deadline: new Date("2025-05-18"),
            cutoff: "EAMCET Rank",
            fees: "₹65,000/year",
            image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=200&fit=crop",
            isBookmarked: true
        }
    ];

    const getDaysUntilDeadline = deadline => {
        const today = new Date();
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getDeadlineStatus = days => {
        if (days < 0)
            return {
                text: "Expired",
                color: "text-error",
                bgColor: "bg-error/10"
            };
        if (days <= 7)
            return {
                text: `${days} days left`,
                color: "text-error",
                bgColor: "bg-error/10"
            };
        if (days <= 30)
            return {
                text: `${days} days left`,
                color: "text-warning",
                bgColor: "bg-warning/10"
            };
        return {
            text: `${days} days left`,
            color: "text-success",
            bgColor: "bg-success/10"
        };
    };

    return (
        <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Icon name="Bookmark" size={20} className="text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">
                        Saved Colleges
                    </h2>
                    <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        {savedColleges?.length}
                    </span>
                </div>
                <Link to="/college-comparison">
                    <Button
                        variant="ghost"
                        size="sm"
                        iconName="ExternalLink"
                        iconPosition="right">
                        View All
                    </Button>
                </Link>
            </div>
            <div className="space-y-4">
                {savedColleges?.map(college => {
                    const daysLeft = getDaysUntilDeadline(college?.deadline);
                    const deadlineStatus = getDeadlineStatus(daysLeft);

                    return (
                        <div
                            key={college?.id}
                            className="group border border-border rounded-lg p-4 hover:border-primary/50 hover:shadow-soft transition-all duration-200">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg overflow-hidden">
                                    <img
                                        src={college?.image}
                                        alt={college?.name}
                                        className="w-full h-full object-cover"
                                        onError={e => {
                                            e.target.src =
                                                "/assets/images/no_image.png";
                                        }}
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                {college?.name}
                                            </h3>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                                <div className="flex items-center space-x-1">
                                                    <Icon
                                                        name="MapPin"
                                                        size={12}
                                                    />
                                                    <span>
                                                        {college?.location}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Icon
                                                        name="GraduationCap"
                                                        size={12}
                                                    />
                                                    <span>{college?.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-primary hover:text-primary/80 transition-colors">
                                            <Icon
                                                name="Bookmark"
                                                size={16}
                                                fill="currentColor"
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 text-sm">
                                            <span className="text-foreground font-medium">
                                                {college?.fees}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {college?.cutoff}
                                            </span>
                                        </div>
                                        <div
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${deadlineStatus?.bgColor} ${deadlineStatus?.color}`}>
                                            {deadlineStatus?.text}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-6 pt-4 border-t border-border">
                <Link to="/college-comparison">
                    <Button
                        variant="outline"
                        fullWidth
                        iconName="Plus"
                        iconPosition="left">
                        Add More Colleges
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SavedColleges;
