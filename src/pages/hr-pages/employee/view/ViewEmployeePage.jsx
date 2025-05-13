import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeService from "../../../../services/employeeService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./ViewEmployeePage.css"

const ViewEmployeePage = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await EmployeeService.getEmployeeById(employeeId);
        setEmployee(data);
      } catch (error) {
        console.error("Failed to fetch employee details:", error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  if (!employee) return <Typography>Loading...</Typography>;

  return (
    <div style={{ padding: "30px" }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ marginBottom: 3 }}
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card elevation={2} sx={{ textAlign: "center", padding: 2 }}>
              <Avatar
                sx={{ width: 100, height: 100, margin: "0 auto", fontSize: 40 }}
              >
                {employee.name[0]}
              </Avatar>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                {employee.name}
              </Typography>
              <Typography color="textSecondary">
                {employee.designation}
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="body2">Employee ID: {employee.id}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Status: {employee.status}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Personal Email: {employee.personalEmail}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Organization Email: {employee.organizationEmail}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Mobile: {employee.personalMobile}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Alternate Mobile: {employee.alternateMobile}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ marginY: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Organization Info
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Department: {employee.departmentName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Office: {employee.officeName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Role: {employee.roleName}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ViewEmployeePage;
