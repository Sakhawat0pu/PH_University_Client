import MyOfferedCourses from "../pages/student/MyOfferedCourses";
import MySchedule from "../pages/student/MySchedule";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
	{
		name: "Dashboard",
		path: "dashboard",
		element: <StudentDashboard />,
	},
	{
		name: "My offered courses",
		path: "my-offered-courses",
		element: <MyOfferedCourses />,
	},
	{
		name: "My Schedule",
		path: "my-schedule",
		element: <MySchedule />,
	},
];

export const studentDefaultChild = {
	index: true,
	element: <StudentDashboard />,
};
