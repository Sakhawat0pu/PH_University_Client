import {
	TAcademicDepartment,
	TAcademicFaculty,
	TAcademicSemester,
	TCourse,
	TDays,
	TFaculty,
	TOfferedCourse,
	TSemester,
	TStudent,
} from ".";

export type TMyOfferedCourse = {
	_id: string;
	semesterRegistration: string;
	academicSemester: string;
	academicFaculty: string;
	academicDepartment: string;
	course: TCourse;
	faculty: string;
	maxCapacity: number;
	section: number;
	days: TDays[];
	startTime: string;
	endTime: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	enrolledCourses: TEnrolledCourse;
	completedCourses: TCompletedCourse[];
	completedCoursesIds: string[];
	isPrerequisiteSatisfied: boolean;
	isCourseAlreadyEnrolled: boolean;
};

export type TEnrolledCourse = {
	_id: string;
	semesterRegistration: string;
	academicSemester: string;
	academicFaculty: string;
	academicDepartment: string;
	offeredCourse: string;
	course: string;
	student: string;
	faculty: string;
	isEnrolled: boolean;
	courseMark: TCourseMark;
	grade: string;
	gradePoints: number;
	isCompleted: boolean;
	__v: number;
};

export type TCourseMark = {
	classTest1: number;
	midTerm: number;
	classTest2: number;
	finalTerm: number;
};

export type TCompletedCourse = {
	_id: string;
	semesterRegistration: string;
	academicSemester: string;
	academicFaculty: string;
	academicDepartment: string;
	offeredCourse: string;
	course: string;
	student: string;
	faculty: string;
	isEnrolled: boolean;
	courseMark: TCourseMark2;
	grade: string;
	gradePoints: number;
	isCompleted: boolean;
	__v: number;
};

export type TCourseMark2 = {
	classTest1: number;
	midTerm: number;
	classTest2: number;
	finalTerm: number;
};

export type TCourseSection = {
	section: number;
	_id: string;
	days: string[];
	startTime: string;
	endTime: string;
};

export type TCourseInfo = {
	courseTitle: string;
	sections: TCourseSection[];
};

export type TCourseSchedule = Record<string, TCourseInfo>;

export type TMyEnrolledCourse = {
	_id: string;
	semesterRegistration: TSemester;
	academicSemester: TAcademicSemester;
	academicFaculty: TAcademicFaculty;
	academicDepartment: TAcademicDepartment;
	offeredCourse: TOfferedCourse;
	course: TCourse;
	student: TStudent;
	faculty: TFaculty;
	isEnrolled: boolean;
	courseMark: TCourseMark;
	grade: string;
	gradePoints: number;
	isCompleted: boolean;
	__v: number;
};
