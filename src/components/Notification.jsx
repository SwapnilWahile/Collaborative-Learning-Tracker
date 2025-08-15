import React, { useState, useRef, useEffect } from "react";
import "./Notification.scss";
import socket from "../utils/socket";

const Notification = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const wrapperRef = useRef(null);

   // Listen for events from backend
  useEffect(() => {
    socket.on("newNotification", (data) => {
      setNotifications((prev) => [data, ...prev]); // prepend new notification
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);


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

  let count = notifications.length;
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
            {notifications.length === 0 && <p>No new notifications</p>}
            {notifications.map((n, i) => (
              <p key={i}>
                🔔 {n.message} <br />
                <small>{new Date(n.time).toLocaleTimeString()}</small>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
