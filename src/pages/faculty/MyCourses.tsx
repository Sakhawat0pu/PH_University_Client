import lodash from "lodash";
import { Button, Col, Flex } from "antd";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";
import WrapperForm from "../../components/form/WrapperForm";
import WrapperSelect from "../../components/form/WrapperSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
	const { data: facultyCourses } = useGetAllFacultyCoursesQuery(undefined);
	const navigate = useNavigate();

	const semesterOptions = facultyCourses?.data?.map((item) => ({
		label: `${item.academicSemester.name} ${item.academicSemester.year}`,
		value: item.semesterRegistration._id,
	}));

	const uniqueSemesterOptions = lodash.uniqBy(semesterOptions, "value");

	const courseOptions = facultyCourses?.data?.map((item) => ({
		label: item.course.title,
		value: item.course._id,
	}));

	console.log(facultyCourses);
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		navigate(
			`/faculty/my-courses/${data.semesterRegistration}/${data.course}`
		);
	};
	return (
		<Flex justify="center" align="center">
			<Col span={6}>
				<WrapperForm onSubmit={onSubmit}>
					<WrapperSelect
						name="semesterRegistration"
						label="Semester"
						options={uniqueSemesterOptions}
					/>
					<WrapperSelect
						name="course"
						label="Course"
						options={courseOptions}
					/>
					<Button htmlType="submit">Submit</Button>
				</WrapperForm>
			</Col>
		</Flex>
	);
};

export default MyCourses;
