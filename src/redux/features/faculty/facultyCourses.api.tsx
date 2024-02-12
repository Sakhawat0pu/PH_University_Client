import { TResponseRedux } from "../../../type";
import { TFacultyCourses } from "../../../type/facultyCourse.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllFacultyCourses: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: Record<string, any>) => {
						params.append(item.name, item.value);
					});
				}
				return {
					url: "/enroll/",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (
				response: TResponseRedux<TFacultyCourses[]>
			) => {
				return { data: response?.data, meta: response?.meta };
			},
			providesTags: ["Faculty Courses"],
		}),
		updateMarks: builder.mutation({
			query: (data) => ({
				url: "/enroll/update-marks",
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Faculty Courses"],
		}),
	}),
});

export const { useGetAllFacultyCoursesQuery, useUpdateMarksMutation } =
	studentCourseApi;
