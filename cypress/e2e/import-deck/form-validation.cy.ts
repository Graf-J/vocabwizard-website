/// <reference types="cypress" />
describe('Form Validation', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'AccessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzc3MDQ1OCwiZXhwIjoxNzQ4NjU3MDQ1OH0.Vcu_lRWJ6C2CF5vMRsqGf453tgiQ5m9P8pb4PVV_qaU',
    );
    cy.visit(`${Cypress.env('CLIENT_URL')}/import-deck`);
  });

  it('should disable button if deck-id field is empty', () => {
    cy.get('[data-testid="import-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show required error message if deck-id field is empty', () => {
    cy.get('[data-testid="import-deck-id-input-field"]').focus();
    cy.get('[data-testid="import-deck-id-input-field"]').blur();
    cy.get('[data-testid="import-deck-id-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Required');

    cy.get('[data-testid="import-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should display general error if server-side problem occours', () => {
    cy.intercept('POST', `${Cypress.env('SERVER_URL')}/decks/import`, (req) => {
      req.reply({
        statusCode: 409,
        body: {
          message: 'You already own this deck',
          error: 'Conflict',
          statusCode: 409,
        },
      });
    });

    cy.get('[data-testid="import-deck-id-input-field"]')
      .type('65c2b5544d314afc4856886a')
      .should('have.value', '65c2b5544d314afc4856886a');

    cy.get('[data-testid="import-deck-submit-button"]').click();

    cy.get('[data-testid="import-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
    cy.get('[data-testid="import-deck-general-error"]')
      .should('be.visible')
      .and('have.text', 'You already own this deck');
  });

  it('should not display general error if no server-side problem occours', () => {
    cy.intercept('POST', `${Cypress.env('SERVER_URL')}/decks/import`, (req) => {
      req.reply({
        statusCode: 200,
      });
    });

    cy.get('[data-testid="import-deck-id-input-field"]')
      .type('65c2b5544d314afc4856886a')
      .should('have.value', '65c2b5544d314afc4856886a');

    cy.get('[data-testid="import-deck-submit-button"]').click();

    cy.get('[data-testid="import-deck-general-error"]').should('not.exist');
  });
});
