import React, { useEffect, useState } from 'react';
import "./EmployeeNotificationContent.css";
import { useSelector } from 'react-redux';
import NotificationService from '../../../services/notificationService';
import { Card, CardContent, Typography, Button, Divider, Box } from '@mui/material';

const EmployeeNotificationContent = () => {
  const userData = useSelector((state) => state.userData);

  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotifications = async () => {
    try {
      const data = await NotificationService.getEmployeeNotification(userData.id, page, pageSize);
      setNotifications(data);
      setHasMore(data.length === pageSize);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    if (userData?.id) fetchNotifications();
  }, [page, userData]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (hasMore) setPage(page + 1);
  };

  return (
    <div className="notification-container">
      <Typography variant="h5" className="notification-title">
        Notifications
      </Typography>
      <Divider className="notification-divider" />
      {notifications.length === 0 ? (
        <Typography className="no-notifications">No notifications to display.</Typography>
      ) : (
        notifications.map((notif) => (
          <Card key={notif.id} className={`notification-card ${notif.isRead ? 'read' : 'unread'}`}>
            <CardContent>
              <Typography variant="body1" className="notification-message">
                {notif.message}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Sent at: {new Date(notif.sentAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
      <Box className="pagination-controls">
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={handlePrev}
        >
          Previous
        </Button>
        <Typography variant="body2" className="page-number">
          Page {page}
        </Typography>
        <Button
          variant="outlined"
          disabled={!hasMore}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default EmployeeNotificationContent;
