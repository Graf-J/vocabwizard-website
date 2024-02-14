/// <reference types="cypress" />
describe('Content', () => {
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
    }).as('getUsers');

    window.localStorage.setItem(
      'AccessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzc3MDQ1OCwiZXhwIjoxNzQ4NjU3MDQ1OH0.Vcu_lRWJ6C2CF5vMRsqGf453tgiQ5m9P8pb4PVV_qaU',
    );

    cy.visit(`${Cypress.env('CLIENT_URL')}/user`);

    cy.wait('@getUsers');
  });

  it('should display user names', () => {
    cy.get('[data-testid="user-table-name"]')
      .eq(0)
      .should('have.text', 'Admin-User');

    cy.get('[data-testid="user-table-name"]')
      .eq(1)
      .should('have.text', 'Test-User');
  });

  it('should display createdAt dates', () => {
    cy.get('[data-testid="user-table-created-at"]')
      .eq(0)
      .should('have.text', '2/5/24, 11:18 PM');

    cy.get('[data-testid="user-table-created-at"]')
      .eq(1)
      .should('have.text', '3/5/24, 11:18 PM');
  });

  it('should display admin-icons', () => {
    cy.get('[data-testid="user-table-admin"]').eq(0).should('exist');

    cy.get('[data-testid="user-table-user"]').eq(0).should('exist');
  });

  it('should delete-buttons', () => {
    cy.get('[data-testid="user-table-delete-button"]')
      .eq(0)
      .should('exist')
      .and('have.attr', 'disabled');

    cy.get('[data-testid="user-table-delete-button"]')
      .eq(1)
      .should('exist')
      .and('not.have.attr', 'disabled');
  });
});
