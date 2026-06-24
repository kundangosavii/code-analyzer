import { hfService } from './hfService.js';
import { buildPrompt } from './promptBuilder.js';

export async function llmService(analysisData) {
    try {
        const prompt = await buildPrompt(analysisData)

        const llmResponse = await hfService(prompt);

        const result =
            llmResponse?.[0]?.generated_text ||
            llmResponse?.generated_text ||
            "No response from model";

        return result;

    } catch (error) {
        console.error("Error in llmService:", error);
        throw error;
    }

}