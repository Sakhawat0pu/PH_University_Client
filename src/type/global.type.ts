import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
	data: {
		success: boolean;
		message: string;
		stack: string;
	};
	status: number;
};

export type TMeta = {
	limit: number;
	page: number;
	totalDocuments: number;
	totalPage: number;
};

export type TResponse<T> = {
	data?: T;
	error?: TError;
	meta?: TMeta;
	success: boolean;
	message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
