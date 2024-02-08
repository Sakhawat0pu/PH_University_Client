import { Button, Col, Flex, Table, TableColumnsType } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";

type TTableData = {
	key: string;
	name: string;
};

const AcademicFaculty = () => {
	const {
		data: academicFaculties,
		isLoading,
		isFetching,
	} = useGetAllAcademicFacultyQuery(undefined);

	const tableData = academicFaculties?.data?.map(({ _id, name }) => ({
		key: _id,
		name,
	}));

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			dataIndex: "name",
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

export default AcademicFaculty;
