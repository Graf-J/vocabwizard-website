/// <reference types="cypress" />
describe('Content', () => {
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
              word: 'test-word-1',
              translation: 'test-translation-1',
              phonetic: 'test-phonetic-1',
              audioLink:
                'https://api.dictionaryapi.dev/media/pronunciations/en/test-uk.mp3',
              definitions: ['test-definition-1'],
              examples: ['test-example-1'],
              synonyms: ['test-synonym-1'],
              antonyms: ['test-antonym-1'],
              stage: 1,
              expires: null,
              createdAt: '2024-02-06T22:42:01.013Z',
            },
            {
              id: '65c2b5b94d314afc48568894',
              word: 'test-word-2',
              translation: 'test-translation-2',
              phonetic: 'test-phonetic-2',
              audioLink:
                'https://api.dictionaryapi.dev/media/pronunciations/en/test-uk.mp3',
              definitions: ['test-definition-2'],
              examples: ['test-example-2'],
              synonyms: ['test-synonym-2'],
              antonyms: ['test-antonym-2'],
              stage: 2,
              expires: '2024-03-06T22:42:01.013Z',
              createdAt: '2024-02-06T22:42:01.013Z',
            },
          ],
        });
      },
    ).as('getCards');

    window.localStorage.setItem(
      'AccessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzc3MDQ1OCwiZXhwIjoxNzQ4NjU3MDQ1OH0.Vcu_lRWJ6C2CF5vMRsqGf453tgiQ5m9P8pb4PVV_qaU',
    );

    cy.viewport(1800, 900);

    cy.visit(`${Cypress.env('CLIENT_URL')}/view-cards/deck-id`);

    cy.wait('@getCards');
  });

  it('should display words', () => {
    cy.get('[data-testid="view-cards-word"]')
      .eq(0)
      .should('have.text', 'test-word-1');

    cy.get('[data-testid="view-cards-word"]')
      .eq(1)
      .should('have.text', 'test-word-2');
  });

  it('should display stage', () => {
    cy.get('[data-testid="view-cards-stage"]').eq(0).should('have.text', '1');

    cy.get('[data-testid="view-cards-stage"]').eq(1).should('have.text', '2');
  });

  it('should display createdAt', () => {
    cy.get('[data-testid="view-cards-created-at"]')
      .eq(0)
      .should('have.text', 'Feb 6, 2024, 11:42:01 PM');

    cy.get('[data-testid="view-cards-created-at"]')
      .eq(1)
      .should('have.text', 'Feb 6, 2024, 11:42:01 PM');
  });

  it('should display expires', () => {
    cy.get('[data-testid="view-cards-expires"]').eq(0).should('have.text', '');

    cy.get('[data-testid="view-cards-expires"]')
      .eq(1)
      .should('have.text', 'Mar 6, 2024, 11:42:01 PM');
  });

  it('should display view buttons', () => {
    cy.get('[data-testid="view-cards-view-button"]').eq(0).should('exist');

    cy.get('[data-testid="view-cards-view-button"]').eq(1).should('exist');
  });

  it('should display delete buttons', () => {
    cy.get('[data-testid="view-cards-delete-button"]').eq(0).should('exist');

    cy.get('[data-testid="view-cards-delete-button"]').eq(1).should('exist');
  });

  it('should display card after view-button click', () => {
    cy.get('[data-testid="view-cards-view-button"]').eq(0).click();

    cy.get('[data-testid="view-cards-card"]').should('exist');
  });

  it('should navigate to card-page after view-button click for small screen', () => {
    cy.viewport('iphone-6');

    cy.get('[data-testid="view-cards-view-button"]').eq(0).click();

    cy.get('[data-testid="view-cards-card"]').should('not.exist');
  });
});
