import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { TUser, logout } from "../../redux/features/auth/authSlice";

type TProtectedRouteProps = {
	children: ReactNode;
	role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
	const { token } = useAppSelector((state) => state.auth);
	// const location = useLocation();
	const dispatch = useAppDispatch();

	let user;
	if (token) {
		user = verifyToken(token) as TUser;
	}

	if (role !== undefined && role !== user?.role) {
		dispatch(logout());
		// return <Navigate to="/login" state={{ from: location }} replace />;
		return <Navigate to="/login" replace />;
	}

	if (!token) {
		// return <Navigate to="/login" state={{ from: location }} replace />;
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
