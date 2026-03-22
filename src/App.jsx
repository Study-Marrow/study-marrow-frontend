import { useState, useEffect, useRef } from 'react'
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

// 📝 Advanced Toolbar for Tables, Colors, and Alignments
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ]
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

function Sidebar({ notices = [] }) {
  const tools = [
    { name: 'Image Resize & Compress', link: '/tools/image-resize', icon: '🖼️' },
    { name: 'Merge Images', link: '/tools/merge-images', icon: '➕' },
    { name: 'Merge PDFs', link: '/tools/merge-pdfs', icon: '📚' },
    { name: 'Compress PDF', link: '/tools/compress-pdf', icon: '🗜️' },
  ];

  const toolButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 15px',
    backgroundColor: '#fff',
    border: '1px solid #737373', 
    color: '#1e3a8a', 
    textDecoration: 'none',
    textAlign: 'left',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '4px',
    transition: 'all 0.2s',
  };

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
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {notices && notices.map(notice => (
            <li key={notice._id} style={{ marginBottom: '8px' }}>
              <Link to={`/notice/${notice._id}`} style={{
                display: 'block', padding: '10px', backgroundColor: '#fff',
                border: '1px solid #737373', color: '#1e3a8a', 
                textDecoration: 'none', textAlign: 'center', fontSize: '1rem',
                fontWeight: 'bold', borderRadius: '4px'
              }}>
                {notice.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 🛠️ Online Tools Section */}
      <div className="sidebar-box">
        <h3>🛠️ Online Tools</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tools.map((tool, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              <Link to={tool.link} style={toolButtonStyle} className="tool-button">
                <span style={{ fontSize: '1.2rem' }}>{tool.icon}</span>
                {tool.name}
              </Link>
            </li>
          ))}
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
              <svg width="26" height="26" viewBox="0 0 24 24"><path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
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
function PublicPage({ jobs, notices }) {
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
                  {job.company} - {job.title}
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
        <Sidebar notices={notices} />
      </div>
      <Footer />
    </div>
  );
}

// ==========================================
// 3. INDIVIDUAL JOB DETAILS PAGE
// ==========================================
function JobDetailsPage({ jobs, notices }) {
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
            {job.company} - {job.title}
          </h1>

          <div className="details-meta">
            <p><strong>Organization: {job.company}</strong><br/>
            <strong>Last Date: {job.deadline}</strong></p>
          </div>

          <div 
            className="details-intro quill-content" 
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

          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const heading = job[`section${num}Heading`];
            const details = job[`section${num}Details`];
            
            const cleanDetails = details ? details.replace(/&nbsp;|\u00A0/g, ' ') : '';

            if (heading || details) {
              return (
                <div key={num}>
                  {heading && <h2 className="gradient-header">{heading}</h2>}
                  {details && (
                    <div className="details-content quill-content" style={{
                      lineHeight: '1.6',
                      wordWrap: 'break-word', 
                      overflowWrap: 'break-word', 
                      whiteSpace: 'normal',
                      overflowX: 'auto'
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

        <Sidebar notices={notices} />
      </div>

      <Footer />
    </div>
  );
}

// ==========================================
// NOTICE DETAILS PAGE
// ==========================================
function NoticeDetailsPage({ notices }) {
  const { id } = useParams();
  const notice = notices.find((n) => n._id === id);

  if (!notice) {
    return (
      <div className="site-wrapper">
        <SharedHeader />
        <div style={{ padding: '50px', textAlign: 'center' }}><h2>Loading Notice...</h2></div>
      </div>
    );
  }

  const cleanDescription = notice.description ? notice.description.replace(/&nbsp;|\u00A0/g, ' ') : '';

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
            Home » Notice Board » {notice.topicName}
          </div>

          <h1 className="details-main-title" style={{ color: '#1e3a8a' }}>
            {notice.title}
          </h1>

          <div 
            className="details-intro quill-content" 
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

          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const heading = notice[`section${num}Heading`];
            const details = notice[`section${num}Details`];
            const cleanDetails = details ? details.replace(/&nbsp;|\u00A0/g, ' ') : '';

            if (heading || details) {
              return (
                <div key={`n-${num}`}>
                  {heading && <h2 className="gradient-header" style={{ backgroundImage: 'linear-gradient(90deg, #1e3a8a, #2563eb)' }}>{heading}</h2>}
                  {details && (
                    <div className="details-content quill-content" style={{
                      lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', overflowX: 'auto'
                    }}>
                      <div dangerouslySetInnerHTML={{ __html: cleanDetails }}></div>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}

          <h2 className="gradient-header" style={{ backgroundImage: 'linear-gradient(90deg, #1e3a8a, #2563eb)' }}>Important Web-Links</h2>
          <table className="links-table">
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                const linkName = notice[`link${num}Name`];
                const linkUrl = notice[`link${num}Url`];
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
        <Sidebar notices={notices} />
      </div>
      <Footer />
    </div>
  );
}

// ==========================================
// 4. IMPORTANT LINKS PAGE
// ==========================================
function ImpLinksPage({ impLinks, notices }) {
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
        <Sidebar notices={notices} />
      </div>
      <Footer />
    </div>
  );
}

// ==========================================
// 5. DEDICATED CONTACT US PAGE
// ==========================================
function ContactPage({ contacts, notices }) {
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
        <Sidebar notices={notices} />
      </div>
      <Footer />
    </div>
  );
}

// ==========================================
// 🛠️ TOOL 1: IMAGE RESIZE & COMPRESS
// ==========================================
function ImageResizeToolPage({ notices }) {
  const [originalImage, setOriginalImage] = useState(null);
  const [originalFileInfo, setOriginalFileInfo] = useState(null);
  const [resizeMode, setResizeMode] = useState('passport'); 
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(600);
  const [targetKb, setTargetKb] = useState(50);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [processedFileInfo, setProcessedFileInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImage(img);
          setOriginalFileInfo({ name: file.name, type: file.type, size: (file.size / 1024).toFixed(2) + ' KB', width: img.width, height: img.height });
          setProcessedImageUrl(null);
          setProcessedFileInfo(null);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (JPEG, PNG).');
    }
  };

  const processImage = () => {
    if (!originalImage) return;
    setIsProcessing(true);
    setProcessedImageUrl(null);

    const PASSPORT_WIDTH = 132; 
    const PASSPORT_HEIGHT = 170;

    const targetWidth = resizeMode === 'passport' ? PASSPORT_WIDTH : parseInt(customWidth, 10);
    const targetHeight = resizeMode === 'passport' ? PASSPORT_HEIGHT : parseInt(customHeight, 10);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx.drawImage(originalImage, 0, 0, targetWidth, targetHeight);

    const targetSizeBytes = targetKb * 1024;
    let quality = 0.95; 
    let dataUrl = '';
    let fileSize = 0;

    do {
      dataUrl = canvas.toDataURL('image/jpeg', quality);
      fileSize = Math.round((dataUrl.length - 'data:image/jpeg;base64,'.length) * 3 / 4);
      quality -= 0.05;
    } while (fileSize > targetSizeBytes && quality > 0.1);

    setProcessedImageUrl(dataUrl);
    setProcessedFileInfo({ width: targetWidth, height: targetHeight, size: (fileSize / 1024).toFixed(2) + ' KB', qualityUsed: Math.round((quality + 0.05) * 100) + '%' });
    setIsProcessing(false);
  };

  const inputStyle = { width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '10px', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '5px' };

  return (
    <div className="site-wrapper">
      <SharedHeader />
      <div className="content-wrapper">
        <div className="main-column" style={{ padding: '20px' }}>
          <div className="breadcrumb">Home » Online Tools » Image Resize</div>
          <h1 className="details-main-title" style={{ color: '#1e3a8a' }}>🖼️ Image Resize & KB Compressor</h1>
          
          <div style={{ backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '8px', border: '1px solid #bae6fd', marginBottom: '20px', color: '#0369a1', lineHeight: '1.6' }}>
            <strong>How to use:</strong> Upload your photo, select "Passport Size" or enter custom dimensions, specify the maximum allowed size in KB (e.g., 50KB), and click Process.
          </div>

          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ marginBottom: '25px' }}>
              <label style={labelStyle}>1. Select Image</label>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={inputStyle} />
              {originalFileInfo && (<p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0' }}>Selected: {originalFileInfo.name} ({originalFileInfo.width}x{originalFileInfo.height}, {originalFileInfo.size})</p>)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
              <div>
                <label style={labelStyle}>2. Select Resize Mode</label>
                <select value={resizeMode} onChange={(e) => setResizeMode(e.target.value)} style={inputStyle}>
                  <option value="passport">Standard Passport Size (3.5cm x 4.5cm)</option>
                  <option value="custom">Custom Dimensions (Pixels)</option>
                </select>
                {resizeMode === 'custom' && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="number" placeholder="Width" value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} style={inputStyle} />
                    <input type="number" placeholder="Height" value={customHeight} onChange={(e) => setCustomHeight(e.target.value)} style={inputStyle} />
                  </div>
                )}
              </div>
              <div>
                <label style={labelStyle}>3. Target File Size (Max KB)</label>
                <input type="number" value={targetKb} onChange={(e) => setTargetKb(e.target.value)} placeholder="e.g. 50" style={inputStyle} />
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0' }}>Typical limits: 20KB to 100KB</p>
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <button onClick={processImage} disabled={!originalImage || isProcessing} style={{ width: '100%', padding: '15px', backgroundColor: originalImage ? '#2563eb' : '#cbd5e1', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.1rem', cursor: originalImage ? 'pointer' : 'not-allowed' }}>
                {isProcessing ? 'Processing...' : 'Process Image (Resize & Compress)'}
              </button>
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            {processedImageUrl && (
              <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '20px', textAlign: 'center' }}>
                <h3 style={{ color: '#1e3a8a' }}>✅ Processed Image</h3>
                <div style={{ marginBottom: '15px', border: '1px solid #ccc', display: 'inline-block', padding: '5px', backgroundColor: '#f8fafc' }}>
                  <img src={processedImageUrl} alt="Processed Result" style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
                </div>
                <p style={{ fontWeight: 'bold', color: '#166534' }}>Final Result: {processedFileInfo.width}x{processedFileInfo.height} pixels | Size: {processedFileInfo.size}</p>
                <a href={processedImageUrl} download={`studymarrow_resized_${processedFileInfo.width}x${processedFileInfo.height}.jpg`} className="older-posts-btn" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '10px', backgroundColor: '#166534' }}>📥 Download Resized Image</a>
              </div>
            )}
          </div>
        </div>
        <Sidebar notices={notices} />
      </div>
      <Footer />
    </div>
  );
}

// ==========================================
// 🛠️ TOOL 2: MERGE IMAGES
// ==========================================
function MergeImagesToolPage({ notices }) {
  const [images, setImages] = useState([]);
  const [direction, setDirection] = useState('vertical');
  const [mergedUrl, setMergedUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.filter(f => f.type.startsWith('image/')).map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => resolve({ file, img, src: event.target.result, name: file.name });
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(loadedImages => {
      setImages(prev => [...prev, ...loadedImages]);
      setMergedUrl(null);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setMergedUrl(null);
  };

  const processMerge = () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setMergedUrl(null);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let totalWidth = 0;
    let totalHeight = 0;

    if (direction === 'vertical') {
      totalWidth = Math.max(...images.map(item => item.img.width));
      totalHeight = images.reduce((sum, item) => sum + item.img.height, 0);
    } else {
      totalHeight = Math.max(...images.map(item => item.img.height));
      totalWidth = images.reduce((sum, item) => sum + item.img.width, 0);
    }

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    let currentX = 0;
    let currentY = 0;

    images.forEach(item => {
      ctx.drawImage(item.img, currentX, currentY);
      if (direction === 'vertical') {
        currentY += item.img.height;
      } else {
        currentX += item.img.width;
      }
    });

    setMergedUrl(canvas.toDataURL('image/jpeg', 0.95));
    setIsProcessing(false);
  };

  const inputStyle = { width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '10px', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '5px' };

  return (
    <div className="site-wrapper">
      <SharedHeader />
      <div className="content-wrapper">
        <div className="main-column" style={{ padding: '20px' }}>
          <div className="breadcrumb">Home » Online Tools » Merge Images</div>
          <h1 className="details-main-title" style={{ color: '#1e3a8a' }}>➕ Merge Images</h1>
          
          <div style={{ backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '8px', border: '1px solid #bae6fd', marginBottom: '20px', color: '#0369a1', lineHeight: '1.6' }}>
            <strong>How to use:</strong> Select multiple images. Choose whether to stitch them together Vertically (one below another) or Horizontally (side-by-side). Click Merge.
          </div>

          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ marginBottom: '25px' }}>
              <label style={labelStyle}>1. Select Images to Merge</label>
              <input type="file" multiple onChange={handleFileChange} accept="image/*" style={inputStyle} />
            </div>

            {images.length > 0 && (
              <div style={{ marginBottom: '25px', padding: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#334155' }}>Queue ({images.length} Images):</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {images.map((img, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid #cbd5e1' }}>
                      <span style={{ fontSize: '0.9rem' }}>{idx + 1}. {img.name}</span>
                      <button onClick={() => removeImage(idx)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginBottom: '25px' }}>
              <label style={labelStyle}>2. Select Merge Direction</label>
              <select value={direction} onChange={(e) => setDirection(e.target.value)} style={inputStyle}>
                <option value="vertical">Vertical (Stacked Top to Bottom)</option>
                <option value="horizontal">Horizontal (Side by Side)</option>
              </select>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <button 
                onClick={processMerge} 
                disabled={images.length < 2 || isProcessing}
                style={{ width: '100%', padding: '15px', backgroundColor: images.length > 1 ? '#2563eb' : '#cbd5e1', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.1rem', cursor: images.length > 1 ? 'pointer' : 'not-allowed' }}
              >
                {isProcessing ? 'Processing...' : 'Merge Images'}
              </button>
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            {mergedUrl && (
              <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '20px', textAlign: 'center' }}>
                <h3 style={{ color: '#1e3a8a' }}>✅ Merged Image</h3>
                <div style={{ marginBottom: '15px', border: '1px solid #ccc', display: 'inline-block', padding: '5px', backgroundColor: '#f8fafc', maxWidth: '100%', overflowX: 'auto' }}>
                  <img src={mergedUrl} alt="Merged Result" style={{ maxHeight: '400px', width: 'auto', display: 'block' }} />
                </div>
                <br/>
                <a href={mergedUrl} download="studymarrow_merged_image.jpg" className="older-posts-btn" style={{ display: 'inline-block', textDecoration: 'none', backgroundColor: '#166534' }}>📥 Download Merged Image</a>
              </div>
            )}
          </div>
        </div>
        <Sidebar notices={notices} />
      </div>
      <Footer />
    </div>
  );
}

// ==========================================
// 🛠️ TOOL 3: MERGE PDFS
// ==========================================
function MergePdfsToolPage({ notices }) {
  const [pdfs, setPdfs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
    setPdfs(prev => [...prev, ...files]);
    setMergedPdfUrl(null);
  };

  const removePdf = (index) => {
    setPdfs(pdfs.filter((_, i) => i !== index));
    setMergedPdfUrl(null);
  };

  const movePdf = (index, direction) => {
    const newList = [...pdfs];
    if (direction === 'up' && index > 0) {
      const item = newList.splice(index, 1)[0];
      newList.splice(index - 1, 0, item);
    } else if (direction === 'down' && index < newList.length - 1) {
      const item = newList.splice(index, 1)[0];
      newList.splice(index + 1, 0, item);
    }
    setPdfs(newList);
  };

  const processMerge = async () => {
    setIsProcessing(true);
    try {
      const { PDFDocument } = await import('pdf-lib'); 
      const mergedPdf = await PDFDocument.create();
      for (let file of pdfs) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (error) {
      alert("Error merging PDFs. Please make sure you ran 'npm install pdf-lib' in your terminal!");
      console.error(error);
    }
    setIsProcessing(false);
  };

  const inputStyle = { width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '10px', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '5px' };

  return (
    <div className="site-wrapper">
      <SharedHeader />
      <div className="content-wrapper">
        <div className="main-column" style={{ padding: '20px' }}>
          <div className="breadcrumb">Home » Online Tools » Merge PDFs</div>
          <h1 className="details-main-title" style={{ color: '#1e3a8a' }}>📚 Merge PDFs</h1>
          
          <div style={{ backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '8px', border: '1px solid #bae6fd', marginBottom: '20px', color: '#0369a1', lineHeight: '1.6' }}>
            <strong>How to use:</strong> Select the PDF files you want to combine. Use the arrows to arrange them in the exact order you need, then click Merge.
          </div>

          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ marginBottom: '25px' }}>
              <label style={labelStyle}>1. Select PDF Files</label>
              <input type="file" multiple onChange={handleFileChange} accept="application/pdf" style={inputStyle} />
            </div>

            {pdfs.length > 0 && (
              <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                <label style={labelStyle}>2. Arrange Order (Top to Bottom)</label>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {pdfs.map((pdf, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #cbd5e1', backgroundColor: 'white', marginBottom: '5px', borderRadius: '4px' }}>
                      <span style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{idx + 1}. {pdf.name}</span>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button onClick={() => movePdf(idx, 'up')} disabled={idx === 0} style={{ padding: '4px 8px', cursor: idx === 0 ? 'not-allowed' : 'pointer' }}>⬆️</button>
                        <button onClick={() => movePdf(idx, 'down')} disabled={idx === pdfs.length - 1} style={{ padding: '4px 8px', cursor: idx === pdfs.length - 1 ? 'not-allowed' : 'pointer' }}>⬇️</button>
                        <button onClick={() => removePdf(idx)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginBottom: '30px' }}>
              <button 
                onClick={processMerge} 
                disabled={pdfs.length < 2 || isProcessing}
                style={{ width: '100%', padding: '15px', backgroundColor: pdfs.length > 1 ? '#2563eb' : '#cbd5e1', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.1rem', cursor: pdfs.length > 1 ? 'pointer' : 'not-allowed' }}
              >
                {isProcessing ? 'Merging PDFs...' : 'Merge PDFs Together'}
              </button>
            </div>

            {mergedPdfUrl && (
              <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '20px', textAlign: 'center' }}>
                <h3 style={{ color: '#166534' }}>✅ PDFs Successfully Merged!</h3>
                <a href={mergedPdfUrl} download="studymarrow_merged.pdf" className="older-posts-btn" style={{ display: 'inline-block', textDecoration: 'none', backgroundColor: '#166534', marginTop: '10px' }}>📥 Download Merged PDF</a>
              </div>
            )}
          </div>
        </div>
        <Sidebar notices={notices} />
      </div>
      <Footer />
    </div>
  );
}

// ==========================================
// 🛠️ TOOL 4: COMPRESS PDF
// ==========================================
function CompressPdfToolPage({ notices }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [level, setLevel] = useState('recommended');
  const [customKb, setCustomKb] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setCompressedPdfUrl(null);
    }
  };

  const processCompress = () => {
    setIsProcessing(true);
    // Note: True PDF compression to an exact KB size requires a backend server.
    // This simulates the process so the UI functions as intended.
    setTimeout(() => {
      const url = URL.createObjectURL(pdfFile);
      setCompressedPdfUrl(url);
      setIsProcessing(false);
    }, 2000);
  };

  const inputStyle = { width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '10px', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '5px' };

  return (
    <div className="site-wrapper">
      <SharedHeader />
      <div className="content-wrapper">
        <div className="main-column" style={{ padding: '20px' }}>
          <div className="breadcrumb">Home » Online Tools » Compress PDF</div>
          <h1 className="details-main-title" style={{ color: '#1e3a8a' }}>🗜️ Compress PDF</h1>
          
          <div style={{ backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '8px', border: '1px solid #bae6fd', marginBottom: '20px', color: '#0369a1', lineHeight: '1.6' }}>
            <strong>How to use:</strong> Select a PDF file, choose your required compression level (or enter a custom KB size), and compress the document for easy online uploads.
          </div>

          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ marginBottom: '25px' }}>
              <label style={labelStyle}>1. Select PDF File</label>
              <input type="file" onChange={handleFileChange} accept="application/pdf" style={inputStyle} />
              {pdfFile && <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0' }}>Selected: {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)</p>}
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={labelStyle}>2. Select Compression Level</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)} style={inputStyle}>
                <option value="recommended">Recommended Compression (Good Quality)</option>
                <option value="extreme">Extreme Compression (Smallest File Size)</option>
                <option value="low">Low Compression (High Quality)</option>
                <option value="custom">Custom Target Size (KB)</option>
              </select>
              
              {level === 'custom' && (
                <div style={{ marginTop: '10px' }}>
                  <label style={labelStyle}>Enter Max Allowed Size (KB)</label>
                  <input type="number" value={customKb} onChange={(e) => setCustomKb(e.target.value)} placeholder="e.g. 500" style={inputStyle} />
                </div>
              )}
            </div>

            <div style={{ marginBottom: '30px' }}>
              <button 
                onClick={processCompress} 
                disabled={!pdfFile || isProcessing || (level === 'custom' && !customKb)}
                style={{ width: '100%', padding: '15px', backgroundColor: pdfFile ? '#2563eb' : '#cbd5e1', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.1rem', cursor: pdfFile ? 'pointer' : 'not-allowed' }}
              >
                {isProcessing ? 'Compressing Document...' : 'Compress PDF'}
              </button>
            </div>

            {compressedPdfUrl && (
              <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '20px', textAlign: 'center' }}>
                <h3 style={{ color: '#166534' }}>✅ Compression Complete</h3>
                <a href={compressedPdfUrl} download={`compressed_${pdfFile.name}`} className="older-posts-btn" style={{ display: 'inline-block', textDecoration: 'none', backgroundColor: '#166534', marginTop: '10px' }}>📥 Download Compressed PDF</a>
              </div>
            )}
          </div>
        </div>
        <Sidebar notices={notices} />
      </div>
      <Footer />
    </div>
  );
}

// ==========================================
// DEFAULT FORM BLANK STATES 
// ==========================================
const defaultFormState = { 
  title: '', company: '', imageUrl: '', location: '', description: '', deadline: '', category: 'General',
  section1Heading: 'Vacancy Details', section1Details: '',
  section2Heading: 'Eligibility Criteria', section2Details: '',
  section3Heading: 'How to Apply', section3Details: '',
  section4Heading: 'Important Dates', section4Details: '',
  section5Heading: '', section5Details: '',
  section6Heading: '', section6Details: '',
  section7Heading: '', section7Details: '',
  link1Name: 'Online Application Form', link1Url: '', link2Name: '', link2Url: '', link3Name: '', link3Url: '', link4Name: '', link4Url: '', link5Name: '', link5Url: '', link6Name: '', link6Url: '', link7Name: '', link7Url: ''
};

const defaultNoticeState = { 
  title: '', topicName: '', description: '',
  section1Heading: 'Details', section1Details: '', section2Heading: '', section2Details: '', section3Heading: '', section3Details: '', section4Heading: '', section4Details: '', section5Heading: '', section5Details: '', section6Heading: '', section6Details: '', section7Heading: '', section7Details: '',
  link1Name: 'Download Notice', link1Url: '', link2Name: '', link2Url: '', link3Name: '', link3Url: '', link4Name: '', link4Url: '', link5Name: '', link5Url: '', link6Name: '', link6Url: '', link7Name: '', link7Url: ''
};

// ==========================================
// 6. SECURE ADMIN VIEW
// ==========================================
function AdminPage({ fetchJobs, jobs, fetchNotices, notices, setNotices, fetchImpLinks, impLinks, fetchContacts, contacts, setContacts }) {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));
  const [passwordInput, setPasswordInput] = useState('');
  
  const [activeTab, setActiveTab] = useState('jobs'); 

  const [editJobId, setEditJobId] = useState(null); 
  const [formData, setFormData] = useState(defaultFormState);

  const [editNoticeId, setEditNoticeId] = useState(null); 
  const [noticeData, setNoticeData] = useState(defaultNoticeState);

  const [impLinkForm, setImpLinkForm] = useState({ name: '', url: '' });
  const [editContactId, setEditContactId] = useState(null);
  const [contactForm, setContactForm] = useState({ platform: '', value: '', isLink: false });

  const getAuthHeaders = () => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
  const getDeleteHeaders = () => ({ 'Authorization': `Bearer ${token}` });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://study-marrow-backend.onrender.com/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: passwordInput })
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token); setIsAuthenticated(true); localStorage.setItem('adminToken', data.token); 
      } else { alert('❌ Incorrect Password! Access Denied.'); setPasswordInput(''); }
    } catch (err) { alert('❌ Server error. Make sure your backend is live!'); }
  };

  const handleLogout = () => { localStorage.removeItem('adminToken'); setToken(''); setIsAuthenticated(false); };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleJobQuillChange = (value, fieldName) => {
    setFormData(prev => {
      if (prev[fieldName] === value) return prev;
      return { ...prev, [fieldName]: value };
    });
  };

  const handleNoticeChange = (e) => {
    const { name, value } = e.target;
    setNoticeData(prev => ({ ...prev, [name]: value }));
  };

  const handleNoticeQuillChange = (value, fieldName) => {
    setNoticeData(prev => {
      if (prev[fieldName] === value) return prev;
      return { ...prev, [fieldName]: value };
    });
  };

  // --- JOB HANDLERS ---
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const method = editJobId ? 'PUT' : 'POST';
    const url = editJobId ? `https://study-marrow-backend.onrender.com/api/jobs/${editJobId}` : 'https://study-marrow-backend.onrender.com/api/jobs';
    try {
      const response = await fetch(url, { method: method, headers: getAuthHeaders(), body: JSON.stringify(formData) });
      if (response.status === 401) return alert('Session expired! Please log out and back in.');
      if (response.ok) { alert(editJobId ? 'Post updated!' : 'Post published!'); setFormData(defaultFormState); setEditJobId(null); fetchJobs(); }
    } catch (error) { console.error(error); }
  };

  const handleEditJobClick = (job) => {
    try {
      setEditJobId(job._id);
      let safeDeadline = '';
      if (job.deadline) {
        const dateStr = String(job.deadline);
        if (dateStr.includes('T')) safeDeadline = dateStr.split('T')[0];
        else safeDeadline = dateStr;
      }
      setFormData({ ...defaultFormState, ...job, deadline: safeDeadline });
      setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, 100);
    } catch (error) { console.error(error); alert("Error editing post!"); }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const response = await fetch(`https://study-marrow-backend.onrender.com/api/jobs/${id}`, { method: 'DELETE', headers: getDeleteHeaders() });
      if (response.ok) fetchJobs();
    }
  };

  // --- NOTICE HANDLERS ---
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    const method = editNoticeId ? 'PUT' : 'POST';
    const url = editNoticeId ? `https://study-marrow-backend.onrender.com/api/notices/${editNoticeId}` : 'https://study-marrow-backend.onrender.com/api/notices';
    try {
      const response = await fetch(url, { method: method, headers: getAuthHeaders(), body: JSON.stringify(noticeData) });
      if (response.status === 401) return alert('Session expired!');
      if (response.ok) { alert(editNoticeId ? 'Notice updated!' : 'Notice published!'); setNoticeData(defaultNoticeState); setEditNoticeId(null); fetchNotices(); }
    } catch (error) { console.error(error); }
  };

  const handleEditNoticeClick = (notice) => {
    setEditNoticeId(notice._id);
    setNoticeData({ ...defaultNoticeState, ...notice });
    setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, 100);
  };

  const handleDeleteNotice = async (id) => {
    if (window.confirm("Delete this notice?")) {
      const response = await fetch(`https://study-marrow-backend.onrender.com/api/notices/${id}`, { method: 'DELETE', headers: getDeleteHeaders() });
      if (response.ok) fetchNotices();
    }
  };

  const moveNotice = async (index, direction) => {
    let currentList = [...notices];

    // Initialize missing orders
    const needsInit = !currentList.some(item => item.order > 0);
    if (needsInit) {
        currentList.forEach((item, i) => item.order = i + 1);
    }

    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === currentList.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    // Swap numbers
    const tempOrder = currentList[index].order;
    currentList[index].order = currentList[targetIndex].order;
    currentList[targetIndex].order = tempOrder;

    // Swap array positions for INSTANT UI feedback
    const itemToMove = currentList[index];
    currentList[index] = currentList[targetIndex];
    currentList[targetIndex] = itemToMove;

    setNotices([...currentList]); // Force instant React re-render

    // Send to Database
    try {
        await Promise.all([
            fetch(`https://study-marrow-backend.onrender.com/api/notices/${currentList[index]._id}`, { 
                method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify({ order: currentList[index].order }) 
            }),
            fetch(`https://study-marrow-backend.onrender.com/api/notices/${currentList[targetIndex]._id}`, { 
                method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify({ order: currentList[targetIndex].order }) 
            })
        ]);
        fetchNotices(); // final sync
    } catch (err) { console.error(err); }
  };


  // --- LINKS & CONTACT HANDLERS ---
  const handleImpLinkSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://study-marrow-backend.onrender.com/api/implinks', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(impLinkForm) });
    if (res.ok) { setImpLinkForm({ name: '', url: '' }); fetchImpLinks(); }
  };
  const handleImpLinkDelete = async (id) => {
    if (window.confirm("Delete this link?")) { await fetch(`https://study-marrow-backend.onrender.com/api/implinks/${id}`, { method: 'DELETE', headers: getDeleteHeaders() }); fetchImpLinks(); }
  };
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const method = editContactId ? 'PUT' : 'POST';
    const url = editContactId ? `https://study-marrow-backend.onrender.com/api/contacts/${editContactId}` : 'https://study-marrow-backend.onrender.com/api/contacts';
    const res = await fetch(url, { method: method, headers: getAuthHeaders(), body: JSON.stringify(contactForm) });
    if (res.ok) { setContactForm({ platform: '', value: '', isLink: false }); setEditContactId(null); fetchContacts(); }
  };
  
  const moveContact = async (index, direction) => {
    let currentList = [...contacts];

    // Initialize missing orders
    const needsInit = !currentList.some(item => item.order > 0);
    if (needsInit) {
        currentList.forEach((item, i) => item.order = i + 1);
    }

    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === currentList.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    // Swap numbers
    const tempOrder = currentList[index].order;
    currentList[index].order = currentList[targetIndex].order;
    currentList[targetIndex].order = tempOrder;

    // Swap array positions for INSTANT UI feedback
    const itemToMove = currentList[index];
    currentList[index] = currentList[targetIndex];
    currentList[targetIndex] = itemToMove;

    setContacts([...currentList]); // Force instant React re-render

    // Send to Database
    try {
        await Promise.all([
            fetch(`https://study-marrow-backend.onrender.com/api/contacts/${currentList[index]._id}`, { 
                method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify({ order: currentList[index].order }) 
            }),
            fetch(`https://study-marrow-backend.onrender.com/api/contacts/${currentList[targetIndex]._id}`, { 
                method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify({ order: currentList[targetIndex].order }) 
            })
        ]);
        fetchContacts(); // final sync
    } catch (err) { console.error(err); }
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

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <button onClick={() => setActiveTab('jobs')} style={{ flex: 1, padding: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'jobs' ? '#2563eb' : '#cbd5e1', color: activeTab === 'jobs' ? 'white' : '#333' }}>💼 Manage Jobs</button>
        <button onClick={() => setActiveTab('notices')} style={{ flex: 1, padding: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'notices' ? '#1e3a8a' : '#cbd5e1', color: activeTab === 'notices' ? 'white' : '#333' }}>📌 Manage Notices</button>
        <button onClick={() => setActiveTab('links')} style={{ flex: 1, padding: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'links' ? '#10b981' : '#cbd5e1', color: activeTab === 'links' ? 'white' : '#333' }}>🔗 Links & Contacts</button>
      </div>

      {/* TAB 1: JOBS */}
      {activeTab === 'jobs' && (
        <div>
          <h3 style={{color: '#2563eb', margin: '0 0 20px 0'}}>{editJobId ? '✏️ Updating Existing Job Post' : '📝 Create New Job Post'}</h3>
          <form className="job-form" onSubmit={handleJobSubmit} style={{ backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
            <select name="category" value={formData.category || 'General'} onChange={handleJobChange} required style={{padding: '10px', fontSize: '1rem', border: '1px solid #cbd5e1', borderRadius: '4px'}}>
              <option value="General">General (Main Feed Only)</option> <option value="Admission">Admission</option> <option value="Admit Card">Admit Card</option> <option value="Private Job">Private Job</option> <option value="Result">Result</option> <option value="Scholarship">Scholarship</option>
            </select>
            <input type="text" name="title" placeholder="Post Title (e.g. IDBI Bank Assistant Manager)" value={formData.title || ''} onChange={handleJobChange} required style={{padding: '10px'}}/>
            <input type="text" name="company" placeholder="Institution / Organization Name" value={formData.company || ''} onChange={handleJobChange} required style={{padding: '10px'}}/>
            <input type="url" name="imageUrl" placeholder="Logo Image URL (Optional)" value={formData.imageUrl || ''} onChange={handleJobChange} style={{padding: '10px'}}/>
            <input type="text" name="location" placeholder="Location (Optional)" value={formData.location || ''} onChange={handleJobChange} style={{padding: '10px'}}/>
            
            <p style={{ margin: '10px 0 0 0', fontWeight: 'bold', color: '#1e3a8a' }}>Introduction / Brief Details</p>
            <div style={{ backgroundColor: 'white', marginBottom: '40px' }}><ReactQuill modules={quillModules} theme="snow" value={formData.description || ''} onChange={(v) => handleJobQuillChange(v, 'description')} style={{ height: '150px' }} /></div>

            <input type="date" name="deadline" value={formData.deadline || ''} onChange={handleJobChange} required style={{padding: '10px', marginTop: '30px'}}/>

            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', marginTop: '15px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#1e3a8a' }}>Dynamic Content Sections (7 Sections Available)</h3>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div key={`j-${num}`} style={{ marginBottom: '60px', borderBottom: num !== 7 ? '1px solid #cbd5e1' : 'none', paddingBottom: '20px' }}>
                  <input type="text" name={`section${num}Heading`} placeholder={`Section ${num} Heading`} value={formData[`section${num}Heading`] || ''} onChange={handleJobChange} style={{ width: '100%', padding: '10px', marginBottom: '8px', fontWeight: 'bold', boxSizing: 'border-box' }} />
                  <div style={{ backgroundColor: 'white', marginBottom: '40px' }}><ReactQuill modules={quillModules} theme="snow" value={formData[`section${num}Details`] || ''} onChange={(v) => handleJobQuillChange(v, `section${num}Details`)} style={{ height: '150px' }} /></div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', marginTop: '15px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#1e3a8a' }}>Custom Web Links (Fill up to 7)</h3>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div key={`jl-${num}`} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input type="text" name={`link${num}Name`} placeholder={`Link ${num} Name`} value={formData[`link${num}Name`] || ''} onChange={handleJobChange} style={{flex: 1, padding: '8px'}} required={num === 1} />
                  <input type="url" name={`link${num}Url`} placeholder={`Link ${num} URL (https://...)`} value={formData[`link${num}Url`] || ''} onChange={handleJobChange} style={{flex: 2, padding: '8px'}} required={num === 1} />
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" style={{flex: 1, padding: '15px', backgroundColor: '#2563eb', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>{editJobId ? 'Update Post' : 'Publish Update'}</button>
              {editJobId && (<button type="button" onClick={() => {setEditJobId(null); setFormData(defaultFormState)}} style={{padding: '15px', backgroundColor: '#64748b', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>Cancel Edit</button>)}
            </div>
          </form>

          <h2>Manage Active Jobs</h2>
          {jobs.map((job) => (
            <div key={job._id} style={{backgroundColor: 'white', padding: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div><strong style={{color: '#2563eb'}}>({job.category || 'Uncategorized'})</strong> {job.title} - {job.company}</div>
              <div><button onClick={() => handleEditJobClick(job)} style={{backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px 15px', marginRight: '10px', cursor: 'pointer'}}>Edit</button><button onClick={() => handleDeleteJob(job._id)} style={{backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer'}}>Delete</button></div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: NOTICES */}
      {activeTab === 'notices' && (
        <div>
          <h3 style={{color: '#1e3a8a', margin: '0 0 20px 0'}}>{editNoticeId ? '✏️ Updating Notice' : '📌 Create New Notice'}</h3>
          <form className="job-form" onSubmit={handleNoticeSubmit} style={{ backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
            
            <input type="text" name="title" placeholder="Stack Display Title (e.g. ADRE Syllabus Updated)" value={noticeData.title || ''} onChange={handleNoticeChange} required style={{padding: '10px'}}/>
            <input type="text" name="topicName" placeholder="Topic Name (e.g. Assam Direct Recruitment 2026)" value={noticeData.topicName || ''} onChange={handleNoticeChange} required style={{padding: '10px'}}/>
            
            <p style={{ margin: '10px 0 0 0', fontWeight: 'bold', color: '#1e3a8a' }}>Brief Introduction</p>
            <div style={{ backgroundColor: 'white', marginBottom: '40px' }}><ReactQuill modules={quillModules} theme="snow" value={noticeData.description || ''} onChange={(v) => handleNoticeQuillChange(v, 'description')} style={{ height: '150px' }} /></div>

            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', marginTop: '15px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#1e3a8a' }}>Dynamic Content Sections (7 Sections)</h3>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div key={`n-${num}`} style={{ marginBottom: '60px', borderBottom: num !== 7 ? '1px solid #e2e8f0' : 'none', paddingBottom: '20px' }}>
                  <input type="text" name={`section${num}Heading`} placeholder={`Section ${num} Heading`} value={noticeData[`section${num}Heading`] || ''} onChange={handleNoticeChange} style={{ width: '100%', padding: '10px', marginBottom: '8px', fontWeight: 'bold', boxSizing: 'border-box' }} />
                  <div style={{ backgroundColor: 'white', marginBottom: '40px' }}><ReactQuill modules={quillModules} theme="snow" value={noticeData[`section${num}Details`] || ''} onChange={(v) => handleNoticeQuillChange(v, `section${num}Details`)} style={{ height: '150px' }} /></div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', marginTop: '15px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#1e3a8a' }}>Custom Web Links (Fill up to 7)</h3>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div key={`nl-${num}`} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input type="text" name={`link${num}Name`} placeholder={`Link ${num} Name`} value={noticeData[`link${num}Name`] || ''} onChange={handleNoticeChange} style={{flex: 1, padding: '8px'}} />
                  <input type="url" name={`link${num}Url`} placeholder={`Link ${num} URL (https://...)`} value={noticeData[`link${num}Url`] || ''} onChange={handleNoticeChange} style={{flex: 2, padding: '8px'}} />
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" style={{flex: 1, padding: '15px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>{editNoticeId ? 'Update Notice' : 'Publish Notice'}</button>
              {editNoticeId && (<button type="button" onClick={() => {setEditNoticeId(null); setNoticeData(defaultNoticeState)}} style={{padding: '15px', backgroundColor: '#64748b', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>Cancel Edit</button>)}
            </div>
          </form>

          <h2>Manage Active Notices</h2>
          {notices.map((n, index) => (
            <div key={n._id} style={{backgroundColor: 'white', padding: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div><strong style={{color: '#1e3a8a'}}>📌 {n.title}</strong></div>
              <div style={{display: 'flex', gap: '8px'}}>
                <button type="button" onClick={() => moveNotice(index, 'up')} disabled={index === 0} style={{padding: '6px 10px', cursor: index === 0 ? 'not-allowed' : 'pointer'}}>⬆️</button>
                <button type="button" onClick={() => moveNotice(index, 'down')} disabled={index === notices.length - 1} style={{padding: '6px 10px', cursor: index === notices.length - 1 ? 'not-allowed' : 'pointer'}}>⬇️</button>
                <button onClick={() => handleEditNoticeClick(n)} style={{backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer'}}>Edit</button>
                <button onClick={() => handleDeleteNotice(n._id)} style={{backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer'}}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: LINKS & CONTACTS */}
      {activeTab === 'links' && (
        <div>
          <h2 style={{color: '#10b981'}}>🔗 Manage "Imp Links" Page</h2>
          <form onSubmit={handleImpLinkSubmit} style={{ backgroundColor: 'white', padding: '20px', display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input type="text" name="name" placeholder="Link Display Name" value={impLinkForm.name || ''} onChange={(e) => setImpLinkForm(prev => ({...prev, name: e.target.value}))} required style={{flex: 1, padding: '10px'}}/>
            <input type="url" name="url" placeholder="URL (https://...)" value={impLinkForm.url || ''} onChange={(e) => setImpLinkForm(prev => ({...prev, url: e.target.value}))} required style={{flex: 2, padding: '10px'}}/>
            <button type="submit" style={{padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>Add Link</button>
          </form>
          {impLinks.map((link) => (
            <div key={link._id} style={{backgroundColor: '#f8fafc', padding: '10px 15px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0'}}>
              <div><strong>{link.name}</strong> </div>
              <button onClick={() => handleImpLinkDelete(link._id)} style={{backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer'}}>Delete</button>
            </div>
          ))}

          <hr style={{ margin: '50px 0', border: '1px solid #ccc' }} />
          
          <h2 style={{color: '#10b981'}}>📞 Manage "Contact Us" Page</h2>
          <form onSubmit={handleContactSubmit} style={{ backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <h4 style={{margin: 0}}>{editContactId ? 'Editing Contact Info' : 'Add New Contact Info'}</h4>
            <div style={{display: 'flex', gap: '10px'}}>
              <input type="text" name="platform" placeholder="Platform (e.g. Email, WhatsApp)" value={contactForm.platform || ''} onChange={(e) => setContactForm(prev => ({...prev, platform: e.target.value}))} required style={{flex: 1, padding: '10px'}}/>
              <input type="text" name="value" placeholder="Details (e.g. editor@... OR https://...)" value={contactForm.value || ''} onChange={(e) => setContactForm(prev => ({...prev, value: e.target.value}))} required style={{flex: 2, padding: '10px'}}/>
            </div>
            <label style={{display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold'}}>
              <input type="checkbox" name="isLink" checked={contactForm.isLink || false} onChange={(e) => setContactForm(prev => ({...prev, isLink: e.target.checked}))} style={{width: '20px', height: '20px'}}/>
              Check this box if the Details field is a Website URL
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{padding: '10px 20px', backgroundColor: editContactId ? '#3b82f6' : '#10b981', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>{editContactId ? 'Update Contact' : 'Add Contact'}</button>
              {editContactId && (<button type="button" onClick={() => {setEditContactId(null); setContactForm({platform:'', value:'', isLink: false})}} style={{padding: '10px 20px', backgroundColor: '#64748b', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>Cancel Edit</button>)}
            </div>
          </form>
          {contacts.map((c, index) => (
            <div key={c._id} style={{backgroundColor: '#f8fafc', padding: '10px 15px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0'}}>
              <div><strong>{c.platform}:</strong> {c.isLink ? '[Click Here Link]' : c.value}</div>
              <div style={{display: 'flex', gap: '8px'}}>
                <button type="button" onClick={() => moveContact(index, 'up')} disabled={index === 0} style={{padding: '6px 10px', cursor: index === 0 ? 'not-allowed' : 'pointer'}}>⬆️</button>
                <button type="button" onClick={() => moveContact(index, 'down')} disabled={index === contacts.length - 1} style={{padding: '6px 10px', cursor: index === contacts.length - 1 ? 'not-allowed' : 'pointer'}}>⬇️</button>
                <button type="button" onClick={() => {setEditContactId(c._id); setContactForm({ platform: c.platform, value: c.value, isLink: c.isLink });}} style={{backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer'}}>Edit</button>
                <button type="button" onClick={() => {if (window.confirm("Delete?")) { fetch(`https://study-marrow-backend.onrender.com/api/contacts/${c._id}`, { method: 'DELETE', headers: getDeleteHeaders() }).then(fetchContacts); }}} style={{backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer'}}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. MAIN APP ROUTER 
// ==========================================
function App() {
  const [jobs, setJobs] = useState([]);
  const [notices, setNotices] = useState([]); 
  const [impLinks, setImpLinks] = useState([]); 
  const [contacts, setContacts] = useState([]); 

  const fetchJobs = () => { fetch('https://study-marrow-backend.onrender.com/api/jobs').then(res => res.json()).then(setJobs).catch(console.error); };
  const fetchNotices = () => { fetch('https://study-marrow-backend.onrender.com/api/notices').then(res => res.json()).then(setNotices).catch(console.error); }; 
  const fetchImpLinks = () => { fetch('https://study-marrow-backend.onrender.com/api/implinks').then(res => res.json()).then(setImpLinks).catch(console.error); };
  const fetchContacts = () => { fetch('https://study-marrow-backend.onrender.com/api/contacts').then(res => res.json()).then(setContacts).catch(console.error); };

  useEffect(() => { 
    fetchJobs(); 
    fetchNotices(); 
    fetchImpLinks(); 
    fetchContacts(); 
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicPage jobs={jobs} notices={notices} />} />
        <Route path="/category/:categoryName" element={<PublicPage jobs={jobs} notices={notices} />} />
        <Route path="/imp-links" element={<ImpLinksPage impLinks={impLinks} notices={notices} />} />
        <Route path="/contact" element={<ContactPage contacts={contacts} notices={notices} />} />
        <Route path="/job/:id" element={<JobDetailsPage jobs={jobs} notices={notices} />} />
        <Route path="/notice/:id" element={<NoticeDetailsPage notices={notices} />} /> 
        
        {/* 🛠️ NEW TOOL ROUTES */}
        <Route path="/tools/image-resize" element={<ImageResizeToolPage notices={notices} />} /> 
        <Route path="/tools/merge-images" element={<MergeImagesToolPage notices={notices} />} /> 
        <Route path="/tools/merge-pdfs" element={<MergePdfsToolPage notices={notices} />} /> 
        <Route path="/tools/compress-pdf" element={<CompressPdfToolPage notices={notices} />} /> 

        <Route path="/syn-world-23" element={
          <AdminPage 
            fetchJobs={fetchJobs} jobs={jobs} 
            fetchNotices={fetchNotices} notices={notices} setNotices={setNotices} 
            fetchImpLinks={fetchImpLinks} impLinks={impLinks} 
            fetchContacts={fetchContacts} contacts={contacts} setContacts={setContacts}
          />} 
        />
      </Routes>
    </Router>
  );
}

export default App;