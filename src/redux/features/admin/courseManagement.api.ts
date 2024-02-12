import {
	TAssignedFaculties,
	TCourse,
	TOfferedCourse,
	TResponseRedux,
	TSemester,
} from "../../../type";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllRegisteredSemesters: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: Record<string, any>) => {
						params.append(item.name, item.value);
					});
				}
				return {
					url: "/semester-registration",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TSemester[]>) => {
				return { data: response?.data, meta: response?.meta };
			},
			providesTags: ["Registered Semester"],
		}),
		getAllCourses: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: Record<string, any>) => {
						params.append(item.name, item.value);
					});
				}
				return {
					url: "/course",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TCourse[]>) => {
				return { data: response?.data, meta: response?.meta };
			},
			providesTags: ["Course"],
		}),
		getAllOfferedCourses: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: Record<string, any>) => {
						params.append(item.name, item.value);
					});
				}
				return {
					url: "/offered-courses",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
				return { data: response?.data, meta: response?.meta };
			},
			providesTags: ["Offered Courses"],
		}),
		getAssignedFacultiesForCourse: builder.query({
			query: (courseId) => {
				return {
					url: `/course/${courseId}/get-faculties`,
					method: "GET",
				};
			},
			transformResponse: (
				response: TResponseRedux<TAssignedFaculties>
			) => {
				return { faculties: response?.data?.faculties };
			},
			providesTags: ["Course"],
		}),
		addCourses: builder.mutation({
			query: (data) => ({
				url: "/course/create-course",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Course"],
		}),
		addRegisterSemester: builder.mutation({
			query: (data) => ({
				url: "/semester-registration/create-semester-registration",
				method: "POST",
				body: data,
			}),
		}),
		updateRegisteredSemesterStatus: builder.mutation({
			query: (args) => ({
				url: `semester-registration/${args.id}`,
				method: "PATCH",
				body: args.data,
			}),
			invalidatesTags: ["Registered Semester"],
		}),
		assignFaculties: builder.mutation({
			query: (args) => ({
				url: `/course/${args.courseId}/assign-faculties`,
				method: "PUT",
				body: args.data,
			}),
			invalidatesTags: ["Course"],
		}),
		addOfferCourse: builder.mutation({
			query: (data) => ({
				url: `/offered-courses/create-offered-course`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Offered Courses"],
		}),
	}),
});

export const {
	useAddRegisterSemesterMutation,
	useGetAllRegisteredSemestersQuery,
	useUpdateRegisteredSemesterStatusMutation,
	useGetAllCoursesQuery,
	useGetAssignedFacultiesForCourseQuery,
	useAddCoursesMutation,
	useAssignFacultiesMutation,
	useAddOfferCourseMutation,
	useGetAllOfferedCoursesQuery,
} = courseManagementApi;
