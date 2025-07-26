// src/stores/product.ts
import { ProductData } from '$lib/data/Product';
import { writable } from 'svelte/store';
import { addToCart } from './cart';

const products = writable([...ProductData]);

const addProductIntoCart = (id: number) => {
	products.update((items) =>
		items.map((item) => {
			if (item.id === id) {
				if (!item.isInCart) {
					// If not in cart, add it
					addToCart(item); // Call addToCart from the cart store
				}
				// If it's already in the cart and addProductIntoCart is called again (e.g., to remove from cart),
				// you would typically call removeFromCart here. For simplicity, this only adds.
				return { ...item, isInCart: !item.isInCart };
			}
			return item;
		})
	);
};

export { products, addProductIntoCart };
