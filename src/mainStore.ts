import { configureStore } from '@reduxjs/toolkit';
import statusesReducer from './statuses/store/slice';
import { mainApi } from './statuses/services/mainApi';

export const mainStore = configureStore({
    reducer: {
        [mainApi.reducerPath]: mainApi.reducer,
        statuses: statusesReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(mainApi.middleware)
        .filter(Boolean), // Remove conditionally concatted middlewares (e.x. Redux Logger only defined for dev builds),
});

export type RootState = ReturnType<typeof mainStore.getState>;