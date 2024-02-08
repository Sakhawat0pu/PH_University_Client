import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import WrapperForm from "../../../components/form/WrapperForm";
import WrapperInput from "../../../components/form/WrapperInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import WrapperSelect from "../../../components/form/WrapperSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/student";
import WrapperDatePicker from "../../../components/form/WrapperDatePicker";
import {
	useGetAllAcademicDepartmentQuery,
	useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentsMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

//! will be removed later on
const studentDummyData = {
	name: {
		firstName: "Michael",
		middleName: "James",
		lastName: "Smith",
	},
	gender: "male",
	email: "michael.s@example.com",
	contactNo: "1234567890",
	emergencyContactNo: "9876543210",
	bloodGroup: "A-",
	presentAddress: "123 Cedar St, Springfield",
	permanentAddress: "789 Elm St, Lakeside",
	guardian: {
		fatherName: "John Smith",
		fatherOccupation: "Engineer",
		fatherContactNo: "5558884444",
		motherName: "Emily Smith",
		motherOccupation: "Teacher",
		motherContactNo: "9993336666",
	},
	localGuardian: {
		name: "Alice Turner",
		occupation: "Artist",
		contactNo: "7772225555",
		address: "456 Oak St, Hillview",
	},
	admissionSemester: "6569494e7689bbee6b7cea1d",
	academicDepartment: "65beffab41beec593b0f1f71",
};

const defaultValues = studentDummyData;

const CreateStudent = () => {
	const { data: sData, isLoading: isSLoading } =
		useGetAllSemestersQuery(undefined);
	const { data: dData, isLoading: isDLoading } =
		useGetAllAcademicDepartmentQuery(undefined);

	const [addStudent, { data: res, error }] = useAddStudentsMutation();

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
			password: "student123",
			student: data,
		};
		const formData = new FormData();
		formData.append("data", JSON.stringify(studentData));
		formData.append("imgFile", data.image);
		addStudent(formData);
		//! To console.log form data
		// console.log([...formData.entries()])
		// console.log(Object.fromEntries(formData));
		if (res) {
			toast.success("Student created successfully", { duration: 3000 });
		}
		if (error) {
			toast.error("Failed to create student", { duration: 3000 });
		}
	};
	return (
		<Row>
			<Col span={24}>
				<WrapperForm onSubmit={onSubmit} defaultValues={defaultValues}>
					<Divider style={{ fontSize: "20px", fontWeight: "bold" }}>
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
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<Controller
								name="image"
								render={({
									field: { onChange, value, ...field },
								}) => (
									<Form.Item label="Upload Picture">
										<Input
											{...field}
											type="file"
											id="image"
											value={value?.file}
											onChange={(e) =>
												onChange(e.target?.files?.[0])
											}
										/>
									</Form.Item>
								)}
							/>
						</Col>
					</Row>
					<Divider style={{ fontSize: "20px", fontWeight: "bold" }}>
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
					<Divider style={{ fontSize: "20px", fontWeight: "bold" }}>
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
					<Divider style={{ fontSize: "20px", fontWeight: "bold" }}>
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
					<Divider style={{ fontSize: "20px", fontWeight: "bold" }}>
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

					<Button htmlType="submit">Submit</Button>
				</WrapperForm>
			</Col>
		</Row>
	);
};

export default CreateStudent;
