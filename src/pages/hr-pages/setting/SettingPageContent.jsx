import { TextField, Button, Typography, Card, CardContent } from "@mui/material";
import "./SettingPageContent.css"
import { useSelector } from "react-redux";


const SettingPageContent = () => {
  const userData = useSelector((state)=>state.userData)

  return (
    <div className="settings-container">
      <Typography variant="h4" className="title"> Settings</Typography>

      <Card className="settings-card">
        <CardContent>
          {/* Profile Information */}
          <Typography variant="h6">Profile Information</Typography>

          <TextField
            label="Full Name"
            name="name"
            fullWidth
            value={userData.name}
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            value={userData.personalEmail}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Mobile Number"
            name="mobile_no"
            value={userData.personalMobile}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" color="primary"  className="save-button">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingPageContent;
