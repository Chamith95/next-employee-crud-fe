"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employee } from "./employeeTypes";

const BE_BASE_URL = 'http://localhost:3005';

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: BE_BASE_URL }),
  endpoints: (builder) => ({
    getEmployee: builder.query<Employee[], void>({
      query: () => "employees",
    }),
    getEmployeebyId: builder.query<Employee, number>({
        query: (id) => `employees/${id}`,
      }),
    createEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: ({...body }) => ({
        url: `employees`,
        method: "POST",
        body: body,
      }),
    }),
    deleteEmployee: builder.mutation<Employee, number>({
        query: (id) => ({
          url: `employees/${id}`,
          method: "DELETE",
        }),
      }),
      updateEmployee: builder.mutation<Employee, Partial<Employee>>({
        query: ({id,...body }) => ({
          url: `employees/${id}`,
          method: "POST",
          body: body,
        }),
      }),
  }),
});

export const { useGetEmployeeQuery,useGetEmployeebyIdQuery, useCreateEmployeeMutation ,useDeleteEmployeeMutation ,useUpdateEmployeeMutation} = employeeApi;
export const {
  useLazyQuery: useGetProfileLazyQuery,
  useQueryState: useGetProfileQueryState,
} = employeeApi.endpoints.getEmployee;
