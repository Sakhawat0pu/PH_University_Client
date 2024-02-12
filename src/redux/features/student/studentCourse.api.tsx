import { TResponseRedux } from "../../../type";
import {
	TMyEnrolledCourse,
	TMyOfferedCourse,
} from "../../../type/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllMyOfferedCourses: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: Record<string, any>) => {
						params.append(item.name, item.value);
					});
				}
				return {
					url: "/offered-courses/my-offered-courses",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (
				response: TResponseRedux<TMyOfferedCourse[]>
			) => {
				return { data: response?.data, meta: response?.meta };
			},
			providesTags: ["My offered Courses"],
		}),
		enrollCourse: builder.mutation({
			query: (data) => ({
				url: "/enroll/create-enroll-course",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["My offered Courses"],
		}),
		getMyEnrolledCourses: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: Record<string, any>) => {
						params.append(item.name, item.value);
					});
				}
				return {
					url: "/enroll/my-enrolled-courses",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (
				response: TResponseRedux<TMyEnrolledCourse[]>
			) => {
				return { data: response?.data, meta: response?.meta };
			},
		}),
	}),
});

export const {
	useGetAllMyOfferedCoursesQuery,
	useEnrollCourseMutation,
	useGetMyEnrolledCoursesQuery,
} = studentCourseApi;
