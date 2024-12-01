import { z } from 'zod';

export const schema = z.object({
  todos: z.array(z.object({
    title: z.string(),
    notes: z.string() 
  })),
});