import { z } from "zod";

export const academicSemesterSchema = z.object({
	name: z.string({ required_error: "Please select a semester name" }),
	year: z.string({ required_error: "Please select a year" }),
	startMonth: z.string({ required_error: "Please select a start month" }),
	endMonth: z.string({ required_error: "Please select a end month" }),
});

export const academicFacultySchema = z.object({
	name: z.string({ required_error: "Please enter the name of the Faculty" }),
});

export const academicDepartmentSchema = z.object({
	name: z.string({
		required_error: "Please enter the name of the department",
	}),
	facultyName: z.string({
		required_error: "Please enter the name of the Faculty",
	}),
});
