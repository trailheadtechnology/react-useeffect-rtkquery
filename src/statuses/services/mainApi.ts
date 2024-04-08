// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    // Fake mock AP just for example
    baseUrl: 'https://jsonplaceholder.typicode.com/'
  }),
  endpoints: () => ({}),
});