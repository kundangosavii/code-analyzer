
import { InferenceClient } from "@huggingface/inference";



export async function hfService(prompt) {
    try {
        const client = new InferenceClient(process.env.HF_TOKEN);

        const chatCompletion = await client.chatCompletion({
            model: "deepseek-ai/DeepSeek-V4-Pro:novita",
            messages: [
                {
                    role: "user",
                    content: "What is the capital of France?",
                },
            ],
        });

        console.log(chatCompletion.choices[0].message);

        // const response = await axios.post(
        //     HF_API_URL,
        //     {
        //         input: prompt,
        //         parameters : {
        //             temperature: 0.7,
        //             max_new_tokens: 500,
        //         }
        //     },
        //     {
        //         headers: {
        //             Authorization: `Bearer ${process.env.HF_API_KEY}`,
        //             contentType: 'application/json',
        //         },
        //     }
        // )

        // return response.data;
    }
    catch (error) {
        console.error("Error in hfService:", error);
        throw error;
    }
}