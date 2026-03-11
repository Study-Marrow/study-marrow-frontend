import React from 'react';
import './JobDetails.css';
import './Home.css'; // We import this to reuse the 2-column layout and sidebar!

const JobDetails = () => {
  return (
    <div className="home-container">
      
      {/* LEFT COLUMN: FULL ARTICLE */}
      <main className="main-content">
        <article className="full-job-post">
          
          {/* Breadcrumb Navigation */}
          <div className="breadcrumb">
            <a href="/">Home</a> » <a href="/admission">Admission</a> » NCET ITEP 2026 Notification
          </div>

          <h1 className="post-title">NCET ITEP 2026 Notification – Eligibility, Syllabus & Exam Pattern</h1>
          
          <div className="post-meta">
            📁 Category: Admission, Examination | 🕒 Last Updated: March 04, 2026
          </div>

          {/* Main Content Body */}
          <div className="post-content">
            <p><strong>National Testing Agency (NTA)</strong> has released the official notification of National Common Entrance Test [NCET] 2026. This year NCET 2026 will be conducted on 17th April 2026 (Friday).</p>
            
            <p>Eligible and interested candidates may submit their online application here for admission to 4-Year Integrated Teacher Education Programme (ITEP) in selected Central/State Universities/Institutions including IITs, NITs, RIEs, and Government Colleges.</p>

            <h3>NCET ITEP Notification Details</h3>
            <p><strong>Name of exam:</strong> National Common Entrance Test (NCET) 2026</p>
            <p><strong>Name of course:</strong> 4-Year Integrated Teacher Education Programme (ITEP)</p>
            <p><strong>Name of conducting body:</strong> National Testing Agency (NTA)</p>

            <h3>Eligibility Criteria</h3>
            <p><strong>Educational Qualification:</strong> Candidates must have passed the Class 12 or equivalent examination from a recognized board.</p>
            <p><strong>Age Limit:</strong> There is no age limit for the candidates appearing in the NCET 2026.</p>

            <h3>Important Dates</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td>Starting date of online application</td>
                  <td><strong>10th March 2026</strong></td>
                </tr>
                <tr>
                  <td>Last date of online application</td>
                  <td><strong>31st March 2026</strong></td>
                </tr>
                <tr>
                  <td>Date of NCET Exam</td>
                  <td><strong>17th April 2026</strong></td>
                </tr>
              </tbody>
            </table>

            <h3>Important Web-Links</h3>
            <table className="links-table">
              <tbody>
                <tr>
                  <td><strong>Online Application Form</strong></td>
                  <td><button className="link-btn">Click Here</button></td>
                </tr>
                <tr>
                  <td><strong>Official Notification</strong></td>
                  <td><button className="link-btn">Click Here</button></td>
                </tr>
                <tr>
                  <td><strong>Official Website</strong></td>
                  <td><button className="link-btn">Click Here</button></td>
                </tr>
              </tbody>
            </table>
          </div>

        </article>
      </main>

      {/* RIGHT COLUMN: SIDEBAR */}
      <aside className="sidebar">
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

export default JobDetails;