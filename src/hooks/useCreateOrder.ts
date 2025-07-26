import { createMutation } from '@tanstack/svelte-query';
import { cart, cartTotal, clearCart } from '../stores/cart';
import { get } from 'svelte/store';

export const useCreateOrder = () => {
	const cartTotalValue = get(cartTotal);
	const discount = Math.round((cartTotalValue / 100) * 20);
	const total = Math.round(cartTotalValue - discount + 15);
	const orderId = Math.floor(1000 + Math.random() * 9000);
	const completePurchase = async () => {
		const orderData = {
			orderId: orderId,
			success: true,
			cart: cartTotalValue,
			cartProducts: get(cart),
			total,
			discount: discount,
			user: {
				name: 'Arif',
				email: 'HsXwH@example.com',
				address: 'Dhaka'
			}
		};
		await new Promise((resolve) => setTimeout(resolve, 1000));
		clearCart();
		return orderData;
	};
	return createMutation({
		mutationFn: completePurchase,
		mutationKey: ['complete-purchase', orderId]
	});
};
