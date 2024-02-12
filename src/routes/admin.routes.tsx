import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import StudentData from "../pages/admin/userManagement/StudentData";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";
import StudentUpdate from "../pages/admin/userManagement/StudentUpdate";
import RegisteredSemesters from "../pages/admin/courseManagement/RegisteredSemesters";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import Courses from "../pages/admin/courseManagement/Courses";
import OfferCourse from "../pages/admin/courseManagement/OfferCourse";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration";
import OfferedCourses from "../pages/admin/courseManagement/OfferedCourses";

export const adminPaths = [
	{
		name: "Dashboard",
		path: "dashboard",
		element: <AdminDashboard />,
	},
	{
		name: "Academic Management",
		children: [
			{
				name: "Create A. Semester",
				path: "create-academic-semester",
				element: <CreateAcademicSemester />,
			},
			{
				name: "Academic Semester",
				path: "semesters",
				element: <AcademicSemester />,
			},
			{
				name: "Create A. Faculty",
				path: "create-academic-faculty",
				element: <CreateAcademicFaculty />,
			},
			{
				name: "Academic Faculty",
				path: "faculties",
				element: <AcademicFaculty />,
			},
			{
				name: "Create A. Department",
				path: "create-academic-department",
				element: <CreateAcademicDepartment />,
			},
			{
				name: "Academic Department",
				path: "departments",
				element: <AcademicDepartment />,
			},
		],
	},
	{
		name: "User Management",
		children: [
			{
				name: "Create Student",
				path: "create-student",
				element: <CreateStudent />,
			},
			{
				name: "Students",
				path: "student-data",
				element: <StudentData />,
			},
			{
				path: "student-data/:studentId",
				element: <StudentDetails />,
			},
			{
				path: "student-update/:studentId",
				element: <StudentUpdate />,
			},
			{
				name: "Create Admin",
				path: "create-admin",
				element: <CreateAdmin />,
			},
			{
				name: "Create Faculty",
				path: "create-faculty",
				element: <CreateFaculty />,
			},
		],
	},
	{
		name: "Course Management",
		children: [
			{
				name: "Semester Registration",
				path: "semester-registration",
				element: <SemesterRegistration />,
			},
			{
				name: "Registered Semester",
				path: "registered-semester",
				element: <RegisteredSemesters />,
			},
			{
				name: "Create Course",
				path: "create-course",
				element: <CreateCourse />,
			},
			{
				name: "Courses",
				path: "courses",
				element: <Courses />,
			},
			{
				name: "Offer Course",
				path: "offer-Course",
				element: <OfferCourse />,
			},
			{
				name: "Offered Courses",
				path: "offered-courses",
				element: <OfferedCourses />,
			},
		],
	},
];

export const adminDefaultChild = {
	index: true,
	element: <AdminDashboard />,
};
