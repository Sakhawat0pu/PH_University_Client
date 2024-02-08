import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferedCourse from "../pages/faculty/OfferedCourse";

export const facultyPaths = [
	{
		name: "Dashboard",
		path: "dashboard",
		element: <FacultyDashboard />,
	},
	{
		name: "Offered Courses",
		path: "offered-course",
		element: <OfferedCourse />,
	},
];

export const facultyDefaultChild = {
	index: true,
	element: <FacultyDashboard />,
};
