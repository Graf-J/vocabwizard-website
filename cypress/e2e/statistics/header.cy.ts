/// <reference types="cypress" />
describe('Header', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `${Cypress.env('SERVER_URL')}/decks/deck-id/stats`,
      (req) => {
        req.reply({
          statusCode: 200,
          body: [
            {
              stage: 2,
              count: 1,
            },
            {
              stage: 0,
              count: 2,
            },
            {
              stage: 1,
              count: 1,
            },
          ],
        });
      },
    );

    cy.viewport(1800, 900);

    window.localStorage.setItem(
      'AccessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzc3MDQ1OCwiZXhwIjoxNzQ4NjU3MDQ1OH0.Vcu_lRWJ6C2CF5vMRsqGf453tgiQ5m9P8pb4PVV_qaU',
    );

    cy.visit(`${Cypress.env('CLIENT_URL')}/statistics/deck-id`);
  });

  it('should be visible', () => {
    cy.get('[data-testid="header"]').should('exist');
  });
});
