export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers:  Array<string>;
  question: string;
  type: string;
}

export interface State {
  loading: boolean;
  error: Error | null;
  questions: Array<Question>;
  activeQuestion: string | null;
  token: string | null;
}

export interface Error {
  message: string;
}
