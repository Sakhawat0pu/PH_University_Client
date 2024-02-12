import { FieldValues, SubmitHandler } from "react-hook-form";
import WrapperForm from "../../../components/form/WrapperForm";
import { Button, Col, Flex } from "antd";
import WrapperSelect from "../../../components/form/WrapperSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { TResponse } from "../../../type/global.type";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import WrapperDatePicker from "../../../components/form/WrapperDatePicker";
import WrapperInput from "../../../components/form/WrapperInput";
import { useAddRegisterSemesterMutation } from "../../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
	const { data: academicSemesters } = useGetAllSemestersQuery([
		{
			name: "sort",
			value: "year",
		},
	]);

	const [addRegisterSemester] = useAddRegisterSemesterMutation();

	const academicSemesterOptions = academicSemesters?.data?.map((item) => ({
		value: item._id,
		label: `${item.name} ${item.year}`,
	}));

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating Semester...");
		const academicSemesterData = {
			...data,
			minCredit: Number(data.minCredit),
			maxCredit: Number(data.maxCredit),
		};

		// console.log(semesterData);
		try {
			const res = (await addRegisterSemester(
				academicSemesterData
			)) as TResponse<any>;
			if (res?.error) {
				toast.error(res?.error.data.message, {
					id: toastId,
					duration: 3000,
				});
			} else {
				toast.success("Academic Semester is successfully registered", {
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
					<WrapperSelect
						label="Academic Semester"
						name="academicSemester"
						options={academicSemesterOptions}
					></WrapperSelect>
					<WrapperSelect
						label="Status"
						name="status"
						options={semesterStatusOptions}
					></WrapperSelect>
					<WrapperDatePicker
						name="startDate"
						label="Start Date"
					></WrapperDatePicker>
					<WrapperDatePicker
						name="endDate"
						label="End Date"
					></WrapperDatePicker>
					<WrapperInput
						type="text"
						name="minCredit"
						label="Min Credit"
					/>
					<WrapperInput
						type="text"
						name="maxCredit"
						label="Max Credit"
					/>
					<Button htmlType="submit">Submit</Button>
				</WrapperForm>
			</Col>
		</Flex>
	);
};

export default SemesterRegistration;
