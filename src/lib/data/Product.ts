export interface Product {
	id: number;
	image: string; // or import type: image: StaticImageData (for Next.js w/ image imports)
	name: string;
	rating: number; // ideally 0-5
	stock: number;
	price: number;
	discountAvailable: boolean;
	discountAmount: number;
	size: 'Small' | 'Medium' | 'Large' | 'XL' | string;
	color: string;
	isInCart: boolean;
}

export const ProductData: Product[] = [
	{
		id: 1,
		image: '/img/image 1.png',
		name: 'Gradient Graphic T-shirt',
		rating: 4,
		stock: 212,
		price: 145,
		discountAvailable: true,
		discountAmount: 20,
		size: 'Large',
		color: 'Gray',
		isInCart: false
	},
	{
		id: 2,
		image: '/img/image 10-1.png',
		name: 'Polo with Tipping Details',
		rating: 1,
		stock: 320,
		price: 180,
		discountAvailable: false,
		discountAmount: 0,
		size: 'Medium',
		color: 'Navy Blue',
		isInCart: false
	},
	{
		id: 3,
		image: '/img/image 10-2.png',
		name: 'Black Striped T-shirt',
		rating: 3,
		stock: 420,
		price: 120,
		discountAvailable: true,
		discountAmount: 10,
		size: 'Large',
		color: 'Black',
		isInCart: false
	},
	{
		id: 4,
		image: '/img/image 7-1.png',
		name: 'Skinny Fit Jeans',
		rating: 4,
		stock: 20,
		price: 240,
		discountAvailable: true,
		discountAmount: 30,
		size: '32',
		color: 'Denim Blue',
		isInCart: false
	},
	{
		id: 5,
		image: '/img/image 7.png',
		name: 'Checkered Shirt',
		rating: 4,
		stock: 20,
		price: 180,
		discountAvailable: false,
		discountAmount: 0,
		size: 'Large',
		color: 'Red',
		isInCart: false
	},
	{
		id: 6,
		image: '/img/image 8-2.png',
		name: 'Sleeve Striped T-shirt',
		rating: 4,
		stock: 20,
		price: 130,
		discountAvailable: true,
		discountAmount: 15,
		size: 'Medium',
		color: 'White',
		isInCart: false
	},
	{
		id: 7,
		image: '/img/image 8.png',
		name: 'Vertical Striped Shirt',
		rating: 5,
		stock: 210,
		price: 212,
		discountAvailable: true,
		discountAmount: 25,
		size: 'Extra Large',
		color: 'Black',
		isInCart: false
	},
	{
		id: 8,
		image: '/img/image 9.png',
		name: 'Courage Graphic T-shirt',
		rating: 5,
		stock: 520,
		price: 145,
		discountAvailable: true,
		discountAmount: 25,
		size: 'Large',
		color: 'Gray',
		isInCart: false
	},
	{
		id: 9,
		image: '/img/image 8-1.png',
		name: 'Loose Fit Bermuda Shorts',
		rating: 4,
		stock: 400,
		price: 80,
		discountAvailable: false,
		discountAmount: 0,
		size: 'Large',
		color: 'Olive Green',
		isInCart: false
	}
];
