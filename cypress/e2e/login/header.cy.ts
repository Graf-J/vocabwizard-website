/// <reference types="cypress" />
describe('Header', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });

  it('should not be visible', () => {
    cy.get('[data-testid="header"]').should('not.exist');
  });
});
