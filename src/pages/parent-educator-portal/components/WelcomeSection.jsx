import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomeSection = ({ userType, onUserTypeChange }) => {
    const navigate = useNavigate();
    const userTypes = [
        {
            id: "parent",
            title: "Parent/Guardian",
            description:
                "Support your child's career journey with insights and guidance",
            icon: "Heart",
            color: "bg-blue-50 border-blue-200 text-blue-800",
            iconColor: "text-blue-600"
        },
        {
            id: "educator",
            title: "Educator/Counselor",
            description:
                "Access tools and resources to guide multiple students effectively",
            icon: "GraduationCap",
            color: "bg-emerald-50 border-emerald-200 text-emerald-800",
            iconColor: "text-emerald-600"
        }
    ];

    return (
        <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-end mb-4">
                    <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        onClick={() => {
                            localStorage.removeItem(
                                "shikshaPath_isAuthenticated"
                            );
                            localStorage.removeItem("shikshaPath_userEmail");
                            localStorage.removeItem("shikshaPath_loginTime");
                            localStorage.removeItem("shikshaPath_userType");
                            navigate("/user-login");
                        }}
                        iconName="LogIn"
                        iconPosition="left">
                        Logout
                    </Button>
                </div>
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-text-primary mb-4">
                        Parent & Educator Portal
                    </h1>
                    <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                        Empowering families and educators to support students in
                        making informed career decisions. Bridge the knowledge
                        gap and guide the next generation toward success.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {userTypes?.map(type => (
                        <div
                            key={type?.id}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-elevation-2 ${
                                userType === type?.id
                                    ? type?.color + " shadow-elevation-2"
                                    : "bg-surface border-border hover:border-primary/30"
                            }`}
                            onClick={() => onUserTypeChange(type?.id)}>
                            <div className="flex items-start space-x-4">
                                <div
                                    className={`p-3 rounded-lg ${
                                        userType === type?.id
                                            ? "bg-white/50"
                                            : "bg-muted"
                                    }`}>
                                    <Icon
                                        name={type?.icon}
                                        size={24}
                                        className={
                                            userType === type?.id
                                                ? type?.iconColor
                                                : "text-text-secondary"
                                        }
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {type?.title}
                                    </h3>
                                    <p className="text-sm opacity-80">
                                        {type?.description}
                                    </p>
                                    {userType === type?.id && (
                                        <div className="mt-4">
                                            <Button variant="outline" size="sm">
                                                <Icon
                                                    name="ArrowRight"
                                                    size={16}
                                                    className="ml-2"
                                                />
                                                Get Started
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WelcomeSection;
