/// <reference types="cypress" />

describe('Football Data Tests', () => {
  it('should open the website', () => {
    cy.visit('https://www.football-data.org/')
    cy.url().should('include', 'football-data.org')
  })

  it('should test HTTP response codes', () => {
    // Test for 200 OK
    cy.request('GET', 'https://www.football-data.org/api/v2/competitions').then((response) => {
      expect(response.status).to.eq(200)
    })

    // Test for 401 Unauthorized
    cy.request({
      method: 'GET',
      url: 'https://www.football-data.org/api/v2/teams',
      failOnStatusCode: false, // Allows non-2xx status codes to not fail the test
    }).then((response) => {
      expect(response.status).to.eq(401)
    })

    // Test for 304 Not Modified
    cy.request({
      method: 'GET',
      url: 'https://www.football-data.org/api/v2/players',
      headers: {
        'If-Modified-Since': 'Sun, 01 Jan 2023 00:00:00 GMT', // Use a past date to trigger 304 response
      },
    }).then((response) => {
      expect(response.status).to.eq(304)
    })
  })
})
