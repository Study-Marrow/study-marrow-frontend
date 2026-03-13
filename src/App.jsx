import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import ReactQuill from 'react-quill-new'; 
import 'react-quill-new/dist/quill.snow.css';
import './App.css'

// 📝 Helper function to remove HTML tags AND hidden non-breaking spaces for previews
const stripHtml = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, 'text/html');
  let text = doc.body.textContent || "";
  return text.replace(/\u00A0/g, " "); 
};

// ==========================================
// 1. SHARED COMPONENTS (Header, Sidebar, Footer)
// ==========================================
function SharedHeader() {
  const [searchInput, setSearchInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/?search=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate('/');
    }
    setIsMobileMenuOpen(false); 
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="top-header">
        <div className="header-content">
          <div className="logo-area">
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src="/logo.png" alt="Study Marrow Logo" className="site-logo" />
              <h1>Study Marrow Careers</h1>
            </Link>
          </div>
          <form className="search-area" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search this website..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
        </div>
      </header>
      <nav className="main-nav">
        <div className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕ Close Menu' : '☰ Main Menu'}
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/category/Admission" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none' }}>Admission</Link></li>
          <li><Link to="/category/Admit Card" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none' }}>Admit Card</Link></li>
          <li><Link to="/category/Private Job" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none' }}>Private Job</Link></li>
          <li><Link to="/category/Result" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none' }}>Result</Link></li>
          <li><Link to="/category/Scholarship" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none' }}>Scholarship</Link></li>
          <li><Link to="/imp-links" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none' }}>Imp Links</Link></li>
          <li><Link to="/contact" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none' }}>Contact</Link></li>
        </ul>
      </nav>
    </>
  );
}

function Sidebar() {
  return (
    <div className="sidebar-column">
      
      <div className="follow-us-box sidebar-box">
        <h3>Follow Us</h3>
        <div className="official-social-icons">
          <a href="#" className="official-social-link fb" data-name="Facebook">
            <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
          </a>

          <a href="#" className="official-social-link insta" data-name="Instagram">
            <svg width="28" height="28" viewBox="0 0 24 24"><defs><radialGradient id="insta_grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(31.5 31.5 -31.5 31.5 12 12)"><stop offset="0" stopColor="#FED576"/><stop offset=".26" stopColor="#F47133"/><stop offset=".61" stopColor="#BC3081"/><stop offset="1" stopColor="#4C69D1"/></radialGradient></defs><path fill="url(#insta_grad)" d="M12 0C8.74 0 8.333.015 7.053.072 2.695.272.272 2.69.072 7.053.015 8.333 0 8.74 0 12s.015 3.667.072 4.947c.2 4.354 2.617 6.78 6.979 6.98 1.281.056 1.689.072 4.948.072s3.667-.015 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.056-1.28.072-1.689.072-4.948s-.015-3.667-.072-4.947c-.2-4.354-2.617-6.78-6.979-6.98C15.667.015 15.259 0 12 0zm0 2.16c3.203 0 3.582.016 4.85.071 2.67.121 3.602 1.09 3.723 3.723.055 1.268.07 1.648.07 4.848 0 3.202-.015 3.582-.07 4.848-.121 2.669-1.09 3.602-3.723 3.723-1.267.055-1.647.07-4.848.07-3.203 0-3.582-.015-4.848-.07-2.646-.12-3.603-1.07-3.722-3.722-.056-1.268-.07-1.648-.07-4.848 0-3.203.015-3.582.07-4.848.12-2.669 1.07-3.603 3.722-3.722 1.268-.056 1.648-.07 4.848-.07zM12 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.404-10.403a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z"/></svg>
          </a>

          <a href="#" className="official-social-link x" data-name="X (Twitter)">
            <svg width="26" height="26" viewBox="0 0 24 24"><path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>

          <a href="#" className="official-social-link yt" data-name="YouTube">
            <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>

      <div className="sidebar-box bookstore-banner">
        <h2>BOOK STORE</h2>
        <p>Coming Soon</p>
      </div>

      <div className="sidebar-box">
        <h3>📌 Notice Board</h3>
        <ul className="trending-list">
          {/* We have removed the hardcoded list! Ready for the backend. */}
        </ul>
      </div>
    </div>
  );
}

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('Subscribing...');
    try {
      const res = await fetch('https://study-marrow-backend.onrender.com/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Subscribed successfully!');
        setEmail('');
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage('❌ Error connecting to server.');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <footer className="study-footer">
      <div className="footer-container">
        <div className="footer-left">
          <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
            <img src="/logo.png" alt="Study Marrow Logo" className="footer-logo-img" />
            <h2 className="footer-logo" style={{margin: 0}}>Study Marrow Careers</h2>
          </div>
          
          <div className="footer-social-icons">
            <a href="#" className="official-social-link fb" data-name="Facebook">
              <svg width="28" height="28" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            </a>

            <a href="#" className="official-social-link insta" data-name="Instagram">
              <svg width="28" height="28" viewBox="0 0 24 24"><defs><radialGradient id="insta_grad_footer" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(31.5 31.5 -31.5 31.5 12 12)"><stop offset="0" stopColor="#FED576"/><stop offset=".26" stopColor="#F47133"/><stop offset=".61" stopColor="#BC3081"/><stop offset="1" stopColor="#4C69D1"/></radialGradient></defs><path fill="url(#insta_grad_footer)" d="M12 0C8.74 0 8.333.015 7.053.072 2.695.272.272 2.69.072 7.053.015 8.333 0 8.74 0 12s.015 3.667.072 4.947c.2 4.354 2.617 6.78 6.979 6.98 1.281.056 1.689.072 4.948.072s3.667-.015 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.056-1.28.072-1.689.072-4.948s-.015-3.667-.072-4.947c-.2-4.354-2.617-6.78-6.979-6.98C15.667.015 15.259 0 12 0zm0 2.16c3.203 0 3.582.016 4.85.071 2.67.121 3.602 1.09 3.723 3.723.055 1.268.07 1.648.07 4.848 0 3.202-.015 3.582-.07 4.848-.121 2.669-1.09 3.602-3.723 3.723-1.267.055-1.647.07-4.848.07-3.203 0-3.582-.015-4.848-.07-2.646-.12-3.603-1.07-3.722-3.722-.056-1.268-.07-1.648-.07-4.848 0-3.203.015-3.582.07-4.848.12-2.669 1.07-3.603 3.722-3.722 1.268-.056 1.648-.07 4.848-.07zM12 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.404-10.403a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z"/></svg>
            </a>

            <a href="#" className="official-social-link x" data-name="X (Twitter)">
              <svg width="26" height="26" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>

            <a href="#" className="official-social-link yt" data-name="YouTube">
              <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>

        </div>
        <div className="footer-right">
          <h3>Never Miss an Update 🔔</h3>
          <form className="subscribe-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Please Enter Your Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
            {message && <p style={{marginTop: '8px', fontSize: '0.95rem', color: '#bfdbfe', fontWeight: 'bold'}}>{message}</p>}
          </form>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <span onClick={scrollToTop} className="back-to-top" style={{cursor: 'pointer'}}>Return to top of page</span>
        <span>Copyright © 2024-2026 · Study Marrow Careers</span>
      </div>
    </footer>
  );
}

// ==========================================
// 2. PUBLIC HOME PAGE
// ==========================================
function PublicPage({ jobs }) {
  const { categoryName } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  let displayedJobs = jobs;

  if (categoryName) {
    displayedJobs = displayedJobs.filter(job => job.category === categoryName);
  }

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    displayedJobs = displayedJobs.filter(job => 
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.description.toLowerCase().includes(lowerQuery)
    );
  }

  return (
    <div className="site-wrapper">
      <SharedHeader />

      <div className="content-wrapper">
        <div className="main-column">
          <div className="quick-updates-box">
            <div className="update-row">
              <strong>WhatsApp Channel</strong>
              <button className="join-btn">Join Now</button>
            </div>
            <div className="update-row">
              <strong>Telegram Channel</strong>
              <button className="check-btn">Join Now</button>
            </div>
          </div>

          {categoryName && (
            <h2 style={{ borderBottom: '2px solid #2563eb', paddingBottom: '10px', color: '#1e3a8a' }}>
              Showing Posts for: {categoryName}
            </h2>
          )}

          {searchQuery && !categoryName && (
            <h2 style={{ borderBottom: '2px solid #2563eb', paddingBottom: '10px', color: '#1e3a8a' }}>
              Search Results for: "{searchQuery}"
            </h2>
          )}

          {displayedJobs.map((job) => (
            <div key={job._id} className="list-job-card">
              <Link to={`/job/${job._id}`} style={{ textDecoration: 'none' }}>
                <h2 className="list-job-title">
                  {job.company} Recruitment 2026 - {job.title}
                </h2>
              </Link>
              
              <div className="list-job-body">
                <div className="job-logo-box">
                  {job.imageUrl ? (
                    <img src={job.imageUrl} alt={`${job.company} Logo`} className="logo-image" />
                  ) : (
                    <div className="logo-placeholder-top">Logo</div>
                  )}
                  <div className="logo-placeholder-bottom">{job.company.substring(0,10)}</div>
                </div>
                
                <div className="job-text-content">
                  <p style={{ margin: '0 0 15px 0', color: '#334155', lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                    <strong>🏢 Organization:</strong> {job.company} {job.location ? `(${job.location})` : ''}<br/>
                    <strong>⏳ Last Date:</strong> {job.deadline}<br/><br/>
                    {stripHtml(job.description).substring(0, 180)}...
                  </p>
                  <Link to={`/job/${job._id}`} className="read-more-link">Read more »</Link>
                  <div className="job-meta">
                    <p>📁 Category: {job.category || 'General'} | 🕒 Updated: {new Date(job.datePosted || Date.now()).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {displayedJobs.length === 0 && (
            <p style={{padding: '20px', fontSize: '1.1rem', color: '#666'}}>
              No updates or matches found. Please try a different search!
            </p>
          )}

          {displayedJobs.length > 0 && !searchQuery && (
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <button className="older-posts-btn">Older Posts</button>
            </div>
          )}
        </div>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

// ==========================================
// 3. INDIVIDUAL JOB DETAILS PAGE
// ==========================================
function JobDetailsPage({ jobs }) {
  const { id } = useParams();
  const job = jobs.find((j) => j._id === id);

  if (!job) {
    return (
      <div className="site-wrapper">
        <SharedHeader />
        <div style={{ padding: '50px', textAlign: 'center' }}><h2>Loading details...</h2></div>
      </div>
    );
  }

  // 📝 NEW: Automatically clean up any hidden superglue formatting before it renders
  const cleanDescription = job.description ? job.description.replace(/&nbsp;|\u00A0/g, ' ') : '';

  return (
    <div className="site-wrapper">
      <SharedHeader />
      <div className="content-wrapper">
        <div className="main-column" style={{ padding: '20px' }}>
          
          <div className="quick-updates-box" style={{ marginBottom: '15px' }}>
            <div className="update-row">
              <strong>WhatsApp Channel</strong>
              <button className="join-btn">Join Now</button>
            </div>
            <div className="update-row">
              <strong>Telegram Channel</strong>
              <button className="check-btn">Join Now</button>
            </div>
          </div>

          <div className="breadcrumb">
            Home » {job.category || 'General'} » {job.company}
          </div>

          <h1 className="details-main-title">
            {job.company} Recruitment 2026 – {job.title}
          </h1>

          <div className="details-meta">
            <p><strong>Organization: {job.company}</strong><br/>
            <strong>Last Date: {job.deadline}</strong></p>
          </div>

          {/* 📝 NEW: Enforced strict CSS word wrapping rules here */}
          <div 
            className="details-intro" 
            style={{ 
              marginBottom: '30px', 
              fontSize: '1.05rem', 
              lineHeight: '1.6',
              wordWrap: 'break-word', 
              overflowWrap: 'break-word', 
              whiteSpace: 'normal' 
            }}
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
          ></div>

          {[1, 2, 3, 4].map((num) => {
            const heading = job[`section${num}Heading`];
            const details = job[`section${num}Details`];
            
            // 📝 NEW: Clean the details section too
            const cleanDetails = details ? details.replace(/&nbsp;|\u00A0/g, ' ') : '';

            if (heading || details) {
              return (
                <div key={num}>
                  {heading && <h2 className="gradient-header">{heading}</h2>}
                  {details && (
                    <div className="details-content" style={{
                      lineHeight: '1.6',
                      wordWrap: 'break-word', 
                      overflowWrap: 'break-word', 
                      whiteSpace: 'normal',
                      overflowX: 'auto' // Prevents wide tables from breaking the page
                    }}>
                      <div dangerouslySetInnerHTML={{ __html: cleanDetails }}></div>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}

          <h2 id="links" className="gradient-header">Important Web-Links</h2>
          <table className="links-table">
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                const linkName = job[`link${num}Name`];
                const linkUrl = job[`link${num}Url`];
                
                if (linkName && linkUrl) {
                  return (
                    <tr key={num}>
                      <td><strong>{linkName}</strong></td>
                      <td style={{ textAlign: 'center', width: '150px' }}>
                        <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="click-here-btn">Click Here</a>
                      </td>
                    </tr>
                  );
                }
                return null; 
              })}
            </tbody>
          </table>

          <div className="bottom-social-box">
            <div className="social-row" style={{ backgroundColor: '#e6f4ea' }}>
              <strong>WhatsApp Channel</strong>
              <button className="join-btn">Join Now</button>
            </div>
            <div className="social-row" style={{ backgroundColor: '#e0e7ff' }}>
              <strong>Telegram Channel</strong>
              <button className="check-btn" style={{ backgroundColor: '#2563eb' }}>Join Now</button>
            </div>
          </div>
        </div>

        <Sidebar />
      </div>

      <Footer />
    </div>
  );
}

// ==========================================
// 4. IMPORTANT LINKS PAGE
// ==========================================
function ImpLinksPage({ impLinks }) {
  return (
    <div className="site-wrapper">
      <SharedHeader />
      <div className="content-wrapper">
        <div className="main-column" style={{ padding: '20px' }}>
          
          <div className="quick-updates-box" style={{ marginBottom: '30px' }}>
            <div className="update-row"><strong>WhatsApp Channel</strong><button className="join-btn">Join Now</button></div>
            <div className="update-row"><strong>Telegram Channel</strong><button className="check-btn">Join Now</button></div>
          </div>

          <h2 style={{color: '#1e3a8a', fontSize: '2.2rem', margin: '0 0 15px 0'}}>Documents and Links</h2>
          
          <p style={{fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '30px'}}>
            Explore a curated collection of free, essential resources tailored to support students, job hunters, and aspiring entrepreneurs in their academic and professional journeys.
          </p>

          <table className="links-table">
            <tbody>
              {impLinks.map((link) => (
                <tr key={link._id}>
                  <td>{link.name}</td>
                  <td style={{ textAlign: 'center', width: '150px' }}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="click-here-btn">Click Here</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {impLinks.length === 0 && (
            <p style={{textAlign: 'center', padding: '20px', color: '#888'}}>No important links have been added yet.</p>
          )}

        </div>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

// ==========================================
// 5. DEDICATED CONTACT US PAGE
// ==========================================
function ContactPage({ contacts }) {
  return (
    <div className="site-wrapper">
      <SharedHeader />
      <div className="content-wrapper">
        <div className="main-column" style={{ padding: '20px' }}>
          
          <div className="quick-updates-box" style={{ marginBottom: '30px' }}>
            <div className="update-row"><strong>WhatsApp Channel</strong><button className="join-btn">Join Now</button></div>
            <div className="update-row"><strong>Telegram Channel</strong><button className="check-btn">Join Now</button></div>
          </div>

          <h2 style={{color: '#1e3a8a', fontSize: '2.2rem', margin: '0 0 15px 0'}}>Contact Us</h2>
          
          <p style={{fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '15px'}}>
            Our platform grows stronger with your insights! If you spot an error, please let us know so we can fix it right away. We are always eager to hear your ideas, constructive feedback, and any updates you might have regarding job openings or upcoming competitive exams. Additionally, we are open to discussing opportunities for institutional promotions.
          </p>
          <p style={{fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '30px'}}>
            Feel free to reach out to us via the following platforms.
          </p>

          <table className="links-table">
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td style={{width: '30%'}}><strong>{c.platform}</strong></td>
                  <td>
                    {c.isLink ? (
                      <a href={c.value} target="_blank" rel="noopener noreferrer" className="click-here-btn">Click Here</a>
                    ) : (
                      <span>{c.value}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

// ==========================================
// DEFAULT FORM BLANK STATE 
// ==========================================
const defaultFormState = { 
  title: '', company: '', imageUrl: '', location: '', description: '', deadline: '', category: 'General',
  section1Heading: 'Vacancy Details', section1Details: '',
  section2Heading: 'Eligibility Criteria', section2Details: '',
  section3Heading: 'How to Apply', section3Details: '',
  section4Heading: 'Important Dates', section4Details: '',
  link1Name: 'Online Application Form', link1Url: '',
  link2Name: '', link2Url: '', link3Name: '', link3Url: '', link4Name: '', link4Url: '',
  link5Name: '', link5Url: '', link6Name: '', link6Url: '', link7Name: '', link7Url: ''
};

// ==========================================
// 6. SECURE ADMIN VIEW
// ==========================================
function AdminPage({ fetchJobs, jobs, fetchImpLinks, impLinks, fetchContacts, contacts }) {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));
  const [passwordInput, setPasswordInput] = useState('');
  
  const [editJobId, setEditJobId] = useState(null); 
  const [formData, setFormData] = useState(defaultFormState);

  const [impLinkForm, setImpLinkForm] = useState({ name: '', url: '' });

  const [editContactId, setEditContactId] = useState(null);
  const [contactForm, setContactForm] = useState({ platform: '', value: '', isLink: false });

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  const getDeleteHeaders = () => ({
    'Authorization': `Bearer ${token}`
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://study-marrow-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await res.json();
      
      if (data.success) {
        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', data.token); 
      } else {
        alert('❌ Incorrect Password! Access Denied.');
        setPasswordInput('');
      }
    } catch (err) {
      alert('❌ Server error. Make sure your backend is live!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIsAuthenticated(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleQuillChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (job) => {
    setEditJobId(job._id);
    setFormData({
      title: job.title || '', company: job.company || '', imageUrl: job.imageUrl || '', location: job.location || '', description: job.description || '',
      deadline: job.deadline || '', category: job.category || 'General',
      section1Heading: job.section1Heading || '', section1Details: job.section1Details || '',
      section2Heading: job.section2Heading || '', section2Details: job.section2Details || '',
      section3Heading: job.section3Heading || '', section3Details: job.section3Details || '',
      section4Heading: job.section4Heading || '', section4Details: job.section4Details || '',
      link1Name: job.link1Name || '', link1Url: job.link1Url || '',
      link2Name: job.link2Name || '', link2Url: job.link2Url || '',
      link3Name: job.link3Name || '', link3Url: job.link3Url || '',
      link4Name: job.link4Name || '', link4Url: job.link4Url || '',
      link5Name: job.link5Name || '', link5Url: job.link5Url || '',
      link6Name: job.link6Name || '', link6Url: job.link6Url || '',
      link7Name: job.link7Name || '', link7Url: job.link7Url || ''
    });
    window.scrollTo(0, 0);
  };

  const handleCancelEdit = () => {
    setEditJobId(null);
    setFormData(defaultFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editJobId ? 'PUT' : 'POST';
    const url = editJobId ? `https://study-marrow-backend.onrender.com/api/jobs/${editJobId}` : 'https://study-marrow-backend.onrender.com/api/jobs';
    try {
      const response = await fetch(url, {
        method: method,
        headers: getAuthHeaders(), 
        body: JSON.stringify(formData)
      });
      if (response.status === 401) return alert('Session expired! Please log out and back in.');
      
      if (response.ok) {
        alert(editJobId ? 'Post updated successfully!' : 'Post published successfully!');
        setFormData(defaultFormState);
        setEditJobId(null); 
        fetchJobs(); 
      }
    } catch (error) { console.error("Error posting/updating job:", error); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`https://study-marrow-backend.onrender.com/api/jobs/${id}`, { 
          method: 'DELETE',
          headers: getDeleteHeaders() 
        });
        if (response.status === 401) return alert('Session expired! Please log out and back in.');
        if (response.ok) fetchJobs();
      } catch (error) { console.error("Error deleting job:", error); }
    }
  };

  const handleImpLinkSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://study-marrow-backend.onrender.com/api/implinks', {
        method: 'POST',
        headers: getAuthHeaders(), 
        body: JSON.stringify(impLinkForm)
      });
      if (response.status === 401) return alert('Session expired! Please log out and back in.');
      if (response.ok) {
        alert('Global Link Added!');
        setImpLinkForm({ name: '', url: '' });
        fetchImpLinks(); 
      }
    } catch (error) { console.error("Error adding link:", error); }
  };

  const handleImpLinkDelete = async (id) => {
    if (window.confirm("Delete this link from the Download page?")) {
      try {
        const response = await fetch(`https://study-marrow-backend.onrender.com/api/implinks/${id}`, { 
          method: 'DELETE',
          headers: getDeleteHeaders() 
        });
        if (response.status === 401) return alert('Session expired! Please log out and back in.');
        if (response.ok) fetchImpLinks();
      } catch (error) { console.error("Error deleting link:", error); }
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const method = editContactId ? 'PUT' : 'POST';
    const url = editContactId ? `https://study-marrow-backend.onrender.com/api/contacts/${editContactId}` : 'https://study-marrow-backend.onrender.com/api/contacts';
    try {
      const response = await fetch(url, { 
        method: method, 
        headers: getAuthHeaders(), 
        body: JSON.stringify(contactForm) 
      });
      if (response.status === 401) return alert('Session expired! Please log out and back in.');
      if(response.ok) {
        setContactForm({ platform: '', value: '', isLink: false });
        setEditContactId(null);
        fetchContacts(); 
      }
    } catch (error) { console.error("Error saving contact:", error); }
  };

  const handleContactEdit = (c) => { 
    setEditContactId(c._id); 
    setContactForm({ platform: c.platform, value: c.value, isLink: c.isLink }); 
  };
  
  const handleContactDelete = async (id) => { 
    if (window.confirm("Delete this contact info?")) { 
      const response = await fetch(`https://study-marrow-backend.onrender.com/api/contacts/${id}`, { 
        method: 'DELETE',
        headers: getDeleteHeaders() 
      }); 
      if (response.status === 401) return alert('Session expired! Please log out and back in.');
      fetchContacts(); 
    } 
  };

  const moveContact = async (index, direction) => {
    const newContacts = [...contacts];
    if (direction === 'up' && index > 0) {
      const temp = newContacts[index].order;
      newContacts[index].order = newContacts[index - 1].order;
      newContacts[index - 1].order = temp;
    } else if (direction === 'down' && index < newContacts.length - 1) {
      const temp = newContacts[index].order;
      newContacts[index].order = newContacts[index + 1].order;
      newContacts[index + 1].order = temp;
    } else return; 

    await fetch(`https://study-marrow-backend.onrender.com/api/contacts/${newContacts[index]._id}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify({ order: newContacts[index].order }) });
    await fetch(`https://study-marrow-backend.onrender.com/api/contacts/${direction === 'up' ? newContacts[index-1]._id : newContacts[index+1]._id}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify({ order: direction === 'up' ? newContacts[index-1].order : newContacts[index+1].order }) });
    
    fetchContacts(); 
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container" style={{padding: '50px'}}>
        <form className="job-form" onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
          <h2>🔒 Secure Admin Access</h2>
          <input type="password" placeholder="Enter Master Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px' }} />
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none' }}>Unlock Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container" style={{padding: '50px', backgroundColor: '#f4f4f4', minHeight: '100vh'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>⚙️ Secure Admin Dashboard</h2>
        <div style={{display: 'flex', gap: '10px'}}>
          <Link to="/"><button style={{padding: '10px', cursor: 'pointer', backgroundColor: '#fff', border: '1px solid #ccc'}}>🏠 Public Site</button></Link>
          <button onClick={handleLogout} style={{padding: '10px', cursor: 'pointer', backgroundColor: '#ef4444', color: 'white', border: 'none'}}>🔓 Logout</button>
        </div>
      </div>
      
      <h3 style={{color: editJobId ? '#3b82f6' : '#10b981', margin: '0 0 20px 0'}}>
        {editJobId ? '✏️ Updating Existing Post' : '📝 Create New Post'}
      </h3>

      <form className="job-form" onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
        
        <select name="category" value={formData.category} onChange={handleChange} required style={{padding: '10px', fontSize: '1rem', border: '1px solid #cbd5e1', borderRadius: '4px'}}>
          <option value="General">General (Main Feed Only)</option>
          <option value="Admission">Admission</option>
          <option value="Admit Card">Admit Card</option>
          <option value="Private Job">Private Job</option>
          <option value="Result">Result</option>
          <option value="Scholarship">Scholarship</option>
        </select>

        <input type="text" name="title" placeholder="Post Title (e.g. IDBI Bank Assistant Manager)" value={formData.title} onChange={handleChange} required style={{padding: '10px'}}/>
        <input type="text" name="company" placeholder="Institution / Organization Name" value={formData.company} onChange={handleChange} required style={{padding: '10px'}}/>
        <input type="url" name="imageUrl" placeholder="Logo Image URL (Optional: Paste link from internet)" value={formData.imageUrl} onChange={handleChange} style={{padding: '10px'}}/>
        <input type="text" name="location" placeholder="Location (Optional)" value={formData.location} onChange={handleChange} style={{padding: '10px'}}/>
        
        <p style={{ margin: '10px 0 0 0', fontWeight: 'bold', color: '#1e3a8a' }}>Introduction / Brief Details</p>
        
        <div style={{ backgroundColor: 'white', marginBottom: '40px' }}>
          <ReactQuill 
            theme="snow" 
            value={formData.description || ''} 
            onChange={(val) => handleQuillChange(val, 'description')} 
            style={{ height: '150px' }}
          />
        </div>

        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required style={{padding: '10px', marginTop: '30px'}}/>

        <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', marginTop: '15px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#1e3a8a' }}>Dynamic Content Sections</h3>
          <p style={{fontSize: '0.9rem', color: '#64748b', marginTop: 0}}>Use the rich text editor to bold text, add bullet points, etc.</p>
          
          {[1, 2, 3, 4].map((num) => (
            <div key={num} style={{ marginBottom: '60px', borderBottom: num !== 4 ? '1px solid #cbd5e1' : 'none', paddingBottom: '20px' }}>
              <input 
                type="text" 
                name={`section${num}Heading`} 
                placeholder={`Section ${num} Heading`} 
                value={formData[`section${num}Heading`]} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '10px', marginBottom: '8px', fontWeight: 'bold', boxSizing: 'border-box' }}
              />
              <div style={{ backgroundColor: 'white', marginBottom: '40px' }}>
                <ReactQuill 
                  theme="snow" 
                  value={formData[`section${num}Details`] || ''} 
                  onChange={(val) => handleQuillChange(val, `section${num}Details`)} 
                  style={{ height: '150px' }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', marginTop: '15px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#1e3a8a' }}>Custom Web Links (Fill up to 7)</h3>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div key={num} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input type="text" name={`link${num}Name`} placeholder={`Link ${num} Name`} value={formData[`link${num}Name`]} onChange={handleChange} style={{flex: 1, padding: '8px'}} required={num === 1} />
              <input type="url" name={`link${num}Url`} placeholder={`Link ${num} URL (https://...)`} value={formData[`link${num}Url`]} onChange={handleChange} style={{flex: 2, padding: '8px'}} required={num === 1} />
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{flex: 1, padding: '15px', backgroundColor: editJobId ? '#3b82f6' : '#10b981', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>
            {editJobId ? 'Update Post' : 'Publish Update'}
          </button>
          
          {editJobId && (
            <button type="button" onClick={handleCancelEdit} style={{padding: '15px', backgroundColor: '#64748b', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <h2>Manage Active Posts</h2>
      {jobs.map((job) => (
        <div key={job._id} style={{backgroundColor: 'white', padding: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div><strong style={{color: '#2563eb'}}>({job.category || 'Uncategorized'})</strong> {job.title} - {job.company}</div>
          <div>
            <button onClick={() => handleEditClick(job)} style={{backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px 15px', marginRight: '10px', cursor: 'pointer'}}>Edit</button>
            <button onClick={() => handleDelete(job._id)} style={{backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer'}}>Delete</button>
          </div>
        </div>
      ))}

      <hr style={{ margin: '50px 0', border: '1px solid #ccc' }} />
      <h2 style={{color: '#1e3a8a'}}>🔗 Manage "Imp Links" Page</h2>
      
      <form onSubmit={handleImpLinkSubmit} style={{ backgroundColor: 'white', padding: '20px', display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input type="text" placeholder="Link Display Name (e.g. Standard Form of Application)" value={impLinkForm.name} onChange={(e) => setImpLinkForm({...impLinkForm, name: e.target.value})} required style={{flex: 1, padding: '10px'}}/>
        <input type="url" placeholder="URL (https://...)" value={impLinkForm.url} onChange={(e) => setImpLinkForm({...impLinkForm, url: e.target.value})} required style={{flex: 2, padding: '10px'}}/>
        <button type="submit" style={{padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>Add to Imp Links</button>
      </form>

      {impLinks.map((link) => (
        <div key={link._id} style={{backgroundColor: '#f8fafc', padding: '10px 15px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0'}}>
          <div><strong>{link.name}</strong> </div>
          <button onClick={() => handleImpLinkDelete(link._id)} style={{backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer'}}>Delete</button>
        </div>
      ))}

      <hr style={{ margin: '50px 0', border: '1px solid #ccc' }} />
      <h2 style={{color: '#1e3a8a'}}>📞 Manage "Contact Us" Page</h2>
      
      <form onSubmit={handleContactSubmit} style={{ backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <h4 style={{margin: 0}}>{editContactId ? 'Editing Contact Info' : 'Add New Contact Info'}</h4>
        <div style={{display: 'flex', gap: '10px'}}>
          <input type="text" placeholder="Platform (e.g. Email, WhatsApp, Facebook)" value={contactForm.platform} onChange={(e) => setContactForm({...contactForm, platform: e.target.value})} required style={{flex: 1, padding: '10px'}}/>
          <input type="text" placeholder="Details (e.g. editor@... OR https://...)" value={contactForm.value} onChange={(e) => setContactForm({...contactForm, value: e.target.value})} required style={{flex: 2, padding: '10px'}}/>
        </div>
        
        <label style={{display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold'}}>
          <input type="checkbox" checked={contactForm.isLink} onChange={(e) => setContactForm({...contactForm, isLink: e.target.checked})} style={{width: '20px', height: '20px'}}/>
          Check this box if the Details field is a Website URL (It will render as a blue "Click Here" button)
        </label>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{padding: '10px 20px', backgroundColor: editContactId ? '#3b82f6' : '#22c55e', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>
            {editContactId ? 'Update Contact' : 'Add Contact'}
          </button>
          {editContactId && (
            <button type="button" onClick={() => {setEditContactId(null); setContactForm({platform:'', value:'', isLink: false})}} style={{padding: '10px 20px', backgroundColor: '#64748b', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {contacts.map((c, index) => (
        <div key={c._id} style={{backgroundColor: '#f8fafc', padding: '10px 15px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0'}}>
          <div><strong>{c.platform}:</strong> {c.isLink ? '[Click Here Link]' : c.value}</div>
          
          <div style={{display: 'flex', gap: '8px'}}>
            <button type="button" onClick={() => moveContact(index, 'up')} disabled={index === 0} style={{padding: '6px 10px', cursor: index === 0 ? 'not-allowed' : 'pointer'}}>⬆️</button>
            <button type="button" onClick={() => moveContact(index, 'down')} disabled={index === contacts.length - 1} style={{padding: '6px 10px', cursor: index === contacts.length - 1 ? 'not-allowed' : 'pointer'}}>⬇️</button>
            
            <button type="button" onClick={() => handleContactEdit(c)} style={{backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer'}}>Edit</button>
            <button type="button" onClick={() => handleContactDelete(c._id)} style={{backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer'}}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 7. MAIN APP ROUTER 
// ==========================================
function App() {
  const [jobs, setJobs] = useState([]);
  const [impLinks, setImpLinks] = useState([]); 
  const [contacts, setContacts] = useState([]); 

  const fetchJobs = () => {
    fetch('https://study-marrow-backend.onrender.com/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  };

  const fetchImpLinks = () => {
    fetch('https://study-marrow-backend.onrender.com/api/implinks')
      .then(res => res.json())
      .then(data => setImpLinks(data))
      .catch(err => console.error(err));
  };

  const fetchContacts = () => { 
    fetch('https://study-marrow-backend.onrender.com/api/contacts')
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error(err)); 
  };

  useEffect(() => {
    fetchJobs();
    fetchImpLinks(); 
    fetchContacts(); 
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicPage jobs={jobs} />} />
        <Route path="/category/:categoryName" element={<PublicPage jobs={jobs} />} />
        <Route path="/imp-links" element={<ImpLinksPage impLinks={impLinks} />} />
        <Route path="/contact" element={<ContactPage contacts={contacts} />} />
        <Route path="/job/:id" element={<JobDetailsPage jobs={jobs} />} />
        
        <Route path="/syn-world-23" element={
          <AdminPage 
            fetchJobs={fetchJobs} jobs={jobs} 
            fetchImpLinks={fetchImpLinks} impLinks={impLinks} 
            fetchContacts={fetchContacts} contacts={contacts} 
          />} 
        />
      </Routes>
    </Router>
  );
}

export default App;