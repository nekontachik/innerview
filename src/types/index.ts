// Database types
export type Portrait = {
  id: string;
  text: string;
  imageurl?: string;
  createdat: string;
  reactions: {
    isMe: number;
    isBeautiful: number;
    isTouching: number;
  };
};

// API types
export type GeneratePortraitRequest = {
  answers: string[];
};

export type GeneratePortraitResponse = {
  id: string;
  text: string;
  imageurl?: string;
};

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