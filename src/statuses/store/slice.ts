import { createSlice } from '@reduxjs/toolkit';
import {api} from "./api";

interface IState {
    loadingIds: { [key: string]: boolean };
}

const initialState: IState = {
    loadingIds: {},
};

export const slice = createSlice({
    name: 'statuses',
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.changeStatus.matchPending, (state, { meta }) => {
            const entryId = meta?.arg?.originalArgs?.entryId;
            if (entryId && typeof entryId === 'string') {
                state.loadingIds[entryId] = true;
            }
        });
        builder.addMatcher(api.endpoints.changeStatus.matchFulfilled, (state, { meta }) => {
            const entryId = meta?.arg?.originalArgs?.entryId;
            if (entryId && typeof entryId === 'string') {
                const newLoading = { ...state.loadingIds };
                delete newLoading[entryId];
                state.loadingIds = newLoading;
            }
        });
        builder.addMatcher(api.endpoints.changeStatus.matchRejected, (state, { meta }) => {
            const entryId = meta?.arg?.originalArgs?.entryId;
            if (entryId && typeof entryId === 'string') {
                const newLoading = { ...state.loadingIds };
                delete newLoading[entryId];
                state.loadingIds = newLoading;
            }
        });
    },
});

export default slice.reducer;
