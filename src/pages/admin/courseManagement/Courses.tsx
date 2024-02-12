import { Button, Modal, Pagination, Table } from "antd";
import type { TableColumnsType } from "antd";
import {
	useAssignFacultiesMutation,
	useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import WrapperForm from "../../../components/form/WrapperForm";
import WrapperSelect from "../../../components/form/WrapperSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";

export type TTableData = {
	key: string;
	title: string;
	code: string;
};

const Courses = () => {
	const [page, setPage] = useState(1);
	const {
		data: courseData,
		isLoading,
		isFetching,
	} = useGetAllCoursesQuery([
		{ name: "limit", value: 5 },
		{ name: "page", value: page },
		{ name: "sort", value: "code" },
	]);

	const tableData = courseData?.data?.map(({ _id, title, code, prefix }) => ({
		key: _id,
		title,
		code: `${prefix} ${code}`,
	}));
	const columns: TableColumnsType<TTableData> = [
		{
			title: "Title",
			key: "title",
			dataIndex: "title",
		},
		{
			title: "Code",
			key: "code",
			dataIndex: "code",
		},
		{
			title: "Action",
			render: (item: TTableData) => {
				return <AddFacultyModal courseData={item} />;
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
				total={courseData?.meta?.totalDocuments}
				onChange={(value) => setPage(value)}
			/>
		</>
	);
};

const AddFacultyModal = ({ courseData }: { courseData: TTableData }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: facultyData } = useGetAllFacultiesQuery(undefined);
	const [assignFaculties] = useAssignFacultiesMutation();

	const facultiesOption = facultyData?.data?.map((item) => ({
		value: item._id,
		label: item.fullName,
	}));

	const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
		const facultyDataWithCourseId = {
			courseId: courseData.key,
			data: { faculties: data.faculties },
		};
		await assignFaculties(facultyDataWithCourseId);
		setIsModalOpen(false);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<Button onClick={showModal}>Assign Faculties</Button>
			<Modal
				title="Assign Faculty to Course"
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				<WrapperForm onSubmit={handleSubmit}>
					<WrapperSelect
						mode="multiple"
						options={facultiesOption}
						name="faculties"
						label="Faculties"
					/>
					<Button htmlType="submit">Assign</Button>
				</WrapperForm>
			</Modal>
		</>
	);
};

export default Courses;
