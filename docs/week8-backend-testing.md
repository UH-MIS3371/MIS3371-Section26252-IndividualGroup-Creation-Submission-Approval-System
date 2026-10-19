# Week 8 - Local Backend Testing

## Project
Invoice Creation, Submission, and Approval System

## Objective
Validate invoice information independently of the browser, apply invoice business rules, and return structured processing results.

## Files
- backend/backend.js
- backend/test-backend.js

## Business Rules
1. Invoice number and customer name are required.
2. Invoice amount must be greater than $0.
3. Only Draft, Submitted, and Under Review are accepted statuses. Under Review is eligible for approval; other accepted statuses are pending review.

## Test Cases
| Test | Expected Success | Actual Success | Result |
|---|---|---|---|
| Valid 1 - Submitted invoice | true | Not yet verified | Pending |
| Valid 2 - Under Review invoice | true | Not yet verified | Pending |
| Invalid 1 - Missing invoice number | false | Not yet verified | Pending |
| Invalid 2 - Unsupported status | false | Not yet verified | Pending |
| Boundary 1 - Zero amount | false | Not yet verified | Pending |
| Boundary 2 - Minimum positive amount ($0.01) | true | Not yet verified | Pending |

## Test Execution
Run from the project root:

`node backend/test-backend.js`

Record the actual console output and update the Actual Success and Result columns after executing the tests.

## Current Status
Six test cases have been written. Actual execution results have not yet been independently verified. No frontend/backend integration, API, AWS, or database is required for Week 8.
