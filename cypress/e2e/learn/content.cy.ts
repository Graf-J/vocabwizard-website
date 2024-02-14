/// <reference types="cypress" />
describe('Content', () => {
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
              word: 'test-word',
              translation: 'test-translation',
              phonetic: 'test-phonetic',
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
    ).as('getLearnCards');

    window.localStorage.setItem(
      'AccessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWMxNWViNWY3M2IyODczZTY4MWE3ZTAiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTcwNzc3MDQ1OCwiZXhwIjoxNzQ4NjU3MDQ1OH0.Vcu_lRWJ6C2CF5vMRsqGf453tgiQ5m9P8pb4PVV_qaU',
    );

    cy.visit(`${Cypress.env('CLIENT_URL')}/learn/deck-id`);

    cy.wait('@getLearnCards');
  });

  it('should display word on card-front', () => {
    cy.get('[data-testid="vocab-card-word"]').should('have.text', 'test-word');
  });

  it('should display translation on card-back', () => {
    cy.get('[data-testid="learn-check-button"]').click();

    cy.get('[data-testid="vocab-card-translation"]').should(
      'have.text',
      'test-translation',
    );
  });

  it('should display audio button on card-back', () => {
    cy.get('[data-testid="learn-check-button"]').click();

    cy.get('[data-testid="vocab-card-audio-button"]').should('exist');
  });

  it('should display phonetic on card-back', () => {
    cy.get('[data-testid="learn-check-button"]').click();

    cy.get('[data-testid="vocab-card-phonetic"]').should(
      'have.text',
      'test-phonetic',
    );
  });

  it('should display definitions-dropdown on card-back', () => {
    cy.get('[data-testid="learn-check-button"]').click();

    cy.get('[data-testid="vocab-card-definitions-dropdown"]').should('exist');
  });

  it('should display examples-dropdown on card-back', () => {
    cy.get('[data-testid="learn-check-button"]').click();

    cy.get('[data-testid="vocab-card-examples-dropdown"]').should('exist');
  });

  it('should display synonyms-dropdown on card-back', () => {
    cy.get('[data-testid="learn-check-button"]').click();

    cy.get('[data-testid="vocab-card-synonyms-dropdown"]').should('exist');
  });

  it('should display antonyms-dropdown on card-back', () => {
    cy.get('[data-testid="learn-check-button"]').click();

    cy.get('[data-testid="vocab-card-antonyms-dropdown"]').should('exist');
  });

  it('should display easy button', () => {
    cy.get('[data-testid="learn-check-button"]').click();

    cy.get('[data-testid="learn-easy-button"]').should('exist');
  });

  it('should display good button', () => {
    cy.get('[data-testid="learn-check-button"]').click();

    cy.get('[data-testid="learn-good-button"]').should('exist');
  });

  it('should display hard button', () => {
    cy.get('[data-testid="learn-check-button"]').click();

    cy.get('[data-testid="learn-hard-button"]').should('exist');
  });

  it('should display repeat button', () => {
    cy.get('[data-testid="learn-check-button"]').click();

    cy.get('[data-testid="learn-repeat-button"]').should('exist');
  });
});
