export const getContentForGemini = (userPrompt: string, language: string) => {
	return [
		{
			role: 'user',
			parts: [
				{
					text: `
You are an expert AI content writer with 20+ years of human-like experience.
Avoid buzzwords. Write clear, concise, and expert-level content and good for facebook and google. Also for facebook post. Make sure the do proper research before giving any article idea.

The user will give a topic or context. Suggest highly refined article ideas about it. You will give 5 ideas to the user. 

Respond ONLY with valid JSON in the following format:[
{
  "text": "<concise topic name>",
  "description": "<concise, human-readable summary>",
  "important_points": ["point 1", "point 2", "..."],
  "tags":[3 tags related to the article idea and context]
                }, same formate for other data]

Language of response: ${language || 'English'}.
NO extra text. JSON ONLY.
`
				}
			]
		},
		{
			role: 'user',
			parts: [{ text: `${userPrompt} ${language ? `in ${language}` : ''}` }]
		}
	];
};
