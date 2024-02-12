const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const dayNames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
type WeekdaysMap = {
	[key: string]: string;
};
const weekdays: WeekdaysMap = {
	Sunday: "Sun",
	Monday: "Mon",
	Tuesday: "Tues",
	Wednesday: "Wed",
	Thursday: "Thurs",
	Friday: "Fri",
	Saturday: "Sat",
};

export const daysOptions = dayNames.map((item: string) => ({
	label: item,
	value: weekdays[item],
}));

export const monthOptions = monthNames.map((month) => ({
	value: month,
	label: month,
}));

export type TQueryParams = {
	name: string;
	value: boolean | React.Key;
};
