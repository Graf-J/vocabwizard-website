/// <reference types="cypress" />
describe('Form Validation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });

  it('should disable button if name field is empty', () => {
    cy.get('[data-testid="login-password-input-field"]')
      .type('test#1')
      .should('have.value', 'test#1');

    cy.get('[data-testid="login-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should disable button if password field is empty', () => {
    cy.get('[data-testid="login-name-input-field"]')
      .type('Test-User')
      .should('have.value', 'Test-User');

    cy.get('[data-testid="login-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show error message if name field is empty', () => {
    cy.get('[data-testid="login-name-input-field"]').focus();
    cy.get('[data-testid="login-name-input-field"]').blur();
    cy.get('[data-testid="login-name-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Required');
  });

  it('should show error message if password field is empty', () => {
    cy.get('[data-testid="login-password-input-field"]').focus();
    cy.get('[data-testid="login-password-input-field"]').blur();
    cy.get('[data-testid="login-password-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Required');
  });

  it('should enable button if fields are not empty', () => {
    cy.get('[data-testid="login-name-input-field"]')
      .type('Test-User')
      .should('have.value', 'Test-User');

    cy.get('[data-testid="login-password-input-field"]')
      .type('test#1')
      .should('have.value', 'test#1');

    cy.get('[data-testid="login-submit-button"]').should(
      'not.have.attr',
      'disabled',
    );
  });

  it('should display general error if credentials are not valid', () => {
    cy.intercept('POST', 'http://localhost:3000/auth/login', (req) => {
      req.reply({
        statusCode: 401,
        body: {
          message: 'Username or Password is not valid',
          error: 'Unauthorized',
          statusCode: 401,
        },
      });
    });

    cy.get('[data-testid="login-name-input-field"]')
      .type('Test-User')
      .should('have.value', 'Test-User');

    cy.get('[data-testid="login-password-input-field"]')
      .type('test#1')
      .should('have.value', 'test#1');

    cy.get('[data-testid="login-submit-button"]').click();

    cy.get('[data-testid="login-submit-button"]').should(
      'have.attr',
      'disabled',
    );
    cy.get('[data-testid="login-general-error"]')
      .should('be.visible')
      .and('have.text', 'Username or Password is not valid');
  });

  it('should not display general error if credentials are valid', () => {
    cy.intercept('POST', 'http://localhost:3000/auth/login', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          AccessToken: 'token',
        },
      });
    });

    cy.get('[data-testid="login-name-input-field"]')
      .type('Test-User')
      .should('have.value', 'Test-User');

    cy.get('[data-testid="login-password-input-field"]')
      .type('test#1')
      .should('have.value', 'test#1');

    cy.get('[data-testid="login-submit-button"]').click();

    cy.get('[data-testid="login-general-error"]').should('not.exist');
  });
});
