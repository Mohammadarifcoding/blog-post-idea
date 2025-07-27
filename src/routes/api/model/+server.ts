import { GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenAI } from '@google/genai';
import type { TModel } from '../../../types/Model';

export const GET = async () => {
	const ai = new GoogleGenAI({
		apiKey: GEMINI_API_KEY
	});
	const isTextGenerationModel = (model: TModel) =>
		model.name.includes('gemini') &&
		!model.name.includes('vision') &&
		!model.name.includes('audio') &&
		!model.name.includes('preview') &&
		!model.name.includes('exp') &&
		!model.name.includes('embedding');
	const response = await ai.models.list();
	const modelsArray: TModel[] = [];
	for await (const model of response) {
		if (typeof model.name === 'string') {
			modelsArray.push(model as TModel);
		}
	}
	const textModels = modelsArray.filter(isTextGenerationModel);
	const getNames = textModels.map((model) => {
		return {
			name: model.name,
			description: model.description,
			displayName: model.displayName
		};
	});

	return new Response(JSON.stringify(getNames), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
