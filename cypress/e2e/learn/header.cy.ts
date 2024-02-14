/// <reference types="cypress" />
describe('Header', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `${Cypress.env('SERVER_URL')}/decks/deck-id/cards/learn`,
      (req) => {
        req.reply({
          statusCode: 200,
          body: [
            {
              id: '65c2b60a4d314afc485688cb',
              word: 'test',
              translation: 'test',
              phonetic: '/test/',
              audioLink:
                'https://api.dictionaryapi.dev/media/pronunciations/en/easy-uk.mp3',
              definitions: ['Test Definition'],
              examples: ['Test Example'],
              synonyms: ['Test Synonym'],
              antonyms: ['Test Antonym'],
            },
          ],
        });
      },
    );

    window.localStorage.setItem(
      'AccessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzc3MDQ1OCwiZXhwIjoxNzQ4NjU3MDQ1OH0.Vcu_lRWJ6C2CF5vMRsqGf453tgiQ5m9P8pb4PVV_qaU',
    );

    cy.visit(`${Cypress.env('CLIENT_URL')}/learn/deck-id`);
  });

  it('should be visible', () => {
    cy.get('[data-testid="header"]').should('exist');
  });
});
