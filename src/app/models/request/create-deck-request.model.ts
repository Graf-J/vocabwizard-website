import { Language } from '../language.enum';

export interface CreateDeckRequest {
  name: string;
  learningRate: number;
  fromLang: Language;
  toLang: Language;
}
