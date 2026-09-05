import { prisma } from '../config/database';
import { CreateAvailabilityRuleDto, UpdateAvailabilityRuleDto } from '../dtos/availability-rule.dto';

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
        where: { userId }
    });
    return rules;
}

export async function create(data: CreateAvailabilityRuleDto) {
    const rule = await prisma.availabilityRule.create({
        data
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
