const dateInstance = new Date();

const currentYear = dateInstance.getFullYear();
const currentMonth = dateInstance.getMonth();

const d = (date: string) => new Date(date);

const getDaysInMonth = (year: number, month: number) => {
	return new Date(year, month, 0).getDate();
};

const currentMonthDays = getDaysInMonth(currentYear, currentMonth);

const getMonthName = (month: number) => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	return months[month];
};

const getDate = (date: string) => {
	console.log('🚀 ~ file: date.ts:33 ~ getDate ~ date:', date);
	const day = d(date).getDate();
	console.log('🚀 ~ file: date.ts:35 ~ getDate ~ day:', day);
	const month = d(date).getMonth() + 1;
	const year = d(date).getFullYear();
	return `${day > 9 ? day : `0${day}`}.${month > 9 ? month : `0${month}`}.${year}`;
};

export { getDaysInMonth, currentMonthDays, currentMonth, currentYear, getMonthName, getDate };
