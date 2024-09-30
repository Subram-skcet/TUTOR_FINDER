import React from 'react';
import './About.css'; // Make sure to create a corresponding CSS file

const AboutPage = () => {
  return (
    <div className="about-container">
      <section className="about-header">
        <h1 className="about-title">About EduQuest</h1>
        <p className="about-subtitle">Connecting students with the best teachers for home tuitions</p>
      </section>

      <section className="about-overview">
        <h2 className="overview-title">Our Mission</h2>
        <p className="overview-description">
          EduQuest simplifies the process of finding personalized and effective home tuition by connecting students with the best teachers in their area or any preferred location. Whether it’s for improving grades or mastering specific subjects, our platform makes the search for quality education easy and convenient.
        </p>
      </section>

      <section className="about-features">
        <h2 className="features-title">What We Offer</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3 className="feature-heading">Comprehensive Search</h3>
            <p className="feature-description">
              Search for tutors by name, subject, location, syllabus board, or grade level. We give you the flexibility to find the tutor that fits your needs perfectly.
            </p>
          </div>
          <div className="feature-item">
            <h3 className="feature-heading">Detailed Teacher Profiles</h3>
            <p className="feature-description">
              Explore complete teacher profiles, including experience, teaching philosophy, subjects taught, and reviews from other students to make an informed choice.
            </p>
          </div>
          <div className="feature-item">
            <h3 className="feature-heading">Student and Teacher Interaction</h3>
            <p className="feature-description">
              Teachers can manage their profiles, post tuition offerings, and respond to reviews, while students can manage favorites and provide feedback.
            </p>
          </div>
        </div>
      </section>

      <section className="about-community">
        <h2 className="community-title">Building a Community of Learning</h2>
        <p className="community-description">
          EduQuest is more than just a platform. It’s a community-driven space where students and teachers collaborate to enhance the quality of education. Our review and rating system helps maintain transparency and trust, ensuring a valuable experience for everyone involved.
        </p>
      </section>

      <section className="about-goal">
        <h2 className="goal-title">Our Goal</h2>
        <p className="goal-description">
          We aim to bridge the gap between students seeking personalized tuition and teachers offering their expertise, creating an environment where academic success is within reach for everyone.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
