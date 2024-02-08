import { ReactNode } from "react";

export type TRoute = {
	index?: boolean;
	path?: string;
	element: ReactNode;
};

export type TDefaultChild = {
	index: boolean;
	element: ReactNode;
};

export type TPath = {
	name?: string;
	path?: string;
	element?: ReactNode;
	children?: TPath[];
};

export type TSiderItem =
	| {
			key: string;
			label: ReactNode; // string is also considered as react node
			children?: TSiderItem[];
	  }
	| undefined;
