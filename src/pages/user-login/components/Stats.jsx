import Icon from '../../../components/AppIcon';
import React from 'react';

const stats = [
    { number: "50,000+", label: "Students Guided" },
    { number: "2,500+", label: "Government Colleges" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" }
];
const Stats = () => {
    return (
        <div className="space-y-6">
            {/* Statistics */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8">
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                        Trusted by Students Nationwide
                    </h3>
                    <p className="text-muted-foreground">
                        Real results from real students across India
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats?.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl font-bold text-primary mb-1">
                                {stat?.number}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {stat?.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Testimonial */}
            <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Quote" size={20} className="text-success" />
                    </div>
                    <div className="flex-1">
                        <blockquote className="text-foreground mb-3 italic">
                            "ShikshaPath helped me discover my passion for
                            biotechnology. The personalized recommendations and
                            college information made my decision so much easier.
                            I'm now studying at my dream college!"
                        </blockquote>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                                <Icon
                                    name="User"
                                    size={16}
                                    className="text-muted-foreground"
                                />
                            </div>
                            <div>
                                <div className="font-medium text-foreground">
                                    Priya Sharma
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    B.Sc. Biotechnology Student
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Call to Action */}
            <div className="text-center bg-primary/5 rounded-lg p-8">
                <Icon
                    name="Compass"
                    size={48}
                    className="text-primary mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-foreground mb-2">
                    Ready to Find Your Path?
                </h3>
                <p className="text-muted-foreground mb-4">
                    Create your account today and take the first step towards a
                    successful career
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} />
                    <span>Takes less than 2 minutes to get started</span>
                </div>
            </div>
        </div>
    );
};

export default Stats;
