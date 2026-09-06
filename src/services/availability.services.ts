import { 
    getByUserId, 
    getById, 
    create as createRepo, 
    update as updateRepo, 
    remove as removeRepo,
    getExceptionsByUserId,
    getExceptionById,
    createException as createExceptionRepo,
    updateException as updateExceptionRepo,
    removeException as removeExceptionRepo
} from '../repositories/availability.repository';
import { notFound, forbidden } from '../utils/api.error';
import { 
    CreateAvailabilityRuleDto, 
    UpdateAvailabilityRuleDto,
    CreateAvailabilityExceptionDto,
    UpdateAvailabilityExceptionDto
} from '../dtos/availability.dto';

// --- Availability Rules ---

export async function listRules(userId: number) {
    return await getByUserId(userId);
}

export async function createRule(userId: number, data: CreateAvailabilityRuleDto) {
    return await createRepo(userId, data);
}

export async function updateRule(ruleId: number, userId: number, data: UpdateAvailabilityRuleDto) {
    const rule = await getById(ruleId);
    if (!rule) {
        throw notFound('Availability rule not found');
    }
    if (rule.userId !== userId) {
        throw forbidden('You are not authorized to update this availability rule');
    }
    
    return await updateRepo(ruleId, data);
}

export async function removeRule(userId: number, ruleId: number) {
    const rule = await getById(ruleId);
    if (!rule) {
        throw notFound('Availability rule not found');
    }
    if (rule.userId !== userId) {
        throw forbidden('You are not authorized to delete this availability rule');
    }
    
    return await removeRepo(ruleId);
}

// --- Availability Exceptions ---

export async function listExceptions(userId: number) {
    return await getExceptionsByUserId(userId);
}

export async function createException(userId: number, data: CreateAvailabilityExceptionDto) {
    return await createExceptionRepo(userId, data);
}

export async function updateException(exceptionId: number, userId: number, data: UpdateAvailabilityExceptionDto) {
    const exception = await getExceptionById(exceptionId);
    if (!exception) {
        throw notFound('Availability exception not found');
    }
    if (exception.userId !== userId) {
        throw forbidden('You are not authorized to update this availability exception');
    }
    
    return await updateExceptionRepo(exceptionId, data);
}

export async function removeException(userId: number, exceptionId: number) {
    const exception = await getExceptionById(exceptionId);
    if (!exception) {
        throw notFound('Availability exception not found');
    }
    if (exception.userId !== userId) {
        throw forbidden('You are not authorized to delete this availability exception');
    }
    
    return await removeExceptionRepo(exceptionId);
}
