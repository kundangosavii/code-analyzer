
import { InferenceClient } from "@huggingface/inference";



export async function hfService(prompt) {
    try {
        const client = new InferenceClient(process.env.HF_TOKEN);

        const chatCompletion = await client.chatCompletion({
            model: "deepseek-ai/DeepSeek-V4-Pro:novita",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        return chatCompletion.choices[0].message.content;
    }
    catch (error) {
        console.error("Error in hfService:", error);
        throw error;
    }
}