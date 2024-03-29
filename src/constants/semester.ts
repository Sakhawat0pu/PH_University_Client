export const semesterOptions = [
	{ value: "01", label: "Autumn" },
	{ value: "02", label: "Summer" },
	{ value: "03", label: "Fall" },
];

const currentYear = new Date().getFullYear();
export const yearOptions = [0, 1, 2, 3, 4, 5].map((num) => ({
	value: String(num + currentYear),
	label: String(num + currentYear),
}));

export const semesterStatusOptions = [
	{ label: "Upcoming", value: "Upcoming" },
	{ label: "Ongoing", value: "Ongoing" },
	{ label: "Ended", value: "Ended" },
];
