import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from ".";

export type TStudent = {
	_id: string;
	id: string;
	user: TUser;
	name: TName;
	gender: string;
	DOB: string;
	email: string;
	contactNo: string;
	emergencyContactNo: string;
	bloodGroup: string;
	presentAddress: string;
	permanentAddress: string;
	guardian: TGuardian;
	localGuardian: TLocalGuardian;
	admissionSemester: TAcademicSemester;
	academicDepartment: TAcademicDepartment;
	academicFaculty: TAcademicFaculty;
	profileImg: string;
	isDeleted: boolean;
	fullName: string;
};

export type TUser = {
	_id: string;
	id: string;
	needsPasswordChange: boolean;
	role: string;
	status: string;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
	email: string;
};

export type TName = {
	firstName: string;
	_id: string;
	lastName: string;
};

export type TGuardian = {
	fatherName: string;
	fatherOccupation: string;
	fatherContactNo: string;
	motherName: string;
	motherOccupation: string;
	motherContactNo: string;
	_id: string;
};

export type TLocalGuardian = {
	occupation: string;
	_id: string;
	address: string;
	contactNo: string;
	name: string;
};
