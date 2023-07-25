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
