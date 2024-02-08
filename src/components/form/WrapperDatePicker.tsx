import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
	name: string;
	label?: string;
};

const WrapperDatePicker = ({ name, label }: TInputProps) => {
	return (
		<div style={{ marginBottom: "5px" }}>
			<Controller
				name={name}
				render={({ field, fieldState: { error } }) => (
					<Form.Item label={label}>
						<DatePicker
							{...field}
							id={name}
							size="large"
							style={{ width: "100%" }}
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

export default WrapperDatePicker;
