import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/subscriptions")
      .then((res) => setSubscriptions(res.data))
      .catch((err) => console.error("Error fetching subscriptions:", err));

    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser("");
  };

  const handleConvertToSubscriber = async () => {
    if (!selectedUser) return;

    const user = users.find((u) => u.id === selectedUser);
    const newSubscription = {
      id: Math.random().toString(36).substr(2, 4),
      name: user.name,
      type: "Monthly",
      date: new Date().toISOString().split("T")[0],
      paid: false,
      notes: "Converted from user"
    };

    try {
      const response = await axios.post("http://localhost:5000/subscriptions", newSubscription);
      setSubscriptions([...subscriptions, response.data]);
      handleCloseDialog();
    } catch (err) {
      console.error("Error creating subscription:", err);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 3, mb: 3, boxShadow: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5">Subscriptions List</Typography>
          <Box>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={handleOpenDialog}
            >
              تحويل إلى مشترك
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/subscriptions/add")}
            >
              Add New
            </Button>
          </Box>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Paid</strong></TableCell>
              <TableCell><strong>Notes</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.name}</TableCell>
                <TableCell>{sub.type}</TableCell>
                <TableCell>{sub.date}</TableCell>
                <TableCell>{sub.paid ? "✅" : "❌"}</TableCell>
                <TableCell>{sub.notes}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/subscriptions/edit/${sub.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>اختر المستخدم للتحويل إلى مشترك</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>المستخدم</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              label="المستخدم"
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>إلغاء</Button>
          <Button onClick={handleConvertToSubscriber} variant="contained">
            تحويل
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Subscriptions;
