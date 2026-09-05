import { z } from 'zod';

export const createAvailabilityRuleSchema = z.object({
  userId: z.number().int().positive("userId must be a positive integer"),
  dayOfWeek: z.number().int().min(0).max(6, "dayOfWeek must be between 0 (Sunday) and 6 (Saturday)"),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM (e.g. 09:00)"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM (e.g. 17:00)"),
  timezone: z.string().optional().default("UTC"),
});

export const updateAvailabilityRuleSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6, "dayOfWeek must be between 0 (Sunday) and 6 (Saturday)").optional(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM (e.g. 09:00)").optional(),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM (e.g. 17:00)").optional(),
  timezone: z.string().optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided to update",
});

export type CreateAvailabilityRuleDto = z.infer<typeof createAvailabilityRuleSchema>;
export type UpdateAvailabilityRuleDto = z.infer<typeof updateAvailabilityRuleSchema>;
