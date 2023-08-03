import type { ITokens, ICategory, ISubcategory, IBill } from '$shared/types';
import { writable } from 'svelte/store';

const tokens = writable<ITokens | string>('');
const categories = writable<Array<ICategory>>([]);
const subcategories = writable<Array<ISubcategory>>([]);
const filteredSubcategories = writable<Array<ISubcategory>>([]);
const bills = writable<Array<IBill>>([]);

export { tokens, categories, subcategories, bills, filteredSubcategories };
