export type TAcademicSemester = {
	_id: string;
	name: string;
	code: string;
	year: string;
	startMonth: string;
	endMonth: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export type TAcademicFaculty = {
	_id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export type TAcademicDepartment = {
	_id: string;
	name: string;
	academicFaculty: TAcademicFaculty;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export type TFaculty = {
	_id: string;
	id: string;
	user: string;
	designation: string;
	name: TFacultyName;
	gender: string;
	dateOfBirth: string;
	email: string;
	contactNo: string;
	emergencyContactNo: string;
	bloodGroup: string;
	presentAddress: string;
	permanentAddress: string;
	profileImg: string;
	academicDepartment: TAcademicDepartment;
	isDeleted: boolean;
	fullName: string;
};

export type TFacultyName = {
	firstName: string;
	middleName: string;
	lastName: string;
	_id: string;
};
