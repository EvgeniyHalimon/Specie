export interface ITokens {
	accessToken: string;
	refreshToken: string;
}

export interface IBill {
	id: number;
	price: number;
	comment: string;
	createdAt: string;
	categoryID: number;
	subcategoryID: number;
	userID: number;
}

export interface ICategory {
	id: number;
	name: string;
}

export interface ISubcategory {
	id: number;
	name: string;
	categoryID: number;
}

export interface IMergedBill {
	category: string;
	price: number;
	categoryID: number;
	createdAt: string;
}

export interface IMergedBySubcategory {
	subcategory: string;
	price: number;
	subcategoryID: number;
}

export interface IMergedByDay {
	date: number;
	price: number;
	month: number;
	categoryID: number;
	createdAt: string;
}

export interface IMergedByMonth {
	month: number;
	amount: number;
}
