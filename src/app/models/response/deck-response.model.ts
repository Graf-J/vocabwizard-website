import { Language } from '../language.enum';

export interface DeckResponse {
  id: string;
  name: string;
  fromLang: Language;
  toLang: Language;
  learningRate: number;
}
