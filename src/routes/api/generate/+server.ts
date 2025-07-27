import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenAI } from '@google/genai';

export const POST = async ({ request }) => {
	const data = await request.json();
	console.log(data);

	const ai = new GoogleGenAI({
		apiKey: GEMINI_API_KEY
	});
	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: data.prompt
	});

	return new Response(JSON.stringify(response), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
