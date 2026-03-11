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
        
        {/* 1. FOLLOW US WIDGET */}
        <div className="follow-us-box sidebar-box">
          <h3>Follow Us</h3>
          <div className="official-social-icons">
            {/* FACEBOOK */}
            <a href="#" className="official-social-link fb" data-name="Facebook">
              <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            </a>

            {/* INSTAGRAM (stopColor fixed for React) */}
            <a href="#" className="official-social-link insta" data-name="Instagram">
              <svg width="28" height="28" viewBox="0 0 24 24"><defs><radialGradient id="insta_grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(31.5 31.5 -31.5 31.5 12 12)"><stop offset="0" stopColor="#FED576"/><stop offset=".26" stopColor="#F47133"/><stop offset=".61" stopColor="#BC3081"/><stop offset="1" stopColor="#4C69D1"/></radialGradient></defs><path fill="url(#insta_grad)" d="M12 0C8.74 0 8.333.015 7.053.072 2.695.272.272 2.69.072 7.053.015 8.333 0 8.74 0 12s.015 3.667.072 4.947c.2 4.354 2.617 6.78 6.979 6.98 1.281.056 1.689.072 4.948.072s3.667-.015 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.056-1.28.072-1.689.072-4.948s-.015-3.667-.072-4.947c-.2-4.354-2.617-6.78-6.979-6.98C15.667.015 15.259 0 12 0zm0 2.16c3.203 0 3.582.016 4.85.071 2.67.121 3.602 1.09 3.723 3.723.055 1.268.07 1.648.07 4.848 0 3.202-.015 3.582-.07 4.848-.121 2.669-1.09 3.602-3.723 3.723-1.267.055-1.647.07-4.848.07-3.203 0-3.582-.015-4.848-.07-2.646-.12-3.603-1.07-3.722-3.722-.056-1.268-.07-1.648-.07-4.848 0-3.203.015-3.582.07-4.848.12-2.669 1.07-3.603 3.722-3.722 1.268-.056 1.648-.07 4.848-.07zM12 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.404-10.403a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z"/></svg>
            </a>

            {/* X (TWITTER) */}
            <a href="#" className="official-social-link x" data-name="X (Twitter)">
              <svg width="26" height="26" viewBox="0 0 24 24"><path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>

            {/* YOUTUBE */}
            <a href="#" className="official-social-link yt" data-name="YouTube">
              <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        {/* 2. BOOK STORE BANNER */}
        <div className="bookstore-banner">
          <h2>BOOK STORE</h2>
          <p>Coming Soon</p>
        </div>

        {/* 3. TRENDING TOPICS */}
        <div className="sidebar-box">
          <h3>🔥 Trending Topics</h3>
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