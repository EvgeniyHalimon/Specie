const dateInstance = new Date();

const currentYear = dateInstance.getFullYear();
const currentMonth = dateInstance.getMonth();

const getDaysInMonth = (year: number, month: number) => {
	return new Date(year, month, 0).getDate();
};

const currentMonthDays = getDaysInMonth(currentYear, currentMonth);

const getMonthName = (month: number) => {
	const monthes = [
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
	return monthes[month];
};

export { getDaysInMonth, currentMonthDays, currentMonth, currentYear, getMonthName };
