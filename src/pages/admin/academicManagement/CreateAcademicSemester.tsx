import { FieldValues, SubmitHandler } from "react-hook-form";
import WrapperForm from "../../../components/form/WrapperForm";
import { Button, Col, Flex } from "antd";
import WrapperSelect from "../../../components/form/WrapperSelect";
import { semesterOptions, yearOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../type/global.type";
import { TAcademicSemester } from "../../../type";

const CreateAcademicSemester = () => {
	const [addAcademicSemester] = useAddAcademicSemesterMutation();
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const name = semesterOptions[Number(data.name) - 1].label;
		const toastId = toast.loading("Creating Semester...");
		const semesterData = {
			name,
			code: data.name,
			year: data.year,
			startMonth: data.startMonth,
			endMonth: data.endMonth,
		};

		try {
			const res = (await addAcademicSemester(
				semesterData
			)) as TResponse<TAcademicSemester>;
			console.log(res);
			if (res?.error) {
				toast.error(res?.error.data.message, {
					id: toastId,
					duration: 3000,
				});
			} else {
				toast.success("Academic Semester is successfully created", {
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
				<WrapperForm
					onSubmit={onSubmit}
					resolver={zodResolver(academicSemesterSchema)}
				>
					<WrapperSelect
						label="Name"
						name="name"
						options={semesterOptions}
					></WrapperSelect>
					<WrapperSelect
						label="Year"
						name="year"
						options={yearOptions}
					></WrapperSelect>
					<WrapperSelect
						label="Start Month"
						name="startMonth"
						options={monthOptions}
					></WrapperSelect>
					<WrapperSelect
						label="End Month"
						name="endMonth"
						options={monthOptions}
					></WrapperSelect>
					<Button htmlType="submit">Submit</Button>
				</WrapperForm>
			</Col>
		</Flex>
	);
};

export default CreateAcademicSemester;
