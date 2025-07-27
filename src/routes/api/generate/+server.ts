import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenAI } from '@google/genai';
import { getContentForGemini } from '../utils/getContent.js';

export const POST = async ({ request }) => {
	const userResponse = await request.json();
	console.log(userResponse);

	const ai = new GoogleGenAI({
		apiKey: GEMINI_API_KEY
	});
	console.log(userResponse);
	const response = await ai.models.generateContent({
		model: userResponse.model,
		contents: getContentForGemini(userResponse.prompt, userResponse.language)
	});
	const data = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
	console.log(data);
	if (!data) {
		return new Response(JSON.stringify({ result: 'No data found' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	return new Response(JSON.stringify({ result: data }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
