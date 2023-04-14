import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_BASE_URL}/users`,
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (name) => `/`,
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/create-users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery, useUpdateUserMutation, useCreateUserMutation } =
  userApi;
