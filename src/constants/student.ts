export const genderOptions = [
	{ label: "Male", value: "male" },
	{ label: "Female", value: "female" },
];

const bloodGroup = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export const bloodGroupOptions = bloodGroup.map((item) => ({
	label: item,
	value: item,
}));
