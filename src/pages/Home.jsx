import React from 'react';
import JobCard from '../components/JobCard';
import './Home.css';

const Home = () => {
  // This is a temporary array of data. 
  // Later, we will pull this exact format straight from your MongoDB database!
  const jobListings = [
    {
      id: 1,
      title: "IIT Guwahati Recruitment 2026 – Junior Assistant Posts",
      excerpt: "Indian Institute of Technology (IIT) Guwahati has released the official notification (Advt No. IITG/R/15/2025) for the recruitment of Junior Assistant vacancies. Eligible candidates holding a Bachelor's degree can apply online...",
      category: "Central Govt, University",
      date: "March 04, 2026",
      link: "/job-details/iit-guwahati",
      imageUrl: "https://via.placeholder.com/150x100?text=IIT+Guwahati"
    },
    {
      id: 2,
      title: "DEE Assam Merit List 2026 – Check 4500 LP & UP Teacher List",
      excerpt: "Directorate of Elementary Education (DEE), Assam has completed the online application process for 4500 posts of Assistant Teacher in Lower and Upper Primary Schools. The provisional merit list is now available...",
      category: "Result, Teaching",
      date: "March 03, 2026",
      link: "/job-details/dee-assam",
      imageUrl: "https://via.placeholder.com/150x100?text=DEE+Assam"
    },
    {
      id: 3,
      title: "PNRD Assam Recruitment 2026 – 1508 Posts, Online Apply",
      excerpt: "Commissioner, Panchayat & Rural Development (PNRD), Assam has released an employment notification for the recruitment of 1508 Vacancies on a Contractual basis. Interested candidates can check eligibility criteria...",
      category: "PNRD, State Govt",
      date: "March 02, 2026",
      link: "/job-details/pnrd-assam",
      imageUrl: "https://via.placeholder.com/150x100?text=PNRD+Assam"
    }
  ];

  return (
    <div className="home-container">
      {/* LEFT COLUMN: MAIN CONTENT */}
      <main className="main-content">
        
        {/* Alert Banners */}
        <div className="alert-banners">
          <div className="alert-box whatsapp-alert">
            <span className="alert-text">WhatsApp Channel</span>
            <button className="alert-btn green-btn">Join Now</button>
          </div>
          <div className="alert-box update-alert">
            <span className="alert-text">Quick Updates</span>
            <button className="alert-btn blue-btn">Check Now</button>
          </div>
        </div>

        {/* This loops through our array and prints a JobCard for each one! */}
        {jobListings.map((job) => (
          <JobCard 
            key={job.id}
            title={job.title}
            excerpt={job.excerpt}
            category={job.category}
            date={job.date}
            link={job.link}
            imageUrl={job.imageUrl}
          />
        ))}
        
        <hr className="divider" />
      </main>

      {/* RIGHT COLUMN: SIDEBAR */}
      <aside className="sidebar">
        <div className="widget">
          <h3 className="widget-title">Follow Us</h3>
          <div className="social-icons">
            <span className="icon">f</span>
            <span className="icon">t</span>
            <span className="icon">tg</span>
            <span className="icon">yt</span>
          </div>
        </div>

        <div className="widget promo-banner">
          <div className="banner-placeholder">
            <h3>BOOKSTORE</h3>
            <p>Study Marrow</p>
          </div>
        </div>

        <div className="widget">
          <h3 className="widget-title">🔥 Trending Topics</h3>
          <ul className="trending-list">
            <li><a href="/">Atmanirbhar Assam</a></li>
            <li><a href="/">ADRE Question Paper</a></li>
            <li><a href="/">APSC Syllabus</a></li>
            <li><a href="/">Orunodoi Scheme</a></li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Home;