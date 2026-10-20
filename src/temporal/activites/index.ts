import { RegenerateHostSlotsInput, regenerateHostSlots as runSlotGeneration } from "../../services/slot.services.js";

export async function regenerateHostSlotsActivity(input: RegenerateHostSlotsInput) {
    await runSlotGeneration(input); // here actually the service function is called
}
