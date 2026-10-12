
/*
 MIS 3371 - Week 8
 Invoice Creation, Submission, and Approval System
 Local Backend / Application Logic
*/

// Process an invoice using backend business rules
function processInvoice(invoice) {

  // Rule 1: Required invoice information
  const invoiceNumber = String(invoice.invoiceNumber || "").trim();
  const customerName = String(invoice.customerName || "").trim();

  if (!invoiceNumber || !customerName) {
    return {
      success: false,
      message: "Invoice number and customer name are required."
    };
  }

  // Rule 2: Invoice amount must be greater than zero
  const amount = Number(invoice.amount);

  if (
    invoice.amount === "" ||
    invoice.amount == null ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    return {
      success: false,
      message: "Invoice amount must be greater than $0."
    };
  }

  // Rule 3: Approval depends on invoice status
  const status = String(invoice.status || "").trim();

  if (!["Draft", "Submitted", "Under Review"].includes(status)) {
    return {
      success: false,
      message: "Invalid invoice status for submission."
    };
  }

  // Determine the approval route
  const approvalEligible = status === "Under Review";

  return {
    success: true,
    message: "Invoice processed successfully.",
    status: status,
    approvalEligible: approvalEligible,
    approvalPath: approvalEligible
      ? "Ready for Approval"
      : "Pending Review"
  };
}

// Make the function available to local Node.js tests
module.exports = { processInvoice };
