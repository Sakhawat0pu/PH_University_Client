import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { verifyToken } from "../utils/verifyToken";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import WrapperFrom from "../components/form/WrapperForm";
import WrapperInput from "../components/form/WrapperInput";

const Login = () => {
	const location = useLocation();
	const navigate = useNavigate();
	let uri = location?.state?.from?.pathname || "/";

	const defaultValues = {
		id: "F-0003",
		password: "12345",
	};

	const [login] = useLoginMutation();
	const dispatch = useAppDispatch();

	const onSubmit = async (data: FieldValues) => {
		const toastId = toast.loading("Logging in..."); //* toast() returns an ID;
		try {
			const res = await login(data).unwrap();
			const user = verifyToken(res.data.accessToken) as TUser;
			dispatch(setUser({ user, token: res.data.accessToken }));

			if (res?.data?.needsPasswordChange) {
				uri = "/change-password";
			} else if (uri === "/") {
				uri = `/${user.role}/dashboard`;
			}
			toast.success("Logged in", { id: toastId, duration: 2000 }); //* previous toaster will be replaced
			navigate(uri, { replace: true });
		} catch (err) {
			toast.error("Something went wrong", {
				id: toastId,
				duration: 2000,
			});
		}
	};

	return (
		<Row justify="center" align="middle" style={{ height: "100vh" }}>
			<WrapperFrom onSubmit={onSubmit} defaultValues={defaultValues}>
				<h1 style={{ marginBottom: "20px" }}>Please Login</h1>
				<WrapperInput type="text" name="id" label="ID" />
				<WrapperInput
					type="password"
					name="password"
					label="Password"
				/>
				<Button htmlType="submit">Login</Button>
			</WrapperFrom>
		</Row>
	);
};

export default Login;
