const dateInstantse = new Date();

const currentYear = dateInstantse.getFullYear();
const currentMonth = dateInstantse.getMonth();

const getDaysInMonth = (year: number, month: number) => {
	return new Date(year, month, 0).getDate();
};

const currentMonthDays = getDaysInMonth(currentYear, currentMonth);

export { getDaysInMonth, currentMonthDays, currentMonth, currentYear };
