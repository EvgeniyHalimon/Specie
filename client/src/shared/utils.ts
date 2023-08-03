import { categoriesEmoji, subcategoriesEmoji } from './staticData';
import type { ICategory, ISubcategory } from './types';

interface IEmoji {
	id: number;
	emoji: string;
}

const getName = (id: number, data: ISubcategory[] | ICategory[]) => {
	const category = data.filter((c) => c.id == id);
	return category[0].name;
};

const filterEmojiArray = (emojiArray: IEmoji[], id: number) => {
	return emojiArray.filter((category: IEmoji) => category.id == id);
};

const getCategoryEmoji = (id: number): string => {
	const emoji = filterEmojiArray(categoriesEmoji, id);
	return emoji[0].emoji;
};

const getSubcategoryEmoji = (id: number): string => {
	const emoji = filterEmojiArray(subcategoriesEmoji, id);
	return emoji[0].emoji;
};

export { getName, getCategoryEmoji, getSubcategoryEmoji };
