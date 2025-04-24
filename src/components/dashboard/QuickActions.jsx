// src/components/dashboard/QuickActions.jsx
import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { AddCircle, EventNote, AssignmentTurnedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { label: "Add Subscription", icon: <AddCircle />, action: () => navigate("/subscriptions/add") },
    { label: "Record Attendance", icon: <EventNote />, action: () => navigate("/attendance") },
    { label: "Generate Report", icon: <AssignmentTurnedIn />, action: () => navigate("/reports") },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3 }}>
      <Grid container spacing={3}>
        {actions.map((action, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={action.icon}
              onClick={action.action}
            >
              {action.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickActions;
