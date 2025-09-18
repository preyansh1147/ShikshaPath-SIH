import React, { useEffect } from "react";

import Button from "components/ui/Button";
import Header from "components/ui/Header";
import Icon from "../../components/AppIcon";
import { Link } from "react-router-dom";
import LoginBenefits from "./components/LoginBenefits";
import LoginForm from "./components/LoginForm";
import SecurityFeatures from "./components/SecurityFeatures";
import Stats from "./components/Stats";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already authenticated
        const isAuthenticated = localStorage.getItem(
            "shikshaPath_isAuthenticated"
        );
        if (isAuthenticated === "true" && localStorage.getItem("shikshaPath_userType") === "student") {
            navigate("/user-dashboard");
        } else if (isAuthenticated === "true" && localStorage.getItem("shikshaPath_userType") === "parent") {
            navigate("/parent-educator-portal");
        } else{
            navigate("/user-login");
        }

        // Auto-fill email if remembered
        const rememberedEmail = localStorage.getItem("shikshaPath_userEmail");
        const rememberMe = localStorage.getItem("shikshaPath_rememberMe");
        if (rememberMe === "true" && rememberedEmail) {
            // This would be handled by the LoginForm component
            console.log("Auto-filling remembered email:", rememberedEmail);
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            {/* Main Content */}
            <main className="pt-16 px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-start my-6">
                    {/* Left Column - Login Form */}
                    <div className="order-2 lg:order-1">
                        <div className="sticky top-8">
                            <LoginForm />
                        </div>
                    </div>

                    {/* Right Column - Benefits & Security */}
                    <div className="order-1 lg:order-2 space-y-8">
                        {/* Mobile Header */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <Icon name="Compass" size={32} color="white" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Welcome to ShikshaPath
                            </h1>
                            <p className="text-muted-foreground">
                                Taleem Se Tarakki Tak
                            </p>
                        </div>

                        {/* Benefits Section */}
                        <div className="hidden lg:block">
                            <LoginBenefits />
                        </div>

                        {/* Security Features - Mobile Only */}
                        <div className="lg:hidden">
                            <SecurityFeatures />
                        </div>

                        {/* Quick Stats - Mobile */}
                        <div className="lg:hidden bg-card border border-border rounded-lg p-6">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-primary">
                                        50K+
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Students
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">
                                        2.5K+
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Colleges
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">
                                        95%
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Success Rate
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">
                                        24/7
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Support
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Desktop Security */}
                <div className="hidden lg:block mt-16">
                    <div className="max-w-4xl mx-auto">
                        <Stats />
                    </div>
                </div>
                {/* Bottom Section - Desktop Security */}
                <div className="hidden lg:block mt-16">
                    <div className="max-w-4xl mx-auto">
                        <SecurityFeatures />
                    </div>
                </div>

                {/* Mobile Bottom CTA */}
                <div className="lg:hidden mt-8 text-center bg-primary/5 rounded-lg p-6">
                    <h3 className="font-bold text-foreground mb-2">
                        New to ShikshaPath?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                        Create your account and start your career journey today
                    </p>
                    <button
                        onClick={() => navigate("/user-registration")}
                        className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-smooth">
                        <Icon name="UserPlus" size={16} />
                        <span>Create Account</span>
                    </button>
                </div>
            </main>
            {/* Quick Access Footer */}
            <section className="bg-gradient-to-r from-primary to-secondary py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                        Need Immediate Help?
                    </h2>
                    <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
                        Our support team is available 24/7 to help you with
                        urgent queries about admissions, deadlines, and career
                        guidance.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            variant="secondary"
                            size="lg"
                            iconName="Phone"
                            iconPosition="left"
                            className="bg-surface text-text-primary hover:bg-surface/90">
                            Call Support: 1800-123-4567
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            iconName="MessageCircle"
                            iconPosition="left"
                            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                            Live Chat Support
                        </Button>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/80">
                        <Link
                            to="/career-discovery-portal"
                            className="hover:text-primary-foreground transition-colors duration-200">
                            Career Discovery
                        </Link>
                        <Link
                            to="/college-intelligence-dashboard"
                            className="hover:text-primary-foreground transition-colors duration-200">
                            College Intelligence
                        </Link>
                        <Link
                            to="/resource-timeline-hub"
                            className="hover:text-primary-foreground transition-colors duration-200">
                            Resources Hub
                        </Link>
                        <Link
                            to="/parent-educator-portal"
                            className="hover:text-primary-foreground transition-colors duration-200">
                            Parent Portal
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserLogin;
