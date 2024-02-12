import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TAcademicSemester } from "../../../type";
import { useState } from "react";
import { yearOptions } from "../../../constants/semester";
import { TQueryParams } from "../../../constants/global";

export type TTableData = Pick<
	TAcademicSemester,
	"name" | "year" | "startMonth" | "endMonth"
> & { key: string };

const AcademicSemester = () => {
	const [params, setParams] = useState<TQueryParams[]>([]);
	const {
		data: semesters,
		isLoading,
		isFetching,
	} = useGetAllSemestersQuery(params);

	const tableData = semesters?.data?.map(
		({ _id, name, year, startMonth, endMonth }) => ({
			key: _id,
			name,
			year,
			startMonth,
			endMonth,
		})
	);
	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			dataIndex: "name",
			filters: [
				{
					text: "Autumn",
					value: "Autumn",
				},
				{
					text: "Summer",
					value: "Summer",
				},
				{
					text: "Fall",
					value: "Fall",
				},
			],
		},
		{
			title: "Year",
			dataIndex: "year",
			filters: yearOptions.map((option) => ({
				text: option.label,
				value: option.value,
			})),
		},
		{
			title: "Start Month",
			dataIndex: "startMonth",
		},
		{
			title: "End Month",
			dataIndex: "endMonth",
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

	const onChange: TableProps<TTableData>["onChange"] = (
		_pagination,
		filters,
		_sorter,
		extra
	) => {
		if (extra.action === "filter") {
			const queryParams: TQueryParams[] = [];

			filters.name?.forEach((item) =>
				queryParams.push({ name: "name", value: item })
			);
			filters.year?.forEach((item) =>
				queryParams.push({ name: "year", value: item })
			);
			setParams(queryParams);
		}
	};

	if (isLoading) {
		return (
			<p style={{ textAlign: "center", fontSize: "20px" }}>Loading...</p>
		);
	}

	return (
		<Table
			loading={isFetching}
			columns={columns}
			dataSource={tableData}
			onChange={onChange}
		/>
	);
};

export default AcademicSemester;
