## AWS Cloud Integration and Testing

The Invoice Creation, Submission, and Approval System uses AWS Amplify to host the frontend and AWS Lambda (Node.js) to validate invoices through an HTTP endpoint.

### Business Rules
- Invoice amount must be greater than $0.
- Invoice number and customer name are required.
- Urgent invoices require an explanation.
- Only invoices with Under Review status are eligible for approval.

### Testing Results
- Valid invoice: Passed backend validation.
- Invalid amount ($0): Correctly rejected by frontend validation.
- Draft/Submitted status: Not eligible for approval.
- Under Review status: Eligible for approval.
- Frontend-to-Lambda connection: Successful.

### Deployment
Frontend: https://main.d2f8gqlgdrgb6q.amplifyapp.com

The AWS Lambda function is configured with CORS to allow requests from the deployed frontend.
