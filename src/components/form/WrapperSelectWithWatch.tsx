import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

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
	mode?: "multiple" | undefined;
	handleValueChange: React.Dispatch<React.SetStateAction<string>>;
};

const WrapperSelectWithWatch = ({
	label,
	name,
	options,
	disabled,
	mode,
	handleValueChange,
}: TSelectProp) => {
	const { control } = useFormContext();
	const inputValue = useWatch({
		control,
		name,
	});

	useEffect(() => {
		handleValueChange(inputValue);
	}, [inputValue]);
	return (
		<Controller
			name={name}
			render={({ field, fieldState: { error } }) => (
				<Form.Item label={label}>
					<Select
						mode={mode}
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

export default WrapperSelectWithWatch;
