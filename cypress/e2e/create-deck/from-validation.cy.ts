/// <reference types="cypress" />
describe('Form Validation', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'AccessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzc3MDQ1OCwiZXhwIjoxNzQ4NjU3MDQ1OH0.Vcu_lRWJ6C2CF5vMRsqGf453tgiQ5m9P8pb4PVV_qaU',
    );
    cy.visit(`${Cypress.env('CLIENT_URL')}/create-deck`);
  });

  it('should disable button if name field is empty', () => {
    cy.get('[data-testid="create-deck-source-language-select"]')
      .click()
      .get('mat-option')
      .contains('German')
      .click();

    cy.get('[data-testid="create-deck-target-language-select"]')
      .click()
      .get('mat-option')
      .contains('English')
      .click();

    cy.get('[data-testid="create-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should disable button if source language field is empty', () => {
    cy.get('[data-testid="create-deck-name-input-field"]').type('Test-Deck');

    cy.get('[data-testid="create-deck-target-language-select"]')
      .click()
      .get('mat-option')
      .contains('English')
      .click();

    cy.get('[data-testid="create-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should disable button if target language field is empty', () => {
    cy.get('[data-testid="create-deck-name-input-field"]').type('Test-Deck');

    cy.get('[data-testid="create-deck-source-language-select"]')
      .click()
      .get('mat-option')
      .contains('German')
      .click();

    cy.get('[data-testid="create-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show required error message if name field is empty', () => {
    cy.get('[data-testid="create-deck-name-input-field"]').focus();
    cy.get('[data-testid="create-deck-name-input-field"]').blur();
    cy.get('[data-testid="create-deck-name-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Required');

    cy.get('[data-testid="create-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show required error message if source-language select is empty', () => {
    cy.get('[data-testid="create-deck-source-language-select"]').focus();
    cy.get('[data-testid="create-deck-source-language-select"]').blur();
    cy.get('[data-testid="create-deck-source-language-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Required');

    cy.get('[data-testid="create-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show required error message if target-language select is empty', () => {
    cy.get('[data-testid="create-deck-target-language-select"]').focus();
    cy.get('[data-testid="create-deck-target-language-select"]').blur();
    cy.get('[data-testid="create-deck-target-language-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Required');

    cy.get('[data-testid="create-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show min-4-characters error message if name is too short', () => {
    cy.get('[data-testid="create-deck-name-input-field"]').type('abc');
    cy.get('[data-testid="create-deck-name-input-field"]').blur();
    cy.get('[data-testid="create-deck-name-mat-error"]')
      .should('be.visible')
      .and('have.text', 'At least 4 characters');

    cy.get('[data-testid="create-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show same-language error message if languages are equal', () => {
    cy.get('[data-testid="create-deck-source-language-select"]')
      .click()
      .get('mat-option')
      .contains('German')
      .click();

    cy.get('[data-testid="create-deck-target-language-select"]')
      .click()
      .get('mat-option')
      .contains('German')
      .click();

    cy.get('[data-testid="create-deck-source-language-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Languages can not be the same');

    cy.get('[data-testid="create-deck-target-language-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Languages can not be the same');
  });

  it('should show missing-english error message if no select contains English as language', () => {
    cy.get('[data-testid="create-deck-source-language-select"]')
      .click()
      .get('mat-option')
      .contains('French')
      .click();

    cy.get('[data-testid="create-deck-target-language-select"]')
      .click()
      .get('mat-option')
      .contains('German')
      .click();

    cy.get('[data-testid="create-deck-source-language-mat-error"]')
      .should('be.visible')
      .and('have.text', 'One Language has to be English');

    cy.get('[data-testid="create-deck-target-language-mat-error"]')
      .should('be.visible')
      .and('have.text', 'One Language has to be English');
  });

  it('should display general error if server-side problem occours', () => {
    cy.intercept('POST', `${Cypress.env('SERVER_URL')}/decks`, (req) => {
      req.reply({
        statusCode: 409,
        body: {
          message: 'Deck already exists: Test',
          error: 'Conflict',
          statusCode: 409,
        },
      });
    });

    cy.get('[data-testid="create-deck-name-input-field"]')
      .type('Test')
      .should('have.value', 'Test');

    cy.get('[data-testid="create-deck-source-language-select"]')
      .click()
      .get('mat-option')
      .contains('English')
      .click();

    cy.get('[data-testid="create-deck-target-language-select"]')
      .click()
      .get('mat-option')
      .contains('German')
      .click();

    cy.get('[data-testid="create-deck-submit-button"]').click();

    cy.get('[data-testid="create-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
    cy.get('[data-testid="create-deck-general-error"]')
      .should('be.visible')
      .and('have.text', 'Deck already exists: Test');
  });

  it('should not display general error if no server-side problem occours', () => {
    cy.intercept('POST', `${Cypress.env('SERVER_URL')}/decks`, (req) => {
      req.reply({
        statusCode: 201,
        body: {
          id: '65cbdf734a90232729fdc390',
        },
      });
    });

    cy.get('[data-testid="create-deck-name-input-field"]')
      .type('Test')
      .should('have.value', 'Test');

    cy.get('[data-testid="create-deck-source-language-select"]')
      .click()
      .get('mat-option')
      .contains('English')
      .click();

    cy.get('[data-testid="create-deck-target-language-select"]')
      .click()
      .get('mat-option')
      .contains('German')
      .click();

    cy.get('[data-testid="create-deck-submit-button"]').click();

    cy.get('[data-testid="create-deck-general-error"]').should('not.exist');
  });
});
