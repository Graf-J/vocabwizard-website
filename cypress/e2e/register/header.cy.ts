/// <reference types="cypress" />
describe('Header', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('CLIENT_URL')}/register`);
  });

  it('should not be visible', () => {
    cy.get('[data-testid="header"]').should('not.exist');
  });
});
