import { TResponseRedux, TStudent } from "../../../type";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllStudents: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: Record<string, any>) => {
						params.append(item.name, item.value);
					});
				}
				return {
					url: "/students",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TStudent[]>) => {
				return { data: response?.data, meta: response?.meta };
			},
			providesTags: ["Student"],
		}),
		getAStudent: builder.query({
			query: (studentId) => ({
				url: `/students/${studentId}`,
				method: "GET",
			}),
			transformResponse: (response: TResponseRedux<TStudent>) => {
				return response.data;
			},
			providesTags: ["Student"],
		}),
		addStudents: builder.mutation({
			query: (data) => ({
				url: "/users/create-student",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Student"],
		}),
		updateStudent: builder.mutation({
			query: (data) => ({
				url: `/students/${data.studentId}`,
				method: "PATCH",
				body: { student: data.body },
			}),
			invalidatesTags: ["Student"],
		}),
		changeStatus: builder.mutation({
			query: (data) => ({
				url: `/users/change-status/${data.id}`,
				method: "POST",
				body: data.body,
			}),
			invalidatesTags: ["Student"],
		}),
	}),
});

export const {
	useAddStudentsMutation,
	useGetAllStudentsQuery,
	useGetAStudentQuery,
	useUpdateStudentMutation,
	useChangeStatusMutation,
} = userManagementApi;
