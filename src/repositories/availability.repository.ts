import { prisma } from '../config/database';
import {
    CreateAvailabilityRuleDto,
    UpdateAvailabilityRuleDto,
    CreateAvailabilityExceptionDto,
    UpdateAvailabilityExceptionDto
} from '../dtos/availability.dto';

// --- Availability Rule Repositories ---

export async function getAll() {
    const rules = await prisma.availabilityRule.findMany();
    return rules;
}

export async function getById(id: number) {
    const rule = await prisma.availabilityRule.findUnique({
        where: { id }
    });
    return rule;
}

export async function getByUserId(userId: number) {
    const rules = await prisma.availabilityRule.findMany({
        where: { userId },
        orderBy: [{ weekday: 'asc' }, { startTime: 'asc' }]
    });
    return rules;
}

export async function getActiveByUserId(userId: number) {
    const rules = await prisma.availabilityRule.findMany({
        where: { userId, isActive: true },
        orderBy: [{ weekday: 'asc' }, { startTime: 'asc' }]
    });
    return rules;
}

export async function create(userId: number, data: CreateAvailabilityRuleDto) {
    const rule = await prisma.availabilityRule.create({
        data: {
            userId,
            ...data
        }
    });
    return rule;
}

export async function update(id: number, data: UpdateAvailabilityRuleDto) {
    const rule = await prisma.availabilityRule.update({
        where: { id },
        data
    });
    return rule;
}

export async function remove(id: number) {
    const rule = await prisma.availabilityRule.delete({
        where: { id }
    });
    return rule;
}

// --- Availability Exceptions Repositories ---

export async function getAllExceptions() {
    const exceptions = await prisma.availabilityExceptions.findMany();
    return exceptions;
}

export async function getExceptionById(id: number) {
    const exception = await prisma.availabilityExceptions.findUnique({
        where: { id }
    });
    return exception;
}

export async function getExceptionsByUserId(userId: number) {
    const exceptions = await prisma.availabilityExceptions.findMany({
        where: { userId }
    });
    return exceptions;
}

export async function createException(userId: number, data: CreateAvailabilityExceptionDto) {
    const { date, ...rest } = data;
    const exception = await prisma.availabilityExceptions.create({
        data: {
            userId,
            ...rest,
            date: new Date(`${date}T00:00:00.000Z`)
        }
    });
    return exception;
}

export async function updateException(id: number, data: UpdateAvailabilityExceptionDto) {
    const { date, ...rest } = data;
    const exception = await prisma.availabilityExceptions.update({
        where: { id },
        data: {
            ...rest,
            ...(date !== undefined && { date: new Date(`${date}T00:00:00.000Z`) })
        }
    });
    return exception;
}

export async function removeException(id: number) {
    const exception = await prisma.availabilityExceptions.delete({
        where: { id }
    });
    return exception;
}

export async function findExceptionsByUserInRange(userId: number, startDate: string, endDate: string) {
    const exceptions = await prisma.availabilityExceptions.findMany({
        where: {
            userId,
            date: {
                gte: new Date(`${startDate}T00:00:00.000Z`),
                lte: new Date(`${endDate}T00:00:00.000Z`)
            }
        },
        orderBy: { date: 'asc' }
    });
    return exceptions;
}



