/// <reference types="cypress" />
describe('Form Validation', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/decks/deck-id', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          id: 'deck-id',
          name: 'Deck-Name',
          learningRate: 10,
          fromLang: 'de',
          toLang: 'en',
        },
      });
    }).as('getDeck');

    window.localStorage.setItem(
      'AccessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzc3MDQ1OCwiZXhwIjoxNzQ4NjU3MDQ1OH0.Vcu_lRWJ6C2CF5vMRsqGf453tgiQ5m9P8pb4PVV_qaU',
    );

    cy.visit('http://localhost:4200/add-card/deck-id');

    cy.wait('@getDeck');
  });

  it('should disable button if word field is empty', () => {
    cy.get('[data-testid="add-card-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show required error message if word field is empty', () => {
    cy.get('[data-testid="add-card-word-input-field"]').focus();
    cy.get('[data-testid="add-card-word-input-field"]').blur();
    cy.get('[data-testid="add-card-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Required');

    cy.get('[data-testid="add-card-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should display general error if server-side problem occours', () => {
    cy.intercept('POST', 'http://localhost:3000/decks/deck-id/cards', (req) => {
      req.reply({
        statusCode: 409,
        body: {
          message: 'The word Test already exists in this deck',
          error: 'Conflict',
          statusCode: 409,
        },
      });
    });

    cy.get('[data-testid="add-card-word-input-field"]')
      .type('Test')
      .should('have.value', 'Test');

    cy.get('[data-testid="add-card-submit-button"]').click();

    cy.get('[data-testid="add-card-submit-button"]').should(
      'have.attr',
      'disabled',
    );
    cy.get('[data-testid="add-card-general-error"]')
      .should('be.visible')
      .and('have.text', 'The word Test already exists in this deck');
  });

  it('should not display general error if no server-side problem occours', () => {
    cy.intercept('POST', 'http://localhost:3000/decks/deck-id/cards', (req) => {
      req.reply({
        statusCode: 200,
      });
    });

    cy.get('[data-testid="add-card-word-input-field"]')
      .type('Test')
      .should('have.value', 'Test');

    cy.get('[data-testid="add-card-submit-button"]').click();

    cy.get('[data-testid="add-card-general-error"]').should('not.exist');
  });
});
