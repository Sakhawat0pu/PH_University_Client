import { FieldValues, SubmitHandler } from "react-hook-form";
import WrapperForm from "../../../components/form/WrapperForm";
import { Button, Col, Flex } from "antd";
import WrapperSelect from "../../../components/form/WrapperSelect";
import { toast } from "sonner";
import { TResponse } from "../../../type/global.type";
import {
	useGetAllAcademicDepartmentQuery,
	useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import WrapperInput from "../../../components/form/WrapperInput";
import {
	useAddOfferCourseMutation,
	useGetAllCoursesQuery,
	useGetAllRegisteredSemestersQuery,
	useGetAssignedFacultiesForCourseQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import WrapperSelectWithWatch from "../../../components/form/WrapperSelectWithWatch";
import { daysOptions } from "../../../constants/global";
import { TAssignedFaculties } from "../../../type";

const OfferCourse = () => {
	const [courseId, setCourseId] = useState("");
	const { data: registeredSemester } =
		useGetAllRegisteredSemestersQuery(undefined);
	const { data: academicFaculties } =
		useGetAllAcademicFacultyQuery(undefined);
	const { data: academicDepartments } =
		useGetAllAcademicDepartmentQuery(undefined);
	const { data: courses } = useGetAllCoursesQuery(undefined);
	const { data: assignedFaculties, isFetching: isFacultyFetching } =
		useGetAssignedFacultiesForCourseQuery(courseId, {
			skip: !courseId,
		});

	const [addOfferCourse] = useAddOfferCourseMutation();

	const registeredSemesterOptions = registeredSemester?.data?.map((item) => ({
		value: item._id,
		label: `${item?.academicSemester?.name} ${item?.academicSemester?.year}`,
	}));

	const academicFacultyOptions = academicFaculties?.data?.map((item) => ({
		value: item._id,
		label: item.name,
	}));

	const academicDepartmentOptions = academicDepartments?.data?.map(
		(item) => ({
			value: item._id,
			label: item.name,
		})
	);

	const courseOptions = courses?.data?.map((item) => ({
		value: item._id,
		label: item.title,
	}));

	const assignedFacultiesOptions = assignedFaculties?.faculties?.map(
		(item) => ({
			value: item._id,
			label: item.fullName,
		})
	);

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const OfferedCourseData = {
			...data,
			maxCapacity: Number(data.maxCapacity),
			section: Number(data.section),
		};
		const toastId = toast.loading("Course being offered...");
		try {
			const res = (await addOfferCourse(
				OfferedCourseData
			)) as TResponse<TAssignedFaculties>;

			if (res?.error) {
				toast.error(res?.error.data.message, {
					id: toastId,
					duration: 3000,
				});
			} else {
				toast.success("Course has been successfully offered", {
					id: toastId,
					duration: 3000,
				});
			}
		} catch (err) {
			toast.error("Something went wrong", { duration: 3000 });
		}
	};
	return (
		<Flex justify={"center"} align={"center"}>
			<Col span={8}>
				<WrapperForm onSubmit={onSubmit}>
					<WrapperSelect
						label="Registered Semester"
						name="semesterRegistration"
						options={registeredSemesterOptions}
					></WrapperSelect>
					<WrapperSelect
						label="Academic Faculty"
						name="academicFaculty"
						options={academicFacultyOptions}
					></WrapperSelect>
					<WrapperSelect
						label="Academic Department"
						name="academicDepartment"
						options={academicDepartmentOptions}
					></WrapperSelect>
					<WrapperSelectWithWatch
						handleValueChange={setCourseId}
						label="Course"
						name="course"
						options={courseOptions}
					></WrapperSelectWithWatch>
					<WrapperSelect
						label="Course Faculties"
						name="faculty"
						options={assignedFacultiesOptions}
						disabled={!courseId || isFacultyFetching}
					></WrapperSelect>
					<WrapperInput
						type="text"
						name="maxCapacity"
						label="Max Capacity"
					/>
					<WrapperInput type="text" name="section" label="Section" />
					<WrapperSelect
						mode="multiple"
						label="Days"
						name="days"
						options={daysOptions}
					></WrapperSelect>
					<WrapperInput
						type="time"
						name="startTime"
						label="Start Time"
					/>
					<WrapperInput type="time" name="endTime" label="End Time" />
					<Button htmlType="submit">Submit</Button>
				</WrapperForm>
			</Col>
		</Flex>
	);
};

export default OfferCourse;
