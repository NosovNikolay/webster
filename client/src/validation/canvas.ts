import { z } from 'zod';

export const createSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const updateSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type ICreate = z.infer<typeof createSchema>;
export type IUpdate = z.infer<typeof updateSchema>;
