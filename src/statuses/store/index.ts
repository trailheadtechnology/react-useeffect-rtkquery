import { api } from './api';
import { selectors } from './selectors';
import { slice } from './slice';

const statusesStore: {
    actions: typeof slice.actions;
    selectors: typeof selectors;
    api: typeof api;
} = {
    actions: slice.actions,
    selectors,
    api,
};

export { statusesStore };
