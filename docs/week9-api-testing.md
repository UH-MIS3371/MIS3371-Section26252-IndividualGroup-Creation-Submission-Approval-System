# Week 9 - Frontend and Backend API Integration Testing

## Project
Invoice Creation, Submission, and Approval System

## Testing Date
October 22, 2026

## Objective
Verify that the existing invoice interface communicates with the local Express API, applies invoice business rules, and displays processing results.

## Testing Environment
- GitHub Codespaces
- Node.js and Express
- HTML, CSS, and JavaScript
- HTTP POST requests using fetch()
- JSON request and response data

## Project Files
- src/index.html
- src/styles.css
- src/app.js
- backend/backend.js
- server/server.js
- package.json

## API Endpoint
POST /api/invoices

The frontend sends invoice data as JSON to the Express server. The server uses the existing processInvoice() function to validate the information and return a structured response.

## Test Cases

| Test | Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| Valid Invoice | $150.00, Under Review | Successful processing and ready for approval | Invoice processed successfully. Ready for Approval | PASS |
| Missing Invoice Number | Empty required invoice number field | Browser blocks submission | Please fill out this field | PASS |
| Boundary Case | $0.01, Under Review | Successful processing | Invoice processed successfully. Ready for Approval | PASS |
| Unsupported Status | Approved | Backend rejects status | Invalid invoice status for submission. | PASS |

## Test Results
All four tested scenarios passed (4/4).

The valid and boundary cases confirmed successful frontend-to-backend communication. The unsupported-status case confirmed that the API rejects an invalid invoice status. The missing-invoice-number case confirmed browser-level required-field validation; it did not send a request to the backend.

## Current Limitations
- Invoice information is not saved to a database.
- The API returns validation and processing results only.
- The interface does not yet provide a complete invoice approval workflow.

## Conclusion
The Week 9 implementation successfully connected the existing invoice form to the Express backend using HTTP POST requests and JSON. The tested scenarios behaved as expected, demonstrating basic API integration and invoice business rule enforcement.