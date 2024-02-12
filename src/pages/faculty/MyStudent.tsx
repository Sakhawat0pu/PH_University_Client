import { useParams } from "react-router-dom";
import {
	useGetAllFacultyCoursesQuery,
	useUpdateMarksMutation,
} from "../../redux/features/faculty/facultyCourses.api";
import { Button, Modal, Table, TableColumnsType } from "antd";
import WrapperForm from "../../components/form/WrapperForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import WrapperInput from "../../components/form/WrapperInput";
import { TResponse } from "../../type";
import { toast } from "sonner";

export type TTableData = {
	key: string;
	name: string;
	id: string;
	email: string;
	studentId?: string;
	semesterRegistration?: string;
	offeredCourse?: string;
};

const MyStudent = () => {
	const { semesterRegistrationId, courseId } = useParams();
	const { data: facultyCourses, isFetching } = useGetAllFacultyCoursesQuery([
		{ name: "semesterRegistration", value: semesterRegistrationId },
		{ name: "course", value: courseId },
	]);

	const tableData = facultyCourses?.data?.map(
		({ _id, student, semesterRegistration, offeredCourse }) => ({
			key: _id,
			name: student.fullName,
			id: student.id,
			email: student.email,
			studentId: student._id,
			semesterRegistration: semesterRegistration._id,
			offeredCourse: offeredCourse._id,
		})
	);
	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			dataIndex: "name",
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
			title: "Action",
			render: (item: TTableData) => (
				<div>
					<AddMarkModal
						studentId={item.studentId!}
						semesterRegistration={item.semesterRegistration!}
						offeredCourse={item.offeredCourse!}
					></AddMarkModal>
				</div>
			),
		},
	];

	return (
		<Table loading={isFetching} columns={columns} dataSource={tableData} />
	);
};

type TMarkModal = {
	studentId: string;
	semesterRegistration: string;
	offeredCourse: string;
};

const AddMarkModal = ({
	studentId,
	semesterRegistration,
	offeredCourse,
}: TMarkModal) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [updateMarks] = useUpdateMarksMutation();

	const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
		const studentData = {
			semesterRegistration,
			offeredCourse,
			student: studentId,
			courseMark: {
				classTest1: Number(data.classTest1),
				midTerm: Number(data.midTerm),
				classTest2: Number(data.classTest2),
				finalTerm: Number(data.finalTerm),
			},
		};
		const res = (await updateMarks(studentData).unwrap()) as TResponse<any>;
		setIsModalOpen(false);
		if (res?.success) {
			toast.success(res?.message, { duration: 3000 });
		} else {
			toast.error(res?.message, { duration: 3000 });
		}
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<Button onClick={showModal}>Update Marks</Button>
			<Modal
				title="Update Course Mark"
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				<WrapperForm onSubmit={handleSubmit}>
					<WrapperInput
						type="text"
						name="classTest1"
						label="Class Test 1"
					/>
					<WrapperInput type="text" name="midTerm" label="Mid Term" />
					<WrapperInput
						type="text"
						name="classTest2"
						label="Class Test 2"
					/>
					<WrapperInput type="text" name="finalTerm" label="Final" />
					<Button htmlType="submit">Update</Button>
				</WrapperForm>
			</Modal>
		</>
	);
};

export default MyStudent;
