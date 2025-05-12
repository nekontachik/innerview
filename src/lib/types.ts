export interface Question {
  id: string;
  text: string;
  type: 'text' | 'select';
  options?: string[];
}

export interface Portrait {
  id: string;
  text: string;
  imageUrl?: string;
  createdAt: Date;
  reactions: {
    isMe: number;
    isBeautiful: number;
    isTouching: number;
  };
}

// Guard rails
export const MAX_ANSWER_LENGTH = 500;
export const MIN_ANSWER_LENGTH = 10;
export const REQUIRED_QUESTIONS = 3;

// Questions data
export const questions: Question[] = [
  {
    id: '1',
    text: 'Що ти хочеш, щоб інші про тебе знали, але не видно ззовні?',
    type: 'text'
  },
  {
    id: '2',
    text: 'Якби ти був природним явищем — чим саме?',
    type: 'text'
  },
  {
    id: '3',
    text: 'Який стан або емоція останнім часом в тобі живе?',
    type: 'text'
  }
]; 