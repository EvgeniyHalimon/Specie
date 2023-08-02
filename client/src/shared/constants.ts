const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;
export const BASE_URL = apiUrl;

const routes = {
	auth: '/auth',
	users: '/users',
	bill: '/bill',
	category: '/category',
	subcategory: '/subcategory'
};

//auth

export const LOGIN = `${routes.auth}/login`;
export const REGISTER = `${routes.auth}/register`;
export const REFRESH = `${routes.auth}/refresh`;

// users

export const GET_USER = (userId: number) => `${routes.users}/${userId}`;

// bills

export const GET_BILLS = `${routes.bill}/`;
export const POST_BILL = `${routes.bill}/`;
export const UPDATE_BILL = `${routes.bill}/`;
export const DELETE_BILL = `${routes.bill}/`;

// categories

export const GET_CATEGORIES = `${routes.category}/`;
// subcategories

export const GET_SUBCATEGORIES = `${routes.subcategory}/`;
