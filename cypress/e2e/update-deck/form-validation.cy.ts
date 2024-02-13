describe('Header', () => {
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

    cy.visit('http://localhost:4200/update-deck/deck-id');

    cy.wait('@getDeck');
  });

  it('should show required error message if word field is empty', () => {
    cy.get('[data-testid="update-deck-name-input-field"]').clear();
    cy.get('[data-testid="update-deck-name-input-field"]').blur();

    cy.get('[data-testid="update-deck-name-mat-error"]')
      .should('be.visible')
      .and('have.text', 'Required');

    cy.get('[data-testid="update-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should show min-4-characters error message if name is too short', () => {
    cy.get('[data-testid="update-deck-name-input-field"]').clear().type('abc');
    cy.get('[data-testid="update-deck-name-input-field"]').blur();
    cy.get('[data-testid="update-deck-name-mat-error"]')
      .should('be.visible')
      .and('have.text', 'At least 4 characters');

    cy.get('[data-testid="update-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
  });

  it('should display general error if server-side problem occours', () => {
    cy.intercept('PUT', 'http://localhost:3000/decks/deck-id', (req) => {
      req.reply({
        statusCode: 409,
        body: {
          message: 'Unknown Exception',
          error: 'Conflict',
          statusCode: 409,
        },
      });
    });

    cy.get('[data-testid="update-deck-name-input-field"]')
      .clear()
      .type('Test')
      .should('have.value', 'Test');

    cy.get('[data-testid="update-deck-submit-button"]').click();

    cy.get('[data-testid="update-deck-submit-button"]').should(
      'have.attr',
      'disabled',
    );
    cy.get('[data-testid="update-deck-general-error"]')
      .should('be.visible')
      .and('have.text', 'Unknown Exception');
  });

  it('should not display general error if no server-side problem occours', () => {
    cy.intercept('POST', 'http://localhost:3000/decks', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          id: 'deck-id',
          name: 'Test',
          learningRate: 10,
          fromLang: 'de',
          toLang: 'en',
        },
      });
    });

    cy.get('[data-testid="update-deck-name-input-field"]')
      .clear()
      .type('Test')
      .should('have.value', 'Test');

    cy.get('[data-testid="update-deck-submit-button"]').click();

    cy.get('[data-testid="update-deck-general-error"]').should('not.exist');
  });
});
