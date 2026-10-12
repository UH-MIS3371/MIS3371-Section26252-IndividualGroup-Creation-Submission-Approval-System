
/*
 MIS 3371 - Week 8
 Invoice Backend Testing
 2 Valid, 2 Invalid, 2 Boundary/Edge Cases
*/

const { processInvoice } = require("./backend");

const tests = [
  {
    name: "Valid 1 - Submitted invoice",
    invoice: {
      invoiceNumber: "INV-001",
      customerName: "ABC Company",
      amount: 150,
      status: "Submitted"
    },
    expectedSuccess: true
  },
  {
    name: "Valid 2 - Under Review invoice",
    invoice: {
      invoiceNumber: "INV-002",
      customerName: "XYZ Company",
      amount: 250,
      status: "Under Review"
    },
    expectedSuccess: true
  },
  {
    name: "Invalid 1 - Missing invoice number",
    invoice: {
      invoiceNumber: "",
      customerName: "ABC Company",
      amount: 100,
      status: "Submitted"
    },
    expectedSuccess: false
  },
  {
    name: "Invalid 2 - Unsupported status",
    invoice: {
      invoiceNumber: "INV-004",
      customerName: "ABC Company",
      amount: 100,
      status: "Cancelled"
    },
    expectedSuccess: false
  },
  {
    name: "Boundary 1 - Zero amount",
    invoice: {
      invoiceNumber: "INV-005",
      customerName: "ABC Company",
      amount: 0,
      status: "Submitted"
    },
    expectedSuccess: false
  },
  {
    name: "Boundary 2 - Minimum positive amount",
    invoice: {
      invoiceNumber: "INV-006",
      customerName: "ABC Company",
      amount: 0.01,
      status: "Under Review"
    },
    expectedSuccess: true
  }
];

let passed = 0;

tests.forEach((test) => {
  const result = processInvoice(test.invoice);
  const success = result.success === test.expectedSuccess;

  console.log("\n" + test.name);
  console.log("Expected:", test.expectedSuccess);
  console.log("Actual:", result.success);
  console.log("Message:", result.message);
  console.log("Result:", success ? "PASS" : "FAIL");

  if (success) passed++;
});

console.log(`\nTotal: ${passed}/${tests.length} tests passed.`);
