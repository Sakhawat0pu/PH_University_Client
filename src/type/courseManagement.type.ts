import {
	TAcademicDepartment,
	TAcademicFaculty,
	TAcademicSemester,
	TFaculty,
} from ".";

export type TDays = "Sat" | "Sun" | "Mon" | "Tues" | "Wed" | "Thurs" | "Fri";

export type TSemester = {
	_id: string;
	academicSemester: TAcademicSemester;
	status: string;
	startDate: string;
	endDate: string;
	minCredit: number;
	maxCredit: number;
	createdAt: string;
	updatedAt: string;
};

export type TCourse = {
	_id: string;
	title: string;
	prefix: string;
	code: number;
	credits: number;
	prerequisiteCourses: TPrerequisiteCourse[];
	isDeleted: boolean;
};

export type TPrerequisiteCourse = {
	course: TCourse;
	isDeleted: boolean;
	_id: string;
};

export type TAssignedFaculties = {
	_id: string;
	__v: number;
	course: string;
	faculties: TFaculty[];
};

export type TOfferedCourse = {
	_id: string;
	semesterRegistration: TSemester;
	academicSemester: TAcademicSemester;
	academicFaculty: TAcademicFaculty;
	academicDepartment: TAcademicDepartment;
	course: TCourse;
	faculty: TFaculty;
	maxCapacity: number;
	section: number;
	days: TDays[];
	startTime: string;
	endTime: string;
	createdAt: string;
	updatedAt: string;
};
