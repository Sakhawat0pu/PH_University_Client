import {
	TAcademicDepartment,
	TAcademicFaculty,
	TAcademicSemester,
	TFaculty,
	TResponseRedux,
} from "../../../type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllSemesters: builder.query({
			query: (args) => {
				const params = new URLSearchParams();
				if (args) {
					args.forEach((item: Record<string, any>) => {
						params.append(item.name, item.value);
					});
				}
				return {
					url: "/semesters",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (
				response: TResponseRedux<TAcademicSemester[]>
			) => {
				return { data: response?.data, meta: response?.meta };
			},
			providesTags: ["Academic Semester"],
		}),
		addAcademicSemester: builder.mutation({
			query: (data) => ({
				url: "/semesters/create-academic-semester",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Academic Semester"],
		}),
		getAllAcademicFaculty: builder.query({
			query: () => ({
				url: "/faculties",
				method: "GET",
			}),
			transformResponse: (
				response: TResponseRedux<TAcademicFaculty[]>
			) => {
				return { data: response?.data };
			},
			providesTags: ["Academic Faculty"],
		}),
		getAllFaculties: builder.query({
			query: () => ({
				url: "/faculty",
				method: "GET",
			}),
			transformResponse: (response: TResponseRedux<TFaculty[]>) => {
				return { data: response?.data, meta: response?.meta };
			},
			providesTags: ["Academic Faculty"],
		}),
		addAcademicFaculty: builder.mutation({
			query: (data) => ({
				url: "/faculties/create-academic-faculty",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Academic Faculty"],
		}),

		getAllAcademicDepartment: builder.query({
			query: () => ({
				url: "/departments",
				method: "GET",
			}),
			transformResponse: (
				response: TResponseRedux<TAcademicDepartment[]>
			) => {
				return { data: response.data };
			},
			providesTags: ["Academic Department"],
		}),
		addAcademicDepartment: builder.mutation({
			query: (data) => ({
				url: "/departments/create-academic-department",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetAllSemestersQuery,
	useAddAcademicSemesterMutation,
	useGetAllAcademicFacultyQuery,
	useAddAcademicFacultyMutation,
	useGetAllAcademicDepartmentQuery,
	useAddAcademicDepartmentMutation,
	useGetAllFacultiesQuery,
} = academicManagementApi;
