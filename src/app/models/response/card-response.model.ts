export interface CardResponse {
  id: string;
  word: string;
  translation: string;
  phonetic: string | null;
  audioLink: string | null;
  definitions: string[];
  examples: string[];
  synonyms: string[];
  antonyms: string[];
}
