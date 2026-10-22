/*
 MIS 3371 - Week 9
 Invoice Creation, Submission, and Approval System
 Local Express API
*/

const express = require("express");
const path = require("path");
const { processInvoice } = require("../backend/backend");

const app = express();
const PORT = 3000;

// Parse incoming JSON requests
app.use(express.json());

// Serve the existing HTML, CSS, and JavaScript
app.use(express.static(path.join(__dirname, "../src")));

// Process invoices using existing Week 8 business rules
app.post("/api/invoices", (req, res) => {
  const result = processInvoice(req.body);

  return res.status(result.success ? 200 : 400).json({
    ...result,
    persisted: false
  });
});

// Start the local server
app.listen(PORT, () => {
  console.log("Invoice API running at http://localhost:" + PORT);
});