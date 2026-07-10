import {z} from 'zod';

export const createEventTypeSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    description: z.string().max(500, "Description must be less than 500 characters").optional(),
    durationMinutes: z.number().int().min(15, "Duration must be at least 15 minutes").max(120, "Duration must be less than 120 minutes").default(30),
    isActive: z.boolean().default(true),
    locationType: z.enum(['online', 'in-person']).default('online'),
    locationValue : z.string().optional(),
    bufferBeforeMinutes: z.number().min(0, "Buffer before must be at least 0 minutes").max(120, "Buffer before must be less than 120 minutes").default(0),
    bufferAfterMinutes: z.number().min(0, "Buffer after must be at least 0 minutes").max(120, "Buffer after must be less than 120 minutes").default(0),

});

export const updateEventTypesSchema = createEventTypeSchema.partial();

export type CreateEventTypeDto = z.infer<typeof createEventTypeSchema>;
export type UpdateEventTypeDto = z.infer<typeof updateEventTypesSchema>;