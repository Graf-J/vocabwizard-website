/// <reference types="cypress" />
describe('Form Validation', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('CLIENT_URL')}/register`);
  });

  it('should disable button if name field is empty', () => {
    cy.get('[data-testid="register-password-input-field"]')
      .type('test#1')
      .should('have.value', 'test#1');

    cy.get('[data-testid="register-password-confirm-input-field"]')
      .type('test#1')
      .should('have.value', 'test#1');

    cy.get('[data-testid="register-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should disable button if password field is empty', () => {
    cy.get('[data-testid="register-name-input-field"]')
      .type('Test-User')
      .should('have.value', 'Test-User');

    cy.get('[data-testid="register-password-confirm-input-field"]')
      .type('test#1')
      .should('have.value', 'test#1');

    cy.get('[data-testid="register-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should disable button if confirm-password field is empty', () => {
    cy.get('[data-testid="register-name-input-field"]')
      .type('Test-User')
      .should('have.value', 'Test-User');

    cy.get('[data-testid="register-password-input-field"]')
      .type('test#1')
      .should('have.value', 'test#1');

    cy.get('[data-testid="register-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show required error message if name field is empty', () => {
    cy.get('[data-testid="register-name-input-field"]').focus();
    cy.get('[data-testid="register-name-input-field"]').blur();
    cy.get('[data-testid="register-name-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Required');

    cy.get('[data-testid="register-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show required error message if password field is empty', () => {
    cy.get('[data-testid="register-password-input-field"]').focus();
    cy.get('[data-testid="register-password-input-field"]').blur();
    cy.get('[data-testid="register-password-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Required');

    cy.get('[data-testid="register-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show required error message if confirm-password field is empty', () => {
    cy.get('[data-testid="register-password-confirm-input-field"]').focus();
    cy.get('[data-testid="register-password-confirm-input-field"]').blur();
    cy.get('[data-testid="register-password-confirm-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Required');

    cy.get('[data-testid="register-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show min-4-characters error message if name is too short', () => {
    cy.get('[data-testid="register-name-input-field"]').type('abc');
    cy.get('[data-testid="register-name-input-field"]').blur();
    cy.get('[data-testid="register-name-mat-error"]')
      .should('be.visible')
      .and('have.text', 'At least 4 characters');

    cy.get('[data-testid="register-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show min-6-characters error message if password is too short', () => {
    cy.get('[data-testid="register-password-input-field"]').type('test');
    cy.get('[data-testid="register-password-input-field"]').blur();
    cy.get('[data-testid="register-password-mat-error"]')
      .should('be.visible')
      .and('have.text', 'At least 6 characters');

    cy.get('[data-testid="register-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show min-1-number-and-1-special-character error message if no number in password', () => {
    cy.get('[data-testid="register-password-input-field"]').type('test##');
    cy.get('[data-testid="register-password-input-field"]').blur();
    cy.get('[data-testid="register-password-mat-error"]')
      .should('be.visible')
      .and('have.text', 'At least 1 number and 1 special character');

    cy.get('[data-testid="register-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show min-1-number-and-1-special-character error message if no special character in password', () => {
    cy.get('[data-testid="register-password-input-field"]').type('test11');
    cy.get('[data-testid="register-password-input-field"]').blur();
    cy.get('[data-testid="register-password-mat-error"]')
      .should('be.visible')
      .and('have.text', 'At least 1 number and 1 special character');

    cy.get('[data-testid="register-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show password-mismatch error message if no special character in password', () => {
    cy.get('[data-testid="register-password-input-field"]').type('test#1');
    cy.get('[data-testid="register-password-input-field"]').blur();

    cy.get('[data-testid="register-password-confirm-input-field"]').type(
      'test#2',
    );
    cy.get('[data-testid="register-password-confirm-input-field"]').blur();

    cy.get('[data-testid="register-password-confirm-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Does not match Password');

    cy.get('[data-testid="register-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should display general error if server-side problem occours', () => {
    cy.intercept(
      'POST',
      `${Cypress.env('SERVER_URL')}/auth/register`,
      (req) => {
        req.reply({
          statusCode: 409,
          body: {
            message: 'User with name Test-User already exist',
            error: 'Conflict',
            statusCode: 409,
          },
        });
      },
    );

    cy.get('[data-testid="register-name-input-field"]')
      .type('Test-User')
      .should('have.value', 'Test-User');

    cy.get('[data-testid="register-password-input-field"]')
      .type('test#1')
      .should('have.value', 'test#1');

    cy.get('[data-testid="register-password-confirm-input-field"]')
      .type('test#1')
      .should('have.value', 'test#1');

    cy.get('[data-testid="register-submit-button"]').click();

    cy.get('[data-testid="register-submit-button"]').should(
      'have.attr',
      'disabled',
    );
    cy.get('[data-testid="register-general-error"]')
      .should('be.visible')
      .and('have.text', 'User with name Test-User already exist');
  });

  it('should not display general error if no server-side problem occours', () => {
    cy.intercept(
      'POST',
      `${Cypress.env('SERVER_URL')}/auth/register`,
      (req) => {
        req.reply({
          statusCode: 200,
          body: {
            AccessToken: 'token',
          },
        });
      },
    );

    cy.get('[data-testid="register-name-input-field"]')
      .type('Test-User')
      .should('have.value', 'Test-User');

    cy.get('[data-testid="register-password-input-field"]')
      .type('test#1')
      .should('have.value', 'test#1');

    cy.get('[data-testid="register-password-confirm-input-field"]')
      .type('test#1')
      .should('have.value', 'test#1');

    cy.get('[data-testid="register-submit-button"]').click();

    cy.get('[data-testid="register-general-error"]').should('not.exist');
  });
});
