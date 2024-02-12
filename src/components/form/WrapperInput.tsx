import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
	type: string;
	name: string;
	max?: string;
	min?: string;
	label?: string;
	disabled?: boolean;
};

const WrapperInput = ({
	type,
	name,
	label,
	disabled,
	max,
	min,
}: TInputProps) => {
	return (
		<div style={{ marginBottom: "5px" }}>
			{/* {label ? <label htmlFor={name}>{label}</label> : null} */}
			<Controller
				name={name}
				render={({ field, fieldState: { error } }) => (
					<Form.Item label={label}>
						<Input
							{...field}
							type={type}
							id={name}
							size="large"
							disabled={disabled}
							max={max}
							min={min}
						/>
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
