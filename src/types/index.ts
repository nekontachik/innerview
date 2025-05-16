// Database types
export interface Portrait {
  id: string;
  createdAt: string;
  text: string;
  imageUrl: string;
  reactions: {
    isMe: number;
    isBeautiful: number;
    isTouching: number;
  };
}

// Question types
export interface Question {
  id: string;
  text: string;
  type: 'text' | 'select';
  options?: string[];
}

// Constants
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

// API types
export interface GeneratePortraitRequest {
  answers: Record<string, string>;
}

export interface GeneratePortraitResponse {
  id: string;
  text: string;
  imageUrl: string;
}

export type ReactToPortraitRequest = {
  portraitId: string;
  reactionType: 'isMe' | 'isBeautiful' | 'isTouching';
};

export type ReactToPortraitResponse = {
  isMe: number;
  isBeautiful: number;
  isTouching: number;
};

// Component props types
export type QuestionFormProps = {
  onSubmit: (answers: string[]) => Promise<void>;
  isLoading?: boolean;
};

export type PortraitResultProps = {
  portrait: Portrait;
  onReaction: (type: 'isMe' | 'isBeautiful' | 'isTouching') => Promise<void>;
};

// Page props types
export type ResultPageProps = {
  params: {
    id: string;
  };
};

// Error types
export type ApiError = {
  message: string;
  status: number;
  details?: unknown;
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: Array<{
    path: string;
    message: string;
  }>;
} 