import { Button, Col, Flex, Table, TableColumnsType } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";

type TTableData = {
	key: string;
	name: string;
	facultyName: string;
};

const AcademicDepartment = () => {
	const {
		data: academicDepartments,
		isLoading,
		isFetching,
	} = useGetAllAcademicDepartmentQuery(undefined);

	const tableData = academicDepartments?.data?.map((item) => ({
		key: item._id,
		name: item.name,
		facultyName: item.academicFaculty.name,
	}));

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Faculty Name",
			dataIndex: "facultyName",
		},
		{
			title: "Action",
			render: () => (
				<div>
					<Button>Update</Button>
				</div>
			),
		},
	];

	if (isLoading) {
		return (
			<p style={{ textAlign: "center", fontSize: "20px" }}>Loading...</p>
		);
	}

	return (
		<Flex justify="center" align="center">
			<Col span={14}>
				<Table
					loading={isFetching}
					columns={columns}
					dataSource={tableData}
				/>
			</Col>
		</Flex>
	);
};

export default AcademicDepartment;
