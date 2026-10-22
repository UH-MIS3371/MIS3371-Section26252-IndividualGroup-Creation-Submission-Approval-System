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
| Valid 1 - Submitted invoice | true | true | PASS |
| Valid 2 - Under Review invoice | true | true | PASS |
| Invalid 1 - Missing invoice number | false | false | PASS |
| Invalid 2 - Unsupported status | false | false | PASS |
| Boundary 1 - Zero amount | false | false | PASS |
| Boundary 2 - Minimum positive amount ($0.01) | true | true | PASS |

## Test Execution
Run from the project root:

`node backend/test-backend.js`


## Current Status

All six backend test cases were executed successfully
on October 22, 2026, using Node.js in GitHub Codespaces.
All tests passed (6/6).

The tests verified valid invoice processing,
invalid input rejection, and invoice amount
boundary conditions.
