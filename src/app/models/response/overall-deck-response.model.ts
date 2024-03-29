import { Language } from '../language.enum';

export interface OverallDeckResponse {
  id: string;
  name: string;
  fromLang: Language;
  toLang: Language;
  learningRate: number;
  oldCardCount: number;
  newCardCount: number;
}
