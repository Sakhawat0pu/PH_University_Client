import { Form } from "antd";
import { ReactNode } from "react";
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
} from "react-hook-form";

type TFormConfig = {
	defaultValues?: Record<string, unknown>;
	resolver?: any;
};

type TFormProps = {
	onSubmit: SubmitHandler<FieldValues>;
	children: ReactNode;
} & TFormConfig;

const WrapperForm = ({
	onSubmit,
	children,
	defaultValues,
	resolver,
}: TFormProps) => {
	const formConfig: Record<string, unknown> = {};
	if (defaultValues) {
		formConfig["defaultValues"] = defaultValues;
	}

	if (resolver) {
		formConfig["resolver"] = resolver;
	}
	const methods = useForm(formConfig);

	const handleSubmit: SubmitHandler<FieldValues> = (data) => {
		onSubmit(data);
		methods.reset();
	};

	return (
		<FormProvider {...methods}>
			<Form
				layout="vertical"
				onFinish={methods.handleSubmit(handleSubmit)}
			>
				{children}
			</Form>
		</FormProvider>
	);
};

export default WrapperForm;
