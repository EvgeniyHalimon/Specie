import { browser } from '$app/environment';
import type { ITokens } from './types';

export const saveTokens = (data: ITokens) => {
	if (browser) {
		localStorage.setItem('specie_accessToken', data.accessToken);
		localStorage.setItem('specie_refreshToken', data.refreshToken);
	}
};

export const removeTokens = () => {
	if (browser) {
		localStorage.removeItem('specie_accessToken');
		localStorage.removeItem('specie_refreshToken');
	}
};

export const getRefreshToken = () => {
	if (browser) {
		return localStorage.getItem('specie_refreshToken') ?? '';
	}
};

export const getAccessToken = () => {
	if (browser) {
		return localStorage.getItem('specie_accessToken') ?? '';
	}
};
