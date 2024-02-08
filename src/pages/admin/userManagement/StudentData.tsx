import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TStudent } from "../../../type";
import { useState } from "react";
import { TQueryParams } from "../../../constants/global";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import StudentBlock from "./StudentBlock";

export type TTableData = Pick<
	TStudent,
	"id" | "fullName" | "email" | "contactNo"
> & { key: string };

const StudentData = () => {
	const [params, setParams] = useState<TQueryParams[]>([]);
	const [page, setPage] = useState(1);
	const {
		data: students,
		isLoading,
		isFetching,
	} = useGetAllStudentsQuery([
		{ name: "limit", value: "3" },
		{ name: "page", value: page },
		...params,
	]);

	const metaData = students?.meta;
	const tableData = students?.data?.map(
		({ _id, id, fullName, email, contactNo }) => ({
			key: _id,
			id,
			fullName,
			email,
			contactNo,
		})
	);
	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			dataIndex: "fullName",
		},
		{
			title: "ID",
			dataIndex: "id",
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Contact No",
			dataIndex: "contactNo",
		},
		{
			title: "Action",
			render: (item) => {
				return (
					<Space>
						<Link to={`/admin/student-data/${item.key}`}>
							<Button>Details</Button>
						</Link>
						<Link to={`/admin/student-update/${item.key}`}>
							<Button>Update</Button>
						</Link>
						<StudentBlock id={item.key}></StudentBlock>
					</Space>
				);
			},
			width: "1%",
		},
	];

	// const onChange: TableProps<TTableData>["onChange"] = (
	// 	_pagination,
	// 	filters,
	// 	_sorter,
	// 	extra
	// ) => {
	// 	if (extra.action === "filter") {
	// 		const queryParams: TQueryParams[] = [];

	// 		filters.name?.forEach((item) =>
	// 			queryParams.push({ name: "name", value: item })
	// 		);
	// 		filters.year?.forEach((item) =>
	// 			queryParams.push({ name: "year", value: item })
	// 		);
	// 		setParams(queryParams);
	// 	}
	// };

	if (isLoading) {
		return (
			<p style={{ textAlign: "center", fontSize: "20px" }}>Loading...</p>
		);
	}

	return (
		<>
			<Table
				loading={isFetching}
				columns={columns}
				dataSource={tableData}
				pagination={false}
			/>
			<Pagination
				current={page}
				pageSize={metaData?.limit}
				total={metaData?.totalDocuments}
				onChange={(value) => setPage(value)}
			/>
		</>
	);
};

export default StudentData;
