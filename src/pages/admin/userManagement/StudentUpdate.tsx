import { FieldValues, SubmitHandler } from "react-hook-form";
import WrapperForm from "../../../components/form/WrapperForm";
import WrapperInput from "../../../components/form/WrapperInput";
import { Button, Col, Divider, Row } from "antd";
import WrapperSelect from "../../../components/form/WrapperSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/student";
import WrapperDatePicker from "../../../components/form/WrapperDatePicker";
import {
	useGetAllAcademicDepartmentQuery,
	useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import {
	useGetAStudentQuery,
	useUpdateStudentMutation,
} from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { TStudent } from "../../../type";

const StudentUpdate = () => {
	const params = useParams();
	const { data: details, isLoading } = useGetAStudentQuery(params.studentId);
	let defaultValues;
	if (!isLoading) {
		const {
			_id,
			id,
			DOB,
			academicFaculty,
			user,
			academicDepartment,
			admissionSemester,
			profileImg,
			...remainder
		} = details as TStudent;
		defaultValues = remainder;
	}

	const { data: sData, isLoading: isSLoading } =
		useGetAllSemestersQuery(undefined);
	const { data: dData, isLoading: isDLoading } =
		useGetAllAcademicDepartmentQuery(undefined);

	const [updateStudent, { data: res, error }] = useUpdateStudentMutation();

	const semesterOptions = sData?.data?.map((item) => ({
		value: item._id,
		label: `${item.name} ${item.year}`,
	}));
	const departmentOptions = dData?.data?.map((item) => ({
		value: item._id,
		label: item.name,
	}));

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const studentData = {
			studentId: details?._id,
			body: data,
		};
		console.log(data);
		updateStudent(studentData);

		if (res) {
			toast.success("Student updated successfully", { duration: 3000 });
		}
		if (error) {
			toast.error("Failed to update student", { duration: 3000 });
		}
	};
	return (
		<Row>
			<Col span={24}>
				{!isLoading && (
					<WrapperForm
						onSubmit={onSubmit}
						defaultValues={defaultValues}
					>
						<Divider
							style={{ fontSize: "20px", fontWeight: "bold" }}
						>
							Personal Information
						</Divider>
						<Row gutter={12}>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="First Name"
									name="name.firstName"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Middle Name"
									name="name.middleName"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Last Name"
									name="name.lastName"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperSelect
									label="Gender"
									name="gender"
									options={genderOptions}
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperSelect
									label="Blood Group"
									name="bloodGroup"
									options={bloodGroupOptions}
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperDatePicker
									label="Date of Birth"
									name="DOB"
								/>
							</Col>
						</Row>
						<Divider
							style={{ fontSize: "20px", fontWeight: "bold" }}
						>
							Contact Information
						</Divider>
						<Row gutter={12}>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="email"
									label="Email"
									name="email"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Contact No"
									name="contactNo"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Emergency Contact No"
									name="emergencyContactNo"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Present Address"
									name="presentAddress"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Permanent Address"
									name="permanentAddress"
								/>
							</Col>
						</Row>
						<Divider
							style={{ fontSize: "20px", fontWeight: "bold" }}
						>
							Guardian Information
						</Divider>
						<Row gutter={12}>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Father Name"
									name="guardian.fatherName"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Father Occupation"
									name="guardian.fatherOccupation"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Father Contact No"
									name="guardian.fatherContactNo"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Mother Name"
									name="guardian.motherName"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Mother Occupation"
									name="guardian.motherOccupation"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Mother Contact No"
									name="guardian.motherContactNo"
								/>
							</Col>
						</Row>
						<Divider
							style={{ fontSize: "20px", fontWeight: "bold" }}
						>
							Local Guardian Information
						</Divider>
						<Row gutter={12}>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Name"
									name="localGuardian.name"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Occupation"
									name="localGuardian.occupation"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Contact No"
									name="localGuardian.contactNo"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperInput
									type="text"
									label="Address"
									name="localGuardian.address"
								/>
							</Col>
						</Row>
						<Divider
							style={{ fontSize: "20px", fontWeight: "bold" }}
						>
							Academic Information
						</Divider>
						<Row gutter={12}>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperSelect
									label="Admission Semester"
									name="admissionSemester"
									options={semesterOptions}
									disabled={isSLoading}
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<WrapperSelect
									label="Academic Department"
									name="academicDepartment"
									options={departmentOptions}
									disabled={isDLoading}
								/>
							</Col>
						</Row>

						<Button htmlType="submit">Update</Button>
					</WrapperForm>
				)}
			</Col>
		</Row>
	);
};

export default StudentUpdate;
