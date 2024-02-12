import { Button, Pagination, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllOfferedCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";

export type TTableData = {
	key: string;
	title: string;
	academicSemester: string;
	academicDepartment: string;
	credits: number;
	faculty: string;
	maxCapacity: number;
	section: number;
	days: string;
	startTime: string;
	endTime: string;
};

const OfferedCourses = () => {
	const [page, setPage] = useState(1);
	const {
		data: OfferedCourses,
		isLoading,
		isFetching,
	} = useGetAllOfferedCoursesQuery([
		{ name: "limit", value: 5 },
		{ name: "page", value: page },
		{ name: "sort", value: "startTime" },
	]);

	const tableData = OfferedCourses?.data?.map(
		({
			_id,
			academicDepartment,
			academicSemester,
			faculty,
			maxCapacity,
			section,
			course,
			days,
			startTime,
			endTime,
		}) => ({
			key: _id,
			title: course.title,
			credits: Number(course.credits),
			academicDepartment: academicDepartment.name,
			academicSemester: `${academicSemester.name} ${academicSemester.year}`,
			faculty: faculty.fullName,
			maxCapacity: Number(maxCapacity),
			section: Number(section),
			days: days.join(", "),
			startTime,
			endTime,
		})
	);
	const columns: TableColumnsType<TTableData> = [
		{
			title: "Title",
			key: "title",
			dataIndex: "title",
		},
		{
			title: "Credits",
			key: "credits",
			dataIndex: "credits",
		},
		{
			title: "Department",
			dataIndex: "academicDepartment",
		},
		{
			title: "Semester",
			dataIndex: "academicSemester",
		},
		{
			title: "Instructor",
			dataIndex: "faculty",
		},
		{
			title: "Capacity",
			dataIndex: "maxCapacity",
		},
		{
			title: "Section",
			dataIndex: "section",
		},
		{
			title: "Days",
			dataIndex: "days",
		},
		{
			title: "Start Time",
			dataIndex: "startTime",
		},
		{
			title: "End Time",
			dataIndex: "endTime",
		},

		{
			title: "Action",
			render: () => {
				return <Button>Update</Button>;
			},
		},
	];

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
				pageSize={5}
				total={OfferedCourses?.meta?.totalDocuments}
				onChange={(value) => setPage(value)}
			/>
		</>
	);
};

export default OfferedCourses;
