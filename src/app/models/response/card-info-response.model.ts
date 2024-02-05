export interface CardInfoResponse {
  id: string;
  word: string;
  translation: string;
  phonetic: string | null;
  audioLink: string | null;
  definitions: string[];
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  stage: number;
  expires: Date | null;
  createdAt: Date;
}
