/// <reference types="cypress" />
describe('Header', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('SERVER_URL')}/users`, (req) => {
      req.reply({
        statusCode: 200,
        body: [
          {
            id: '65c15eb5f73b2873e681a7e0',
            name: 'Admin-User',
            role: 'administrator',
            createdAt: '2024-02-05T22:18:29.594Z',
          },
          {
            id: '65c15eb5f73b2873e681a7e1',
            name: 'Test-User',
            role: 'user',
            createdAt: '2024-03-05T22:18:29.594Z',
          },
        ],
      });
    });

    window.localStorage.setItem(
      'AccessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzc3MDQ1OCwiZXhwIjoxNzQ4NjU3MDQ1OH0.Vcu_lRWJ6C2CF5vMRsqGf453tgiQ5m9P8pb4PVV_qaU',
    );

    cy.visit(`${Cypress.env('CLIENT_URL')}/user`);
  });

  it('should be visible', () => {
    cy.get('[data-testid="header"]').should('exist');
  });
});
