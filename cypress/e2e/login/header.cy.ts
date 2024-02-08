describe('Header', () => {
  it('should not be visible', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('[data-testid=header]').should('not.exist');
  });
});
