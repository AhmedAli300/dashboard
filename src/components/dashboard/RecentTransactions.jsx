
import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, Paper } from "@mui/material";
import axios from "axios";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/transactions") // API للعمليات الأخيرة
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  return (
    <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3 }}>
      <Paper>
        <List>
          {transactions.slice(0, 5).map((transaction, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Subscription: ${transaction.name}`}
                secondary={`Paid: $${transaction.amount}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default RecentTransactions;
