import { Button, Col, Flex } from "antd";
import WrapperForm from "../../../components/form/WrapperForm";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import WrapperInput from "../../../components/form/WrapperInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TAcademicFaculty, TResponse } from "../../../type";

const CreateAcademicFaculty = () => {
	const [academicFaculty] = useAddAcademicFacultyMutation();
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating...");
		try {
			const res = (await academicFaculty(
				data
			)) as TResponse<TAcademicFaculty>;
			if (res?.error) {
				toast.error(res?.error?.data?.message, {
					id: toastId,
					duration: 3000,
				});
			} else {
				toast.success("Academic Faculty is successfully created", {
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
					resolver={zodResolver(academicFacultySchema)}
				>
					<WrapperInput
						type="text"
						name="name"
						label="Faculty Name"
					></WrapperInput>
					<Button htmlType="submit">Submit</Button>
				</WrapperForm>
			</Col>
		</Flex>
	);
};

export default CreateAcademicFaculty;
