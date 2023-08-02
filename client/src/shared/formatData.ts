import type { IBill, IMergedBill, IMergedByDay, IMergedByMonth } from './types';

const mergeByCategory = (arr: IMergedBill[], currentMonth: number) => {
	return arr
		.filter((item: IMergedBill) => new Date(item.createdAt).getMonth() === currentMonth)
		.reduce((result: IMergedBill[], current: IMergedBill) => {
			const existingItem = result.find((item: IMergedBill) => item.category === current.category);
			if (existingItem) {
				let b = Number(existingItem.price);
				b += Number(current.price);
			} else {
				result.push({
					category: current.category,
					price: Number(current.price),
					categoryID: current.categoryID,
					createdAt: current.createdAt
				});
			}
			return result;
		}, []);
};

const mergeByDay = (arr: IBill[], currentMonth: number) => {
	return arr
		.filter((item: IBill) => new Date(item.createdAt).getMonth() === currentMonth)
		.reduce((result: IMergedByDay[], current: IBill) => {
			const existingItem = result.find(
				(item: IMergedByDay) =>
					new Date(item.createdAt).getDate() === new Date(current.createdAt).getDate()
			);

			if (existingItem) {
				existingItem.price += current.price;
			} else {
				result.push({
					date: new Date(current.createdAt).getDate(),
					price: current.price,
					month: new Date(current.createdAt).getMonth(),
					categoryID: current.categoryID,
					createdAt: current.createdAt
				});
			}
			return result;
		}, []);
};

const mergedByMonth = (arr: IBill[]) => {
	return arr.reduce((result: IMergedByMonth[], current: IBill) => {
		const existingItem = result.find((item: IMergedByMonth) => {
			return item.month === new Date(current.createdAt).getMonth();
		});

		if (existingItem) {
			existingItem.amount += current.price;
		} else {
			result.push({
				month: new Date(current.createdAt).getMonth(),
				amount: current.price
			});
		}
		return result;
	}, []);
};

export { mergeByCategory, mergeByDay, mergedByMonth };
