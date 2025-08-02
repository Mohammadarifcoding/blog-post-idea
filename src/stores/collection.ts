import { derived, writable } from 'svelte/store';
import type { TResult } from './aimodel';

export interface TStoreData extends TResult {
	text: string;
	description: string;
	important_points: string[];
	tags: string[];
	date: string;
	type: string;
	collectionName: string;
}
interface TCollectionGroup {
	collectionName: string;
	items: TStoreData[];
}

const isBrowser = typeof window !== 'undefined';

const getInitialCollectionData = (): TCollectionGroup[] => {
	if (!isBrowser) return [];
	try {
		const stored = localStorage.getItem('collection');
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
};

const collection = writable<TCollectionGroup[]>(getInitialCollectionData());
if (isBrowser) {
	collection.subscribe((v) => localStorage.setItem('collection', JSON.stringify(v)));
}

const getCollections = () => derived(collection, ($collection) => $collection);
const addDataToCollection = (data: TStoreData) => {
	collection.update((collections) => {
		const index = collections.findIndex((c) => c.collectionName === data.collectionName);

		if (index !== -1) {
			collections[index].items.push(data);
		} else {
			collections.push({
				collectionName: data.collectionName,
				items: [data]
			});
		}

		return [...collections];
	});
};

const addNewCollection = (collectionName: string) => {
	collection.update((collections) => {
		if (!collections.find((c) => c.collectionName === collectionName)) {
			collections.push({
				collectionName,
				items: []
			});
		}
		return [...collections];
	});
};
const getCollectionNames = (slug: string) =>
	derived(collection, ($collection) => $collection.map((c) => c.collectionName));

const getDataFromCollection = (collectionName: string) =>
	derived(collection, ($collection) => {
		const group = $collection.find((c) => c.collectionName === collectionName);
		return group ? group.items : [];
	});
// ✅ Safe subscription for localStorage (browser-only)

// const addTocollection = (data: Parti) => {
// 	collection.update((collectionItems) => {
// 		const existingItem = collectionItems.find((item) => item.id === product.id);
// 		if (existingItem) {
// 			return collectionItems.map((item) =>
// 				item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
// 			);
// 		}
// 		return [...collectionItems, { ...product, quantity: 1 }];
// 	});
// };

// const removeFromcollection = (id: number) => {
// 	collection.update((items) => items.filter((item) => item.id !== id));
// };

// const clearcollection = () => {
// 	collection.set([]);
// };

// const updateQuantity = (id: number) => {
// 	collection.update((items) =>
// 		items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
// 	);
// };

// // ✅ Use derived stores for reactive calculations

// export const getItemQuantity = (id: number) => {
// 	return derived(collection, ($collection) => {
// 		const item = $collection.find((item) => item.id === id);
// 		return item ? item.quantity : 0;
// 	});
// };

// export const isIncollection = (id: number) => {
// 	return derived(collection, ($collection) => {
// 		return $collection.some((item) => item.id === id);
// 	});
// };
// export const collectionTotal = derived(collection, ($c) =>
// 	$c.reduce((s, i) => s + i.price * i.quantity, 0)
// );
// console.log('collection Total:', collectionTotal);
// export const collectionItemCount = derived(collection, ($c) => $c.reduce((s, i) => s + i.quantity, 0));
// export const itemQuantities = derived(collection, ($c) => new Map($c.map((i) => [i.id, i.quantity])));

// export const qty = (id: number, $itemQuantities: Map<number, number>) =>
// 	$itemQuantities.get(id) ?? 0;

// // ✅ Remove problematic getTotal function - use collectionTotal derived store instead

// export { collection, addTocollection, removeFromcollection, clearcollection, updateQuantity };

export {
	getInitialCollectionData,
	getCollections,
	getDataFromCollection,
	addDataToCollection,
	addNewCollection,
	getCollectionNames,
	collection
};
