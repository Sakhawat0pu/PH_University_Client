import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/MyCourses";
import MyStudent from "../pages/faculty/MyStudent";

export const facultyPaths = [
	{
		name: "Dashboard",
		path: "dashboard",
		element: <FacultyDashboard />,
	},
	{
		name: "My Courses",
		path: "my-courses",
		element: <MyCourses />,
	},
	{
		path: "my-courses/:semesterRegistrationId/:courseId",
		element: <MyStudent />,
	},
];

export const facultyDefaultChild = {
	index: true,
	element: <FacultyDashboard />,
};
