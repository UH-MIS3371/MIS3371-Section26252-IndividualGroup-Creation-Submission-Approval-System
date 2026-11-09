
// MIS 3371 - Invoice Creation, Submission, and Approval System
// AWS Amplify + API Gateway + AWS Lambda Integration

// API Gateway endpoint
const API_URL =
  "https://ofi5ftcd70.execute-api.us-east-1.amazonaws.com/api/invoices";

// Week 6 - Invoice Approval Business Rule

function canApproveInvoice(status) {
  if (status === "Under Review") {
    return "Invoice can be approved";
  } else {
    return "Invoice cannot be approved";
  }
}

// Test the business rule
console.log("Draft:", canApproveInvoice("Draft"));
console.log("Submitted:", canApproveInvoice("Submitted"));
console.log("Under Review:", canApproveInvoice("Under Review"));
console.log("Approved:", canApproveInvoice("Approved"));

// Form elements
const invoiceForm = document.querySelector("form");
const statusInput = document.querySelector("#invoiceStatus");
const approvalMessage = document.querySelector("#approvalMessage");
const amountInput = document.querySelector("#amount");
const descriptionInput = document.querySelector("#description");
const urgentInput = document.querySelector("#urgent");
const normalInput = document.querySelector("#normal");
const formMessage = document.querySelector("#formMessage");
const invoiceNumberInput = document.querySelector("#invoiceNumber");
const customerNameInput = document.querySelector("#customerName");

// Display approval eligibility
statusInput.addEventListener("change", function () {
  const status = statusInput.value;

  if (status === "") {
    approvalMessage.textContent = "";
  } else {
    approvalMessage.textContent = canApproveInvoice(status);
  }
});

// Week 7 - Invoice Validation

function validInvoiceAmount(amount) {
  return Number.isFinite(amount) && amount > 0;
}

function urgentExplanationSatisfied(isUrgent, description) {
  return !isUrgent || description.trim().length > 0;
}

// Display validation messages
function updateValidationMessage() {
  const amount = Number(amountInput.value);
  const description = descriptionInput.value;

  if (
    amountInput.value !== "" &&
    !validInvoiceAmount(amount)
  ) {
    formMessage.textContent =
      "Invoice amount must be greater than $0.";
  } else if (
    !urgentExplanationSatisfied(
      urgentInput.checked,
      description
    )
  ) {
    formMessage.textContent =
      "Urgent invoices require an explanation.";
  } else {
    formMessage.textContent = "";
  }
}

// Listen for form changes
amountInput.addEventListener("input", updateValidationMessage);
descriptionInput.addEventListener("input", updateValidationMessage);
urgentInput.addEventListener("change", updateValidationMessage);

if (normalInput) {
  normalInput.addEventListener("change", updateValidationMessage);
}

// Week 9 - AWS API Gateway and Lambda Integration

invoiceForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const description = descriptionInput.value.trim();
  const invoiceNumber = invoiceNumberInput.value.trim();
  const customerName = customerNameInput.value.trim();
  const status = statusInput.value;

  // Validate invoice number
  if (invoiceNumber === "") {
    formMessage.textContent =
      "Invoice number is required.";
    invoiceNumberInput.focus();
    return;
  }

  // Validate customer name
  if (customerName === "") {
    formMessage.textContent =
      "Customer name is required.";
    customerNameInput.focus();
    return;
  }

  // Validate amount
  if (
    amountInput.value.trim() === "" ||
    !validInvoiceAmount(amount)
  ) {
    formMessage.textContent =
      "Invoice amount must be greater than $0.";
    amountInput.focus();
    return;
  }

  // Validate status
  if (status === "") {
    formMessage.textContent =
      "Please select an invoice status.";
    statusInput.focus();
    return;
  }

  // Validate urgent invoice
  if (
    !urgentExplanationSatisfied(
      urgentInput.checked,
      description
    )
  ) {
    formMessage.textContent =
      "Urgent invoices require an explanation.";
    descriptionInput.focus();
    return;
  }

  // Prepare invoice data
  const invoice = {
    invoiceNumber: invoiceNumber,
    customerName: customerName,
    amount: amount,
    status: status,
    description: description
  };

  formMessage.textContent =
    "Processing invoice...";

  try {
    // Send invoice through API Gateway to AWS Lambda
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(invoice)
    });

    const result = await response.json();

    console.log("AWS API Gateway Response:", result);

    // Handle rejected invoices
    if (!response.ok || result.success === false) {
      formMessage.textContent =
        result.message || "Invoice rejected.";
      return;
    }

    // Display successful validation
    const eligible =
      result.invoice?.eligibleForApproval;

    if (eligible === true) {
      formMessage.textContent =
        (result.message || "Invoice validated successfully.") +
        " Invoice is eligible for approval.";
    } else {
      formMessage.textContent =
        (result.message || "Invoice validated successfully.") +
        " Invoice is not eligible for approval.";
    }

  } catch (error) {
    console.error("AWS API Gateway Error:", error);

    formMessage.textContent =
      "Unable to connect to the invoice server.";
  }
});

// Week 7 - Boundary and Business Rule Tests

console.log("Amount $0:", validInvoiceAmount(0));
console.log("Amount $0.01:", validInvoiceAmount(0.01));

console.log(
  "Urgent without explanation:",
  urgentExplanationSatisfied(true, "")
);

console.log(
  "Urgent with explanation:",
  urgentExplanationSatisfied(
    true,
    "Immediate processing needed"
  )
);
