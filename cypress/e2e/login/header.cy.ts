/// <reference types="cypress" />
describe('Header', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('CLIENT_URL')}/login`);
  });

  it('should not be visible', () => {
    cy.get('[data-testid="header"]').should('not.exist');
  });
});
