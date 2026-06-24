import { hfService } from './hfService.js';
import { buildPrompt } from './promptBuilder.js';

export async function llmService(analysisData) {
    try {
        const prompt = await buildPrompt(analysisData)

        const llmResponse = await hfService(prompt);

        const result =
            llmResponse || "No response from the LLM service.";

        return result;

    } catch (error) {
        console.error("Error in llmService:", error);
        throw error;
    }

}