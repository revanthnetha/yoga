const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Mock function to simulate payment
const CompletePayment = (details) => {
  return true;
};

app.post("/api/enroll", async (req, res) => {
  const { name, age, batch, paymentDetails } = req.body;

  // Basic validations

  if (age < 18 || age > 65) {
    return res.status(400).json({ success: false, message: "Age should be between 18 and 65" });
  }
  if (!batch) {
    return res.status(400).json({ success: false, message: "Please select a batch" });
  }

  // Store data in database

  // In a real application, you would use a database connection pool and perform the
  // database operations using prepared statements to prevent SQL injection attacks.

  const db = {
    users: [],
  };
  db.users.push({ name, age, batch });

  // Simulate payment

  const paymentSuccess = CompletePayment(paymentDetails);

  if (!paymentSuccess) {
    return res.status(500).json({ success: false, message: "Payment failed" });
  }

  // Return success response

  res.status(200).json({ success: true });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});