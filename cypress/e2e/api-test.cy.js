/// <reference types="cypress" />

// Import necessary npm packages for HTML report generation
const { create } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

// Test Suite
describe('Football Data API Tests', () => {
  // Test Case 1: Test HTTP response code 200 OK
  it('Should receive HTTP response code 200', () => {
    // Send a request to the API endpoint and check the response status
    cy.request('GET', 'https://api.football-data.org/v2/')
      .its('status')
      .should('eq', 200);
  });

  // Test Case 2: Test HTTP response code 401 Unauthorized
  it('Should receive HTTP response code 401', () => {
    // Send a request with an invalid or missing API token and check the response status
    cy.request({
      method: 'GET',
      url: 'https://api.football-data.org/v2/',
      headers: {
        'X-Auth-Token': 'invalid_token',
      },
      failOnStatusCode: false, // Do not fail on non-2xx status codes
    }).then((response) => {
      expect(response.status).to.equal(401);
    });
  });

  // Test Case 3: Test HTTP response code 304 Not Modified
  it('Should receive HTTP response code 304', () => {
    // Send a request with If-Modified-Since header and check the response status
    cy.request({
      method: 'GET',
      url: 'https://api.football-data.org/v2/',
      headers: {
        'If-Modified-Since': 'Sat, 31 Jul 2023 00:00:00 GMT', // A date in the future, so it should not be modified
      },
      failOnStatusCode: false, // Do not fail on non-2xx status codes
    }).then((response) => {
      expect(response.status).to.equal(304);
    });
  });

  // Run this after all the tests in this suite have completed
  after(() => {
    // Generate the HTML report of the test results
    create().then((jsonReport) => {
      generator.create(jsonReport);
    });
  });
});
