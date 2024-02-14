/// <reference types="cypress" />
describe('Content', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('SERVER_URL')}/decks`, (req) => {
      req.reply({
        statusCode: 200,
        body: [
          {
            id: '65c2b5544d314afc4856886a',
            name: 'Test-Deck-1',
            learningRate: 10,
            fromLang: 'de',
            toLang: 'en',
            newCardCount: 2,
            oldCardCount: 0,
          },
          {
            id: '65c2b60a4d314afc485688c6',
            name: 'Test-Deck-2',
            learningRate: 10,
            fromLang: 'de',
            toLang: 'en',
            newCardCount: 2,
            oldCardCount: 2,
          },
          {
            id: '65cbdf734a90232729fdc390',
            name: 'Test-Deck-3',
            learningRate: 10,
            fromLang: 'de',
            toLang: 'en',
            newCardCount: 0,
            oldCardCount: 5,
          },
        ],
      });
    }).as('getDecks');

    window.localStorage.setItem(
      'AccessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzc3MDQ1OCwiZXhwIjoxNzQ4NjU3MDQ1OH0.Vcu_lRWJ6C2CF5vMRsqGf453tgiQ5m9P8pb4PVV_qaU',
    );

    cy.visit(`${Cypress.env('CLIENT_URL')}/`);

    cy.wait('@getDecks');
  });

  it('should have 3 deck elements', () => {
    cy.get('[data-testid="deck-overview-cards"]').should('have.length', 3);
  });

  it('should display title of decks', () => {
    cy.get('[data-testid="deck-card-title"]')
      .eq(0)
      .should('have.text', 'Test-Deck-1');

    cy.get('[data-testid="deck-card-title"]')
      .eq(1)
      .should('have.text', 'Test-Deck-2');

    cy.get('[data-testid="deck-card-title"]')
      .eq(2)
      .should('have.text', 'Test-Deck-3');
  });

  it('should display old-card-count of decks', () => {
    cy.get('[data-testid="deck-card-old-card-count"]')
      .eq(0)
      .should('have.text', '0');

    cy.get('[data-testid="deck-card-old-card-count"]')
      .eq(1)
      .should('have.text', '2');

    cy.get('[data-testid="deck-card-old-card-count"]')
      .eq(2)
      .should('have.text', '5');
  });

  it('should display new-card-count of decks', () => {
    cy.get('[data-testid="deck-card-new-card-count"]')
      .eq(0)
      .should('have.text', '2');

    cy.get('[data-testid="deck-card-new-card-count"]')
      .eq(1)
      .should('have.text', '2');

    cy.get('[data-testid="deck-card-new-card-count"]')
      .eq(2)
      .should('have.text', '0');
  });

  it('should display the import button', () => {
    cy.get('[data-testid="deck-overview-import-button"]').should('exist');
  });

  it('should display the create button', () => {
    cy.get('[data-testid="deck-overview-create-button"]').should('exist');
  });
});
