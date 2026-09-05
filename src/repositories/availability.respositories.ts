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
        orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }]
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

export async function createException(data: CreateAvailabilityExceptionDto) {
    const exception = await prisma.availabilityExceptions.create({
        data
    });
    return exception;
}

export async function updateException(id: number, data: UpdateAvailabilityExceptionDto) {
    const exception = await prisma.availabilityExceptions.update({
        where: { id },
        data
    });
    return exception;
}

export async function removeException(id: number) {
    const exception = await prisma.availabilityExceptions.delete({
        where: { id }
    });
    return exception;
}
