import type { ITokens } from './types';

export const saveTokens = (data: ITokens) => {
  localStorage.setItem('specie_accessToken', data.accessToken);
  localStorage.setItem('specie_refreshToken', data.refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem('specie_accessToken');
  localStorage.removeItem('specie_refreshToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('specie_refreshToken') ?? '';
};

export const getAccessToken = () => {
  return localStorage.getItem('specie_accessToken') ?? '';
};