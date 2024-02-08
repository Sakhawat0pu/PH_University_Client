import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
	type: string;
	name: string;
	label?: string;
};

const WrapperInput = ({ type, name, label }: TInputProps) => {
	return (
		<div style={{ marginBottom: "5px" }}>
			{/* {label ? <label htmlFor={name}>{label}</label> : null} */}
			<Controller
				name={name}
				render={({ field, fieldState: { error } }) => (
					<Form.Item label={label}>
						<Input {...field} type={type} id={name} size="large" />
						{error && (
							<small style={{ color: "red" }}>
								This field is required
							</small>
						)}
					</Form.Item>
				)}
			/>
		</div>
	);
};

export default WrapperInput;
