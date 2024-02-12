import { Button, Row } from "antd";
import { toast } from "sonner";
import WrapperFrom from "../components/form/WrapperForm";
import WrapperInput from "../components/form/WrapperInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";
import { TResponse } from "../type";
import { useAppDispatch } from "../redux/hook";
import { logout } from "../redux/features/auth/authSlice";

const ChangePassword = () => {
	const navigate = useNavigate();
	const [changePassword] = useChangePasswordMutation();
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const res = (await changePassword(data)) as TResponse<any>;
		if (res?.data?.success) {
			toast.success("Password has been changed successfully", {
				duration: 3000,
			});
			dispatch(logout());
			navigate("/login", { replace: true });
		}
	};

	return (
		<Row justify="center" align="middle" style={{ height: "100vh" }}>
			<WrapperFrom onSubmit={onSubmit}>
				<h1 style={{ marginBottom: "20px" }}>
					Please change your password
				</h1>
				<WrapperInput
					type="password"
					name="oldPassword"
					label="Old Password"
				/>
				<WrapperInput
					type="password"
					name="newPassword"
					label="New Password"
				/>
				<Button htmlType="submit">Login</Button>
			</WrapperFrom>
		</Row>
	);
};

export default ChangePassword;
