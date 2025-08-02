import { useState } from "react";
import "./Notification.scss";

const Notification = ({ count = 0 }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  return (
    <div className="notification-wrapper">
      <div
        className="notification"
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
      >
        {count > 0 && <span className="notification-badge">{count}</span>}
        <div className="bell-container">
          <div className="bell"></div>
        </div>
      </div>
      {isNotificationOpen && (
        <div className="notification-dropdown">
          {" "}
          <div className="notification-content"> sample notification content </div>{" "}
        </div>
      )}
    </div>
  );
};

export default Notification;
