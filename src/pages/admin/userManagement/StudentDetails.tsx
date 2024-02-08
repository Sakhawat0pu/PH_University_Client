import { useParams } from "react-router-dom";
import { useGetAStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TStudent } from "../../../type";

export type TTableData1 = Pick<
	TStudent,
	"fullName" | "DOB" | "gender" | "bloodGroup"
> & { key: string };

export type TTableData2 = Pick<
	TStudent,
	"presentAddress" | "permanentAddress" | "contactNo" | "emergencyContactNo"
> & { key: string };

export type TTableData3 = {
	key: string;
	fatherName: string;
	motherName: string;
	motherContactNo: string;
	fatherContactNo: string;
};

export type TTableData4 = {
	key: string;
	admissionSemester: string;
	academicDepartment: string;
	academicFaculty: string;
};

const StudentDetails = () => {
	const params = useParams();
	const { data: details, isFetching } = useGetAStudentQuery(params.studentId);

	const tableData1 = [
		{
			key: details?._id as string,
			fullName: details?.fullName as string,
			email: details?.email as string,
			DOB: details?.DOB?.substring(0, 10) as string,
			gender: ((details?.gender?.charAt(0).toUpperCase() as string) +
				details?.gender?.substring(1)) as string,
			bloodGroup: details?.bloodGroup as string,
		},
	];

	const tableData2 = [
		{
			key: details?._id as string,
			presentAddress: details?.presentAddress as string,
			permanentAddress: details?.permanentAddress as string,
			contactNo: details?.contactNo as string,
			emergencyContactNo: details?.emergencyContactNo as string,
		},
	];

	const tableData3 = [
		{
			key: details?._id as string,
			fatherName: details?.guardian.fatherName as string,
			fatherContactNo: details?.guardian.fatherContactNo as string,
			motherName: details?.guardian.motherName as string,
			motherContactNo: details?.guardian.motherContactNo as string,
		},
	];

	const tableData4 = [
		{
			key: details?._id as string,
			admissionSemester: ((details?.admissionSemester?.name as string) +
				" " +
				details?.admissionSemester?.year) as string,
			academicDepartment: details?.academicDepartment?.name as string,
			academicFaculty: details?.academicFaculty?.name as string,
		},
	];
	const columns1: TableColumnsType<TTableData1> = [
		{
			title: "Name",
			key: "name",
			dataIndex: "fullName",
		},
		{
			title: "Email",
			key: "email",
			dataIndex: "email",
		},
		{
			title: "Date of Birth",
			key: "DOB",
			dataIndex: "DOB",
		},
		{
			title: "Gender",
			key: "gender",
			dataIndex: "gender",
		},
		{
			title: "Blood Group",
			key: "bloodGroup",
			dataIndex: "bloodGroup",
		},
	];
	const columns2: TableColumnsType<TTableData2> = [
		{
			title: "Present Address",
			dataIndex: "presentAddress",
		},
		{
			title: "Permanent Address",
			dataIndex: "permanentAddress",
		},
		{
			title: "Contact NO",
			dataIndex: "contactNo",
		},
		{
			title: "Emergency Contact No",
			dataIndex: "emergencyContactNo",
		},
	];

	const columns3: TableColumnsType<TTableData3> = [
		{
			title: "Father Name",
			dataIndex: "fatherName",
		},
		{
			title: "Father Contact No",
			dataIndex: "fatherContactNo",
		},
		{
			title: "Mother Name",
			dataIndex: "motherName",
		},
		{
			title: "Mother Contact No",
			dataIndex: "motherContactNo",
		},
	];

	const columns4: TableColumnsType<TTableData4> = [
		{
			title: "Academic Department",
			dataIndex: "academicDepartment",
		},
		{
			title: "Academic Faculty",
			dataIndex: "academicFaculty",
		},
		{
			title: "Admission Semester",
			dataIndex: "admissionSemester",
		},
	];
	return (
		<div>
			<p
				style={{
					fontWeight: "bold",
					fontSize: "24px",
					marginBottom: "30px",
				}}
			>
				Student ID: {details?.id}
			</p>
			<p
				style={{
					fontSize: "20px",
					fontWeight: "bold",
					marginBottom: "30px",
				}}
			>
				Personal Information
			</p>
			<Table
				loading={isFetching}
				columns={columns1}
				dataSource={tableData1}
				pagination={false}
			/>
			<p
				style={{
					fontSize: "20px",
					fontWeight: "bold",
					margin: "30px 0px",
				}}
			>
				Academic Information
			</p>
			<Table
				loading={isFetching}
				columns={columns4}
				dataSource={tableData4}
				pagination={false}
			/>
			<p
				style={{
					fontSize: "20px",
					fontWeight: "bold",
					margin: "30px 0px",
				}}
			>
				Address and Contact Info
			</p>
			<Table
				loading={isFetching}
				columns={columns2}
				dataSource={tableData2}
				pagination={false}
			/>
			<p
				style={{
					fontSize: "20px",
					fontWeight: "bold",
					margin: "30px 0px",
				}}
			>
				Guardian Information
			</p>
			<Table
				loading={isFetching}
				columns={columns3}
				dataSource={tableData3}
				pagination={false}
			/>
		</div>
	);
};

export default StudentDetails;
