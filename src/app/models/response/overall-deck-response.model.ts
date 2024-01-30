import { Language } from '../language.enum';

export interface OverallDeckResponse {
  id: string;
  name: string;
  fromLang: string;
  toLang: string;
  learningRate: number;
  oldCardCount: Language;
  newCardCount: Language;
}
