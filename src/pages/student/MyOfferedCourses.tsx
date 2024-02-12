import { Button, Col, Row } from "antd";
import {
	useEnrollCourseMutation,
	useGetAllMyOfferedCoursesQuery,
} from "../../redux/features/student/studentCourse.api";
import {
	TCourseSchedule,
	TEnrolledCourse,
} from "../../type/studentCourse.type";
import { TResponse } from "../../type";
import { toast } from "sonner";

const MyOfferedCourses = () => {
	const { data: myOfferedCourses, isLoading } =
		useGetAllMyOfferedCoursesQuery(undefined);

	const [enroll] = useEnrollCourseMutation();

	const transformedOfferedCourses = myOfferedCourses?.data?.reduce(
		(acc: TCourseSchedule, item) => {
			const key = item.course.title;
			acc[key] = acc[key] || { courseTitle: key, sections: [] };
			acc[key].sections.push({
				section: item.section,
				_id: item._id,
				days: item.days,
				startTime: item.startTime,
				endTime: item.endTime,
			});
			return acc;
		},
		{}
	);

	const modifiedData = Object.values(
		transformedOfferedCourses ? transformedOfferedCourses : []
	);

	const handleEnrollCourse = async (id: string) => {
		const enrollCourseData = { offeredCourse: id };
		const res = (await enroll(
			enrollCourseData
		).unwrap()) as TResponse<TEnrolledCourse>;
		if (res?.data) {
			toast.success(res?.message, { duration: 3000 });
		} else if (res?.error) {
			toast.error(res?.message, { duration: 3000 });
		}
	};

	if (isLoading) {
		return <p style={{ textAlign: "center" }}>Loading...</p>;
	}

	if (!modifiedData.length) {
		return (
			<p
				style={{
					textAlign: "center",
					fontWeight: "bold",
					fontSize: "20px",
				}}
			>
				No available course to take in this semester
			</p>
		);
	}

	return (
		<Row gutter={[0, 20]}>
			{modifiedData?.map((item) => {
				return (
					<Col span={24} style={{ border: "solid #d3d3d3 2px" }}>
						<h2 style={{ padding: "16px" }}>{item?.courseTitle}</h2>
						<div>
							{item?.sections.map((section) => {
								return (
									<Row
										justify="space-between"
										align="middle"
										style={{
											borderTop: "solid #d3d3d3 2px",
											padding: "10px",
										}}
									>
										<Col span={5}>
											<p>Section {section.section}</p>
										</Col>
										<Col span={5}>
											<p>
												Days: {section.days.join(", ")}
											</p>
										</Col>
										<Col span={5}>
											<p>
												Start Time: {section.startTime}
											</p>
										</Col>
										<Col span={5}>
											<p>End Time: {section.endTime}</p>
										</Col>
										<Button
											type="primary"
											onClick={() =>
												handleEnrollCourse(section._id)
											}
										>
											Enroll
										</Button>
									</Row>
								);
							})}
						</div>
					</Col>
				);
			})}
		</Row>
	);
};

export default MyOfferedCourses;
