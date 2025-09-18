import React, { useEffect, useState } from "react";

import ActivityFeed from "./components/ActivityFeed";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import { Helmet } from "react-helmet";
import NotificationCenter from "./components/NotificationCenter";
import ProgressTracker from "./components/ProgressTracker";
import QuickActions from "./components/QuickActions";
import RecommendationEngine from "./components/RecommendationEngine";
import SavedColleges from "./components/SavedColleges";
import WelcomePanel from "./components/WelcomePanel";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    // Mock user data
    const [user] = useState({
        id: 1,
        name: "Arjun Sharma",
        email: "arjun.sharma@email.com",
        avatar: null,
        isAuthenticated: true,
        class: "12th",
        stream: "Science",
        location: "New Delhi, India",
        joinedDate: new Date("2024-01-15")
    });

    const [profileCompletion] = useState(75);
    const [assessmentCompleted] = useState(true);
    const navigate = useNavigate();
    // Mock user profile for recommendations
    const userProfile = {
        interests: ["Technology", "Mathematics", "Problem Solving"],
        strengths: ["Analytical Thinking", "Logical Reasoning"],
        academicPerformance: {
            class10: 92,
            class12: 88
        },
        preferredLocations: ["Delhi", "Mumbai", "Bangalore"],
        budgetRange: "0-500000"
    };

    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (
            !localStorage.getItem("shikshaPath_isAuthenticated") ||
            localStorage.getItem("shikshaPath_userType") !== "student"
        ) {
            navigate("/user-login");
        }
    }, [localStorage.getItem("shikshaPath_isAuthenticated")]);

    return (
        <>
            <Helmet>
                <title>
                    Dashboard - CareerCompass | Your Personalized Career
                    Guidance
                </title>
                <meta
                    name="description"
                    content="Access your personalized career dashboard with recommendations, saved colleges, progress tracking, and quick actions for your educational journey."
                />
                <meta
                    name="keywords"
                    content="career dashboard, student portal, college recommendations, career guidance, educational planning"
                />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main className="pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Welcome Section */}
                        <div className="flex justify-end mb-4">
                            <Button
                                type="submit"
                                variant="default"
                                size="lg"
                                onClick={() => {
                                    localStorage.removeItem(
                                        "shikshaPath_isAuthenticated"
                                    );
                                    localStorage.removeItem(
                                        "shikshaPath_userEmail"
                                    );
                                    localStorage.removeItem(
                                        "shikshaPath_loginTime"
                                    );
                                    localStorage.removeItem(
                                        "shikshaPath_userType"
                                    );
                                    navigate("/user-login");
                                }}
                                iconName="LogIn"
                                iconPosition="left">
                                Logout
                            </Button>
                        </div>
                        <div className="mb-8">
                            <WelcomePanel
                                user={user}
                                profileCompletion={profileCompletion}
                                assessmentCompleted={assessmentCompleted}
                            />
                        </div>

                        {/* Main Dashboard Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Quick Actions */}
                                <QuickActions
                                    assessmentCompleted={assessmentCompleted}
                                />

                                {/* Saved Colleges */}
                                <SavedColleges />

                                {/* Recommendation Engine */}
                                <RecommendationEngine
                                    userProfile={userProfile}
                                />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-8">
                                {/* Progress Tracker */}
                                <ProgressTracker
                                    profileCompletion={profileCompletion}
                                    assessmentCompleted={assessmentCompleted}
                                />

                                {/* Notification Center */}
                                <NotificationCenter />

                                {/* Activity Feed */}
                                <ActivityFeed />
                            </div>
                        </div>

                        {/* Mobile-only sections */}
                        <div className="lg:hidden mt-8 space-y-8">
                            {/* Additional mobile-specific content can go here */}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default UserDashboard;
