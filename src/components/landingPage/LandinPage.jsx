import React, { useState, useEffect } from 'react';
import {  MessageCircle, Trophy, Users, Star, Zap, Shield, BookOpen, TrendingUp} from 'lucide-react';
import Navbar from './Navabar';
import MobileMenu from './MobileMenu';
import HeroSection from './HeroSection';
import CourseSection from './CourseSection';
import FeatureSection from './FeatureSection';
import GamificationSection from './GamificationSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dac');
  const [counters, setCounters] = useState({ students: 0, questions: 0, courses: 0 });

  // Counter animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounters({ students: 5000, questions: 50000, courses: 15 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const courses = {
    dac: { name: 'DAC', fullName: 'Diploma in Advanced Computing', icon: '💻', color: 'bg-blue-500' },
    dbda: { name: 'DBDA', fullName: 'PG Diploma in Big Data Analytics', icon: '📊', color: 'bg-green-500' },
    desd: { name: 'DESD', fullName: 'PG Diploma in Embedded Systems Design', icon: '🔧', color: 'bg-purple-500' },
    dassd: { name: 'DASSD', fullName: 'PG Diploma in Advanced Software Systems Design', icon: '⚡', color: 'bg-orange-500' },
  };

  const features = [
    {
      icon: MessageCircle,
      title: 'Course-Specific Discussions',
      description: 'Dedicated spaces for each CDAC course with specialized coordinators moderating discussions.',
      color: 'bg-blue-500'
    },
    {
      icon: Trophy,
      title: 'CrediRank System',
      description: 'Earn points for contributions, climb leaderboards, and unlock exclusive badges and rewards.',
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: 'Peer-to-Peer Learning',
      description: 'Connect with fellow students, share knowledge, and collaborate on projects and assignments.',
      color: 'bg-green-500'
    },
    {
      icon: Shield,
      title: 'Role-Based Access',
      description: 'Structured access for Students, Mentors, and Admins with appropriate permissions.',
      color: 'bg-red-500'
    },
    {
      icon: BookOpen,
      title: 'Study Materials Hub',
      description: 'Centralized repository for course materials, notes, and resources shared by the community.',
      color: 'bg-indigo-500'
    },
    {
      icon: Zap,
      title: 'Smart Notifications',
      description: 'Stay updated with intelligent notifications about relevant discussions and course updates.',
      color: 'bg-yellow-500'
    }
  ];

  const gamificationFeatures = [
    { icon: Star, title: 'Badges & Achievements', description: 'Unlock special badges for milestones' },
    { icon: TrendingUp, title: 'Leaderboards', description: 'Compete with peers and climb rankings' },
    // { icon: Award, title: 'Digital Certificates', description: 'Earn certificates for contributions' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
     <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Mobile Menu */}
     {isMenuOpen && <MobileMenu />}

      {/* Hero Section */}
      <HeroSection counters={counters} />

      {/* Features Section */}
     <FeatureSection features={features} />

      {/* Courses Section */}
    
       <CourseSection courses={courses} activeTab={activeTab} setActiveTab={setActiveTab} />
   

      {/* Gamification Section */}
      <GamificationSection gamificationFeatures={gamificationFeatures}/>

      {/* Contact Section */}
     <ContactSection/>

      {/* Footer */}
    <Footer/>
    </div>
  );
};

export default LandingPage;