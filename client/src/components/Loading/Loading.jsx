import React, { useState, useEffect } from 'react';
import './Loading.css'

const Loading = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500)
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading-spinner-container">
            <div className="spinner-circle"></div>
            <div className="loading-text">BookHub</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Loading;
