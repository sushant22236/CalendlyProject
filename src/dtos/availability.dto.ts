import { z } from 'zod';

// --- Availability Rule DTOs ---

const baseAvailabilityRuleSchema = z.object({
  weekday: z.number().int().min(0).max(6, "dayOfWeek must be between 0 (Sunday) and 6 (Saturday)"),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM (e.g. 09:00)"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM (e.g. 17:00)"),
  isActive: z.boolean().optional().default(true),
  timezone: z.string().optional().default("UTC"),
});

export const createAvailabilityRuleSchema = baseAvailabilityRuleSchema.refine((rule) => rule.startTime < rule.endTime, {
  message: "Start time must be less than end time"
});

export const updateAvailabilityRuleSchema = baseAvailabilityRuleSchema.partial().refine((rule) => {
  if (rule.startTime && rule.endTime) {
    return rule.startTime < rule.endTime;
  }
  return true;
}, {
  message: "Start time must be less than end time"
});

export type CreateAvailabilityRuleDto = z.infer<typeof createAvailabilityRuleSchema>;
export type UpdateAvailabilityRuleDto = z.infer<typeof updateAvailabilityRuleSchema>;


// --- Availability Exceptions DTOs ---

const baseAvailabilityExceptionSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
  type: z.enum(["BLOCK_FULL_DAY", "BLOCK_PARTIAL", "ADD_AVAILABLE_WINDOW"], { errorMap: () => ({ message: "Type must be 'BLOCK_FULL_DAY', 'BLOCK_PARTIAL', or 'ADD_AVAILABLE_WINDOW'" }) }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM (e.g. 09:00)").optional(),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM (e.g. 17:00)").optional(),
  timezone: z.string().optional().default("UTC"),
  reason: z.string().optional()
});

export const createAvailabilityExceptionSchema = baseAvailabilityExceptionSchema.superRefine((data, ctx) => {
  if (data.type !== 'BLOCK_FULL_DAY') {
    if (!data.startTime) {
      ctx.addIssue({ path: ['startTime'], code: 'custom', message: "Start time is required for not full time exception" });
    }
    if (!data.endTime) {
      ctx.addIssue({ path: ['endTime'], code: 'custom', message: "End time is required for not full time exception" });
    }
    if (data.startTime && data.endTime && data.startTime >= data.endTime) {
      ctx.addIssue({ path: ['startTime'], code: 'custom', message: "Start time must be less than end time" });
    }
  }
  if (data.type === 'BLOCK_FULL_DAY') {
    if (data.startTime) {
      ctx.addIssue({ path: ['startTime'], code: 'custom', message: "Start time is not required for full day block" });
    }
    if (data.endTime) {
      ctx.addIssue({ path: ['endTime'], code: 'custom', message: "End time is not required for full day block" });
    }
  }
});

export const updateAvailabilityExceptionSchema = baseAvailabilityExceptionSchema.partial().superRefine((data, ctx) => {
  // Check that start < end if both are provided
  if (data.startTime && data.endTime && data.startTime >= data.endTime) {
    ctx.addIssue({ path: ['startTime'], code: 'custom', message: "Start time must be less than end time" });
  }

  if (data.type === 'BLOCK_FULL_DAY') {
    if (data.startTime) {
      ctx.addIssue({ path: ['startTime'], code: 'custom', message: "Start time is not required for full day block" });
    }
    if (data.endTime) {
      ctx.addIssue({ path: ['endTime'], code: 'custom', message: "End time is not required for full day block" });
    }
  }
});

export type CreateAvailabilityExceptionDto = z.infer<typeof createAvailabilityExceptionSchema>;
export type UpdateAvailabilityExceptionDto = z.infer<typeof updateAvailabilityExceptionSchema>;
