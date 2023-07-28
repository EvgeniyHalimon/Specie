import type { ICategory, ISubcategory } from './types';

export const getName = (id: number, data: ISubcategory[] | ICategory[]) => {
	const category = data.filter((c) => c.id == id);
	return category[0].name;
};
