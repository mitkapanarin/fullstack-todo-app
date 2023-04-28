import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
  reducerPath: "tasksApi",
  tagTypes: ["Tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_BASE_URL}/tasks`,
  }),
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: ({ userID }) => `/all-tasks/${userID}`,
      providesTags: ["Tasks"],
    }),
    createTask: builder.mutation({
      query: ({ body, userID }) => ({
        url: `/create-one-task/${userID}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: ({ userID, taskID }) => ({
        url: `/delete-task/${userID}/${taskID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    editTask: builder.mutation({
      query: ({ userID, taskID, updatedData }) => ({
        url: `/update-task/${userID}/${taskID}`,
        method: "PUT",
        body: updatedData
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useEditTaskMutation } =
  tasksApi;
