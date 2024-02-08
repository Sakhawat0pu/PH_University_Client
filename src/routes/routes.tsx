import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminDefaultChild, adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routeGenerator";
import { facultyDefaultChild, facultyPaths } from "./faculty.routes";
import { studentDefaultChild, studentPaths } from "./student.routes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/admin",
		element: <App />,
		children: routeGenerator(adminPaths, adminDefaultChild),
	},
	{
		path: "/faculty",
		element: <App />,
		children: routeGenerator(facultyPaths, facultyDefaultChild),
	},
	{
		path: "/student",
		element: <App />,
		children: routeGenerator(studentPaths, studentDefaultChild),
	},
	{
		path: "login",
		element: <Login />,
	},
	{
		path: "register",
		element: <Register />,
	},
]);

export default router;
