import { Button, Dropdown, Table, Tag } from "antd";
import type { MenuProps, TableColumnsType } from "antd";
import { TSemester } from "../../../type";
import {
	useGetAllRegisteredSemestersQuery,
	useUpdateRegisteredSemesterStatusMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<TSemester, "status" | "startDate" | "endDate"> & {
	key: string;
	name: string;
};

const items: MenuProps["items"] = [
	{ label: "Upcoming", key: "Upcoming" },
	{ label: "Ongoing", key: "Ongoing" },
	{ label: "Ended", key: "Ended" },
];

const RegisteredSemesters = () => {
	const [semesterId, setSemesterId] = useState("");
	const [updateSemesterStatus, { data: res, error }] =
		useUpdateRegisteredSemesterStatusMutation();

	const {
		data: registeredSemesters,
		isLoading,
		isFetching,
	} = useGetAllRegisteredSemestersQuery(undefined);

	const handleStatusChange = (data: any) => {
		const updateData = {
			id: semesterId,
			data: { status: data.key },
		};
		updateSemesterStatus(updateData);
		if (res) {
			toast.success("Status has been successfully updated", {
				duration: 3000,
			});
		}
		if (error) {
			toast.error(error?.data?.message, { duration: 3000 });
		}
	};
	const menuProps = {
		items,
		onClick: handleStatusChange,
	};

	const tableData = registeredSemesters?.data?.map(
		({ _id, academicSemester, status, startDate, endDate }) => ({
			key: _id,
			name: `${academicSemester.name} ${academicSemester.year}`,
			status,
			startDate: moment(new Date(startDate)).format("MMMM Do YYYY"),
			endDate: moment(new Date(endDate)).format("MMMM Do YYYY"),
		})
	);
	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (item) => {
				let color;
				if (item === "Upcoming") color = "blue";
				if (item === "Ongoing") color = "green";
				if (item === "Ended") color = "red";
				return <Tag color={color}>{item}</Tag>;
			},
		},
		{
			title: "Start Date",
			dataIndex: "startDate",
		},
		{
			title: "End Date",
			dataIndex: "endDate",
		},
		{
			title: "Action",
			render: (item) => (
				<Dropdown menu={menuProps} trigger={["click"]}>
					<Button onClick={() => setSemesterId(item.key)}>
						Update Status
					</Button>
				</Dropdown>
			),
		},
	];

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
			pagination={false}
		/>
	);
};

export default RegisteredSemesters;
