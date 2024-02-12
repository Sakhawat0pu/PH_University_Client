import { Col, Row } from "antd";
import { useGetMyEnrolledCoursesQuery } from "../../redux/features/student/studentCourse.api";

const MySchedule = () => {
	const { data: myEnrolledCourses } = useGetMyEnrolledCoursesQuery(undefined);
	return (
		<Row style={{ border: "solid #d3d3d3 2px", borderBottom: "0" }}>
			<Col span={24}>
				<Row
					justify="space-around"
					align="bottom"
					style={{
						borderBottom: "solid #d3d3d3 2px",
						padding: "10px",
					}}
				>
					<Col span={4}>
						<p>Course Name</p>
					</Col>
					<Col span={4}>
						<p>Section</p>
					</Col>
					<Col span={4}>
						<p>Lecturer</p>
					</Col>
					<Col span={4}>
						<p>Days</p>
					</Col>
					<Col span={4}>
						<p>Start time</p>
					</Col>
					<Col span={4}>
						<p>End time</p>
					</Col>
				</Row>
			</Col>
			{myEnrolledCourses?.data?.map((item) => {
				return (
					<Col span={24}>
						<Row
							justify="space-around"
							align="middle"
							style={{
								borderBottom: "solid #d3d3d3 2px",
								padding: "10px",
							}}
						>
							<Col span={4}>
								<p>{item.course.title}</p>
							</Col>
							<Col span={4}>
								<p>{item.offeredCourse.section}</p>
							</Col>
							<Col span={4}>
								<p>{item.faculty.fullName}</p>
							</Col>
							<Col span={4}>
								<p>{item.offeredCourse.days.join(", ")}</p>
							</Col>
							<Col span={4}>
								<p>{item.offeredCourse.startTime}</p>
							</Col>
							<Col span={4}>
								<p>{item.offeredCourse.endTime}</p>
							</Col>
						</Row>
					</Col>
				);
			})}
		</Row>
	);
};

export default MySchedule;
