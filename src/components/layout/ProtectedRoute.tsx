import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { token } = useAppSelector((state) => state.auth);
	const location = useLocation();
	if (token) {
		return children;
	}
	return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
