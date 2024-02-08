import { Button, Col, Flex } from "antd";
import WrapperForm from "../../../components/form/WrapperForm";
import WrapperInput from "../../../components/form/WrapperInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import WrapperSelect from "../../../components/form/WrapperSelect";
import {
	useAddAcademicDepartmentMutation,
	useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TAcademicDepartment, TResponse } from "../../../type";

const CreateAcademicDepartment = () => {
	const { data: academicFaculties } =
		useGetAllAcademicFacultyQuery(undefined);

	const [academicDepartment] = useAddAcademicDepartmentMutation();

	const academicFacultiesOptions = academicFaculties?.data?.map((item) => ({
		value: item._id,
		label: item.name,
	}));

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating...");
		const departmentData = {
			name: data.name,
			academicFaculty: data.facultyName,
		};

		try {
			const res = (await academicDepartment(
				departmentData
			)) as TResponse<TAcademicDepartment>;
			if (res?.error) {
				toast.error(res?.error?.data?.message, {
					id: toastId,
					duration: 3000,
				});
			} else {
				toast.success("Academic Department is successfully created", {
					id: toastId,
					duration: 3000,
				});
			}
		} catch (err) {
			toast.error("Something went wrong", {
				id: toastId,
				duration: 3000,
			});
		}
	};
	return (
		<Flex justify={"center"} align={"center"}>
			<Col span={6}>
				<WrapperForm
					onSubmit={onSubmit}
					resolver={zodResolver(academicDepartmentSchema)}
				>
					<WrapperInput
						type="text"
						name="name"
						label="Department Name"
					></WrapperInput>
					<WrapperSelect
						name="facultyName"
						label="Faculty Name"
						options={academicFacultiesOptions!}
					></WrapperSelect>
					<Button htmlType="submit">Submit</Button>
				</WrapperForm>
			</Col>
		</Flex>
	);
};

export default CreateAcademicDepartment;
