import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/auth'
  
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (credentials) => ({
                url: `${USERS_URL}/signin`,
                method: 'POST',
                body: credentials,
            }),
        }),
        signup: builder.mutation({
            query: (credentials) => ({
                url: `${USERS_URL}/signup`,
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const {useSigninMutation, useSignupMutation} = userApiSlice;