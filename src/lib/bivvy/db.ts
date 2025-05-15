import { Database } from 'bivvy';

export const db = new Database({
  schema: {
    portraits: {
      id: 'uuid',
      text: 'text',
      imageUrl: 'text?',
      createdAt: 'timestamp',
      reactions: 'jsonb'
    }
  },
  indexes: [
    { table: 'portraits', columns: ['createdAt'] }
  ]
}); 