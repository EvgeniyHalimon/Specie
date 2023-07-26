import type { ITokens, ICategory, ISubcategory } from '$shared/types';
import { writable } from 'svelte/store';

const tokens = writable<ITokens | string>('');
const categories = writable<Array<ICategory>>([]);
const subcategories = writable<Array<ISubcategory>>([]);

export { tokens, categories, subcategories };
