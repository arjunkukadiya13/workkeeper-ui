import React, { useState } from "react";
import "./EmployeeNotificationContent.css";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import { MarkEmailRead, MarkEmailUnread } from "@mui/icons-material";

const mockNotifications = [
  {
    id: 1,
    type: "Attendance",
    message: "You have a missing attendance entry for 13th May.",
    date: "2025-05-13",
    read: false,
  },
  {
    id: 2,
    type: "Leave",
    message: "Your leave from 5th to 7th May has been approved.",
    date: "2025-05-08",
    read: true,
  },
  {
    id: 3,
    type: "System",
    message: "New feature update: View holiday calendar from dashboard.",
    date: "2025-05-10",
    read: false,
  },
];

const EmployeeNotificationContent = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("All");

  const handleToggleRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: !n.read } : n
    );
    setNotifications(updated);
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  return (
    <div className="employee-notification-container">
      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>

      <FormControl style={{ minWidth: 200, marginBottom: 20 }}>
        <InputLabel>Filter by Type</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter by Type"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Attendance">Attendance</MenuItem>
          <MenuItem value="Leave">Leave</MenuItem>
          <MenuItem value="System">System</MenuItem>
        </Select>
      </FormControl>

      <List>
        {filteredNotifications.map((notification) => (
          <div key={notification.id}>
            <ListItem
              style={{
                backgroundColor: notification.read ? "#f5f5f5" : "#e3f2fd",
                borderRadius: 8,
                marginBottom: 10,
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => handleToggleRead(notification.id)}
                >
                  {notification.read ? (
                    <MarkEmailUnread color="action" />
                  ) : (
                    <MarkEmailRead color="primary" />
                  )}
                </IconButton>
              }
            >
              <ListItemText
                primary={notification.message}
                secondary={`Date: ${notification.date}`}
              />
              <Chip
                label={notification.type}
                color={
                  notification.type === "Attendance"
                    ? "warning"
                    : notification.type === "Leave"
                    ? "success"
                    : "info"
                }
              />
            </ListItem>
            <Divider />
          </div>
        ))}
        {filteredNotifications.length === 0 && (
          <Typography>No notifications found.</Typography>
        )}
      </List>
    </div>
  );
};

export default EmployeeNotificationContent;
