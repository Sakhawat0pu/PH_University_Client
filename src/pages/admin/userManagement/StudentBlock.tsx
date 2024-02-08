import { useState } from "react";
import { Button, Modal } from "antd";
import {
	useChangeStatusMutation,
	useGetAStudentQuery,
} from "../../../redux/features/admin/userManagement.api";

const StudentBlock = ({ id }: { id: string }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: studentDetails, isLoading } = useGetAStudentQuery(id);
	const [changeStatus] = useChangeStatusMutation();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		console.log(isLoading);
		const studentData = {
			id: studentDetails?.user._id,
			body: { status: "" },
		};

		if (studentDetails?.user?.status === "in-progress") {
			studentData.body.status = "blocked";
		}
		if (studentDetails?.user?.status === "blocked") {
			studentData.body.status = "in-progress";
		}

		changeStatus(studentData);

		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button onClick={showModal}>
				{studentDetails?.user?.status === "in-progress"
					? "Block"
					: "Unblock"}
			</Button>
			{!isLoading && (
				<Modal
					title="Change user status"
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					<p>
						Are you sure you want to{" "}
						{studentDetails?.user?.status === "in-progress"
							? "block"
							: "unblock"}{" "}
						the user
					</p>
				</Modal>
			)}
		</>
	);
};

export default StudentBlock;
