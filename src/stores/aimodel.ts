import { writable } from 'svelte/store';
import type { TModel } from '../types/Model';

export interface TAiModel {
	model: {
		name: string;
		displayName: string;
		description: string;
	};
	result: {
		text: string;
		ideaDescription: string;
	};
	language: string;
	loading: boolean;
}

// const isBrowser = typeof window !== 'undefined';

const AiModel = writable<TAiModel>({
	model: {
		name: 'models/gemini-1.5-pro',
		description:
			'Stable version of Gemini 1.5 Pro, our mid-size multimodal model that supports up to 2 million tokens, released in May of 2024.',
		displayName: 'Gemini 1.5 Pro'
	},
	result: { text: '', ideaDescription: '' },
	language: 'English',
	loading: false
});

const selectModel = (data: Partial<TModel>) => {
	AiModel.update((item) => {
		return { ...item, model: { ...item.model, ...data } };
	});
};

const addLanguages = (language: string) => {
	AiModel.update((item) => {
		return { ...item, language };
	});
};

// ✅ Safe subscription for localStorage (browser-only)
// if (isBrowser) {
// 	AiModel.subscribe((v) => localStorage.setItem('AiModel', JSON.stringify(v)));
// }

// const addToAiModel = (data: Parti) => {
// 	AiModel.update((AiModelItems) => {
// 		const existingItem = AiModelItems.find((item) => item.id === product.id);
// 		if (existingItem) {
// 			return AiModelItems.map((item) =>
// 				item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
// 			);
// 		}
// 		return [...AiModelItems, { ...product, quantity: 1 }];
// 	});
// };

// const removeFromAiModel = (id: number) => {
// 	AiModel.update((items) => items.filter((item) => item.id !== id));
// };

// const clearAiModel = () => {
// 	AiModel.set([]);
// };

// const updateQuantity = (id: number) => {
// 	AiModel.update((items) =>
// 		items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
// 	);
// };

// // ✅ Use derived stores for reactive calculations

// export const getItemQuantity = (id: number) => {
// 	return derived(AiModel, ($AiModel) => {
// 		const item = $AiModel.find((item) => item.id === id);
// 		return item ? item.quantity : 0;
// 	});
// };

// export const isInAiModel = (id: number) => {
// 	return derived(AiModel, ($AiModel) => {
// 		return $AiModel.some((item) => item.id === id);
// 	});
// };
// export const AiModelTotal = derived(AiModel, ($c) =>
// 	$c.reduce((s, i) => s + i.price * i.quantity, 0)
// );
// console.log('AiModel Total:', AiModelTotal);
// export const AiModelItemCount = derived(AiModel, ($c) => $c.reduce((s, i) => s + i.quantity, 0));
// export const itemQuantities = derived(AiModel, ($c) => new Map($c.map((i) => [i.id, i.quantity])));

// export const qty = (id: number, $itemQuantities: Map<number, number>) =>
// 	$itemQuantities.get(id) ?? 0;

// // ✅ Remove problematic getTotal function - use AiModelTotal derived store instead

// export { AiModel, addToAiModel, removeFromAiModel, clearAiModel, updateQuantity };

export { AiModel, selectModel, addLanguages };
