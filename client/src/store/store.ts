import type { ITokens } from '$shared/types';
import { writable } from 'svelte/store';

const tokens = writable<ITokens | string>('');
const categories = writable<ITokens | string>('');
const subcategories = writable<ITokens | string>('');

export { tokens, categories, subcategories };
