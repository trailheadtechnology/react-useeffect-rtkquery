import { createSlice } from '@reduxjs/toolkit';

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
    extraReducers: (builder) => {},
});

export default slice.reducer;
