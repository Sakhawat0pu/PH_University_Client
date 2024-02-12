import {
	TAcademicDepartment,
	TAcademicFaculty,
	TAcademicSemester,
	TCourse,
	TFaculty,
	TOfferedCourse,
	TSemester,
	TStudent,
} from ".";
import { TCourseMark } from "./studentCourse.type";

export type TFacultyCourses = {
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
