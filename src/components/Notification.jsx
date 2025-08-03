import React, { useState, useRef, useEffect } from "react";
import "./Notification.scss";

const Notification = ({ count = 0 }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);

  return (
    <div className="notification-wrapper" ref={wrapperRef}>
      <div
        className="notification"
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
      >
        {count > 0 && <span className="notification-badge">{count}</span>}
        <div className="bell-container">
          <div className={`bell ${count > 0 ? 'ring' : ''}`}></div>
        </div>
      </div>

      {isNotificationOpen && (
        <div className="notification-dropdown">
          <div className="notification-content">
            <p>🔔 Here we go — sample notification content</p>
            <p>You can add a list here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
