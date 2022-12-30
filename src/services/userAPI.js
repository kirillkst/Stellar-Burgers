import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../utils/constants';

export const userAPI = createApi({
	reducerPath: 'userAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	tagTypes: ['userGet'],
	endpoints: (builder) => ({
		getUser: builder.query({
			query: (token) => ({
				url: '/auth/user',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
			}),
			providesTags: ['userGet'],
		}),
		userUpdateToken: builder.mutation({
			query: (payload) => ({
				url: '/auth/token',
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['userGet'],
		}),
		userUpdate: builder.mutation({
			query: ({ token, payload }) => ({
				url: `/auth/user`,
				method: 'PATCH',
				body: payload,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
			}),
			invalidatesTags: ['userGet'],
		}),
		authUser: builder.mutation({
			query: ({ type, payload }) => ({
				url: `/auth/${type}`,
				method: 'POST',
				body: payload,
			}),
		}),
		frogotPassword: builder.mutation({
			query: (payload) => ({
				url: '/password-reset',
				method: 'POST',
				body: payload,
			}),
		}),
		resetPassword: builder.mutation({
			query: (payload) => ({
				url: '/password-reset/reset',
				method: 'POST',
				body: payload,
			}),
		}),
	}),
});

export const {
	useGetUserQuery,
	useUserUpdateTokenMutation,
	useUserUpdateMutation,
	useAuthUserMutation,
	useFrogotPasswordMutation,
	useResetPasswordMutation,
} = userAPI;
