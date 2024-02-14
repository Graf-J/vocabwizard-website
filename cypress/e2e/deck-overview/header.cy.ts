/// <reference types="cypress" />
describe('Header', () => {
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
    });

    window.localStorage.setItem(
      'AccessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzc3MDQ1OCwiZXhwIjoxNzQ4NjU3MDQ1OH0.Vcu_lRWJ6C2CF5vMRsqGf453tgiQ5m9P8pb4PVV_qaU',
    );

    cy.visit(`${Cypress.env('CLIENT_URL')}/`);
  });

  it('should be visible', () => {
    cy.get('[data-testid="header"]').should('exist');
  });
});
