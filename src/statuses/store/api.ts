import { mainApi } from '../services/mainApi';

export const api = mainApi.enhanceEndpoints({
    addTagTypes: [],
}).injectEndpoints({
    endpoints: (builder) => ({
        changeStatus: builder.query<any, { entryId: string }>({
            query: ({ entryId }) => ({
                url: `posts`,
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
});

