import { FieldValues, SubmitHandler } from "react-hook-form";
import WrapperForm from "../../../components/form/WrapperForm";
import { Button, Col, Flex } from "antd";
import WrapperSelect from "../../../components/form/WrapperSelect";
import { toast } from "sonner";
import WrapperInput from "../../../components/form/WrapperInput";
import {
	useAddCoursesMutation,
	useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TPrerequisiteCourse, TResponse } from "../../../type";

const CreateCourse = () => {
	const { data: courses } = useGetAllCoursesQuery(undefined);

	const [createCourse] = useAddCoursesMutation();

	const courseOptions = courses?.data?.map((item) => ({
		value: item._id,
		label: item.title,
	}));

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating course...");
		const courseData = {
			...data,
			code: Number(data.code),
			credits: Number(data.credits),
			isDeleted: false,
			prerequisites: data.prerequisites
				? data.prerequisites.map((item: TPrerequisiteCourse) => ({
						course: item,
						isDeleted: false,
				  }))
				: [],
		};

		try {
			const res = (await createCourse(courseData)) as TResponse<any>;
			if (res?.error) {
				toast.error(res?.error.data.message, {
					id: toastId,
					duration: 3000,
				});
			} else {
				toast.success("Course has been created successfully", {
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
			<Col span={6}>
				<WrapperForm onSubmit={onSubmit}>
					<WrapperInput type="text" name="title" label="Title" />
					<WrapperInput type="text" name="prefix" label="Prefix" />
					<WrapperInput type="text" name="code" label="Code" />
					<WrapperInput type="text" name="credits" label="Credits" />
					<WrapperSelect
						mode="multiple"
						label="Prerequisites"
						name="prerequisites"
						options={courseOptions}
					></WrapperSelect>
					<Button htmlType="submit">Submit</Button>
				</WrapperForm>
			</Col>
		</Flex>
	);
};

export default CreateCourse;
