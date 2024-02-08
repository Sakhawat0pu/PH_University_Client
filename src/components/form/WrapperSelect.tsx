import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TOptions = {
	value: string;
	label: string;
	disabled?: boolean;
};

type TSelectProp = {
	label: string;
	name: string;
	options: TOptions[] | undefined;
	disabled?: boolean;
};

const WrapperSelect = ({ label, name, options, disabled }: TSelectProp) => {
	return (
		<Controller
			name={name}
			render={({ field, fieldState: { error } }) => (
				<Form.Item label={label}>
					<Select
						style={{ width: "100%" }}
						{...field}
						options={options}
						size="large"
						disabled={disabled}
					/>
					{error && (
						<small style={{ color: "red" }}>
							This field is required
						</small>
					)}
				</Form.Item>
			)}
		/>
	);
};

export default WrapperSelect;
