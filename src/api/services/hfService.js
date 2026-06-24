import axios from 'axios';

const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

export async function hfService(prompt) {
    try{
        const response = await axios.post(
            HF_API_URL,
            {
                input: prompt,
                parameters : {
                    temperature: 0.7,
                    max_new_tokens: 500,
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                    contentType: 'application/json',
                },
            }
        )

        return response.data;
    }
    catch(error){
        console.error("Error in hfService:", error);
        throw error;
    }
}