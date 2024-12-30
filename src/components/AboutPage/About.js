import React from 'react';
import './About.css'; // Make sure to create a corresponding CSS file
import aboutimg from '../../assets/about_us.jpeg'
import compr_srch from '../../assets/comprehensive_search.webp'
import det_prof from '../../assets/detailed-profile.webp'
import st_te_eng from '../../assets/creating-tution.webp'
import stud_at_tuit from '../../assets/teacher-helping-children-with-schoolwork-lively-classroom_1277096-5326.jpg'
import img1 from '../../assets/group-students-engages-online-learning-using-laptops-books-collaborative-space-online-learning-customizable-disproportionate-illustration_538213-148601.jpg'

const AboutPage = () => {
  return (
    <div className="about-container">
      <section className="about-header">
        <h1 className="about-title lato-bold">About EduQuest</h1>
        <p className="about-subtitle lato-regular">"Connecting students with the best teachers for home tuitions"</p>
      </section>

      <div className='image-section'>
      <section className="about-overview">
        <h2 className="overview-title lato-bold">Our Mission</h2>
        <p className="overview-description lato-regular">
          EduQuest simplifies the process of finding personalized and effective home tuition by connecting students with the best teachers in their area or any preferred location. Whether it’s for improving grades or mastering specific subjects, our platform makes the search for quality education easy and convenient.
        </p>
      </section>

      <div className='about-image-div'>
         <img src={img1} alt='About EduQuest' className='about-img'></img>
      </div>

      </div>


        <section className="about-features">
          <div className='about-feature-heading'>
             <h1 className="features-title lato-bold">What We Offer?</h1>
          </div>
          <div className="feature-list">
            <div className="feature-item item-1">
              <div className='features-img-div'>
                <img src={compr_srch} alt='Search Icon' className='features-img'></img>
              </div>
              <div className='feature-content'>
                <h3 className="feature-heading poppins-font">Find Your Perfect Tutor</h3>
                <p className="feature-description lato-regular">
                  Search for tutors by name, subject, location, syllabus board, or grade level. We give you the flexibility to find the tutor that fits your needs perfectly.
                </p>
              </div>
            </div>
            <div className="feature-item item-2">
               <div className='features-img-div'>
                <img src={det_prof} alt='Profile Icon' className='features-img'></img>
              </div>
              <div className='feature-content'>
                <h3 className="feature-heading poppins-font">Comprehensive Teacher Profiles</h3>
                <p className="feature-description lato-regular">
                  Explore complete teacher profiles, including experience, teaching philosophy, subjects taught, and reviews from other students to make an informed choice.
                </p>
              </div>
            </div>
            <div className="feature-item">
               <div className='features-img-div'>
                <img src={st_te_eng} alt='Profile Icon' className='features-img'></img>
              </div>
              <div className='feature-content'>
                <h3 className="feature-heading poppins-font">Seamless Interaction</h3>
                <p className="feature-description lato-regular">
                  Teachers can manage their profiles, post tuition offerings, and respond to reviews, while students can manage favorites and provide feedback.
                </p>
              </div>
            </div>
          </div>
        </section>



      <div className='image-section'>
      <div className='about-image-div'>
         <img src={stud_at_tuit} alt='About EduQuest' className='about-img'></img>
      </div>
      <section className="about-overview">
        <h2 className="overview-title lato-bold">Our Goal</h2>
        <p className="overview-description lato-regular">
        We aim to bridge the gap between students seeking personalized tuition and teachers offering their expertise, creating an environment where academic success is within reach for everyone.
        </p>
      </section>


      </div>
      {/* <section className="about-goal">
        <h2 className="goal-title poppins-semibold">Our Goal</h2>
        <p className="goal-description pt-serif-regular">
          We aim to bridge the gap between students seeking personalized tuition and teachers offering their expertise, creating an environment where academic success is within reach for everyone.
        </p>
      </section> */}




    </div>
  );
};

export default AboutPage;
