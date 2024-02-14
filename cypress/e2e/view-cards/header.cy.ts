/// <reference types="cypress" />
describe('Header', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `${Cypress.env('SERVER_URL')}/decks/deck-id/cards`,
      (req) => {
        req.reply({
          statusCode: 200,
          body: [
            {
              id: '65c2b5b94d314afc48568894',
              word: 'test-word',
              translation: 'test-translation',
              phonetic: 'test-phonetic',
              audioLink:
                'https://api.dictionaryapi.dev/media/pronunciations/en/test-uk.mp3',
              definitions: ['test-definition'],
              examples: ['test-example'],
              synonyms: ['test-synonym'],
              antonyms: ['test-antonym'],
              stage: 2,
              expires: null,
              createdAt: '2024-02-06T22:42:01.013Z',
            },
          ],
        });
      },
    );

    window.localStorage.setItem(
      'AccessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzc3MDQ1OCwiZXhwIjoxNzQ4NjU3MDQ1OH0.Vcu_lRWJ6C2CF5vMRsqGf453tgiQ5m9P8pb4PVV_qaU',
    );

    cy.viewport(1800, 900);

    cy.visit(`${Cypress.env('CLIENT_URL')}/view-cards/deck-id`);
  });

  it('should be visible', () => {
    cy.get('[data-testid="header"]').should('exist');
  });
});
