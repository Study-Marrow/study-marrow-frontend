import React from 'react';
import { Link } from 'react-router-dom'; // 1. We import Link here!
import './JobCard.css';

const JobCard = ({ title, excerpt, category, date, link, imageUrl }) => {
  return (
    <article className="job-post">
      <h2 className="job-title">
        {/* 2. Changed <a> to <Link> for the main title */}
        <Link to={link}>{title}</Link>
      </h2>
      <div className="job-body">
        <div className="job-thumbnail">
          <img src={imageUrl} alt="Job Logo" />
        </div>
        <div className="job-excerpt">
          <p>{excerpt}</p>
          {/* 3. Changed <a> to <Link> for the Read More button */}
          <Link to={link} className="read-more">Read more »</Link>
        </div>
      </div>
      <div className="job-meta">
        📁 Category: {category} | Last Updated On {date}
      </div>
    </article>
  );
};

export default JobCard;