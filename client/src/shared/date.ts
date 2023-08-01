
const dateInstantse = new Date()

const currentYear = dateInstantse.getFullYear()
const currentMonth = dateInstantse.getMonth()
console.log("🚀 ~ file: date.ts:6 ~ month:", currentMonth)

const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
};

const currentMonthDays = getDaysInMonth(currentYear, currentMonth);
console.log("🚀 ~ file: date.ts:12 ~ currentMonthDays:", currentMonthDays)

export {
    getDaysInMonth,
    currentMonthDays,
    currentMonth,
    currentYear
}