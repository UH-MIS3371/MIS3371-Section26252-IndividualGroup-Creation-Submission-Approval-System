function canApproveInvoice(status) {
    if (status === "Under Review") {
        return "Invoice can be approved";
    } else {
        return "Invoice cannot be approved";
    }
}

// Test the business rule with multiple invoice statuses
console.log("Draft:", canApproveInvoice("Draft"));
console.log("Submitted:", canApproveInvoice("Submitted"));
console.log("Under Review:", canApproveInvoice("Under Review"));
console.log("Approved:", canApproveInvoice("Approved"));
const statusInput = document.querySelector("#invoiceStatus");
const approvalMessage = document.querySelector("#approvalMessage");

statusInput.addEventListener("change", function () {
    const status = statusInput.value;

    if (status === "") {
        approvalMessage.textContent = "";
    } else {
        approvalMessage.textContent = canApproveInvoice(status);
    }
});

 // Week 7 - Invoice Validation and Business Rules

const invoiceForm = document.querySelector("form");
const amountInput = document.querySelector("#amount");
const descriptionInput = document.querySelector("#description");
const urgentInput = document.querySelector("#urgent");
const formMessage = document.querySelector("#formMessage");

// Rule 1: Invoice amount must be greater than zero
function validInvoiceAmount(amount) {
  return Number.isFinite(amount) && amount > 0;
}

// Rule 2: Urgent invoices require an explanation
function urgentExplanationSatisfied(isUrgent, description) {
  return !isUrgent || description.trim().length > 0;
}

// Display feedback when the user changes the form
function updateValidationMessage() {
  const amount = Number(amountInput.value);
  const description = descriptionInput.value;

  if (amountInput.value !== "" && !validInvoiceAmount(amount)) {
    formMessage.textContent = "Invoice amount must be greater than $0.";
  } else if (!urgentExplanationSatisfied(urgentInput.checked, description)) {
    formMessage.textContent = "Urgent invoices require an explanation.";
  } else {
    formMessage.textContent = "";
  }
}

amountInput.addEventListener("input", updateValidationMessage);
descriptionInput.addEventListener("input", updateValidationMessage);
urgentInput.addEventListener("change", updateValidationMessage);
document.querySelector("#normal").addEventListener("change", updateValidationMessage);

// Block submission when validation fails
invoiceForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const description = descriptionInput.value;

  if (!validInvoiceAmount(amount)) {
    formMessage.textContent = "Invoice amount must be greater than $0.";
    amountInput.focus();
    return;
  }

  if (!urgentExplanationSatisfied(urgentInput.checked, description)) {
    formMessage.textContent = "Urgent invoices require an explanation.";
    descriptionInput.focus();
    return;
  }

  formMessage.textContent = "Client-side validation passed. Invoice is ready for review.";
});

// Week 7 boundary and business rule tests
console.log("Amount $0:", validInvoiceAmount(0));       // false
console.log("Amount $0.01:", validInvoiceAmount(0.01)); // true
console.log("Urgent without explanation:", urgentExplanationSatisfied(true, "")); // false
console.log("Urgent with explanation:", urgentExplanationSatisfied(true, "Immediate processing needed")); // true
