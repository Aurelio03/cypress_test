describe('DuckDuckGo Search and Verify Link', () => {
  it('Should open DuckDuckGo, search for "The dev-friendly football API", click the first result, and verify the URL', () => {
    // Step 1: Open URL https://duckduckgo.com
    cy.visit('https://duckduckgo.com');

    // Step 2: Enter "The dev-friendly football API" in the search box.
    cy.get('#searchbox_input').type('The dev-friendly football API');

    // Step 3: Do the Search.
    cy.get('.searchbox_searchButton__F5Bwq').click();

    // Step 4: Click on the first search result link.
    cy.get('li:nth-child(3) > article:nth-child(1) > div:nth-child(2) > h2:nth-child(1) > a').first().invoke('attr', 'href').then((href) => {
      // Step 5: Check if the URL contains "https://www.football-data.org/" using cy.request().
      cy.request(href).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include('https://www.football-data.org/');
      });
    });
  });
});
