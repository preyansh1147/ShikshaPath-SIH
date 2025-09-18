import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";

import AptitudeAssessmentQuiz from "pages/aptitude-assessment-quiz";
import CareerDiscoveryPortal from "./pages/career-discovery-portal";
import ChatbotWidget from "./components/ChatbotWidget";
import CollegeComparison from "pages/college-comparison";
import CollegeIntelligenceDashboard from "./pages/college-intelligence-dashboard";
import ErrorBoundary from "components/ErrorBoundary";
import HomepageEducationalTechnologyPlatform from "./pages/homepage-educational-technology-platform";
import NotFound from "pages/NotFound";
import ParentEducatorPortal from "./pages/parent-educator-portal";
import PersonalGuidanceCenter from "./pages/personal-guidance-center";
import React from "react";
import ResourceTimelineHub from "./pages/resource-timeline-hub";
import ScrollToTop from "components/ScrollToTop";
import StreamExploration from "pages/stream-exploration";
import TimelineTracker from "pages/timeline-tracker";
import UserDashboard from "pages/user-dashboard";
import UserLogin from "./pages/user-login";
import UserRegistration from "./pages/user-registration";

const Routes = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <ScrollToTop />
                <RouterRoutes>
                    {/* Define your route here */}
                    <Route path="/" element={<CareerDiscoveryPortal />} />
                    <Route path="/user-login" element={<UserLogin />} />
                    <Route
                        path="/personal-guidance-center"
                        element={<PersonalGuidanceCenter />}
                    />
                    <Route
                        path="/homepage-educational-technology-platform"
                        element={<HomepageEducationalTechnologyPlatform />}
                    />
                    <Route
                        path="/resource-timeline-hub"
                        element={<ResourceTimelineHub />}
                    />
                    <Route
                        path="/college-intelligence-dashboard"
                        element={<CollegeIntelligenceDashboard />}
                    />
                    <Route
                        path="/parent-educator-portal"
                        element={<ParentEducatorPortal />}
                    />
                    <Route
                        path="/career-discovery-portal"
                        element={<CareerDiscoveryPortal />}
                    />
                    <Route
                        path="/user-registration"
                        element={<UserRegistration />}
                    />
                    <Route
                        path="/college-comparison"
                        element={<CollegeComparison />}
                    />
                    <Route
                        path="/stream-exploration"
                        element={<StreamExploration />}
                    />
                    <Route
                        path="/user-dashboard"
                        element={<UserDashboard />}
                    />
                    <Route
                        path="/aptitude-assessment-quiz"
                        element={<AptitudeAssessmentQuiz />}
                    />
                    <Route
                        path="/timeline-tracker"
                        element={<TimelineTracker />}
                    />
                    <Route
                        path="/parent-educator-portal"
                        element={<ParentEducatorPortal />}
                    />
                    <Route path="*" element={<NotFound />} />
                </RouterRoutes>
            </ErrorBoundary>
            {/* Floating Chatbot Widget */}
            <ChatbotWidget />
        </BrowserRouter>
    );
};

export default Routes;
