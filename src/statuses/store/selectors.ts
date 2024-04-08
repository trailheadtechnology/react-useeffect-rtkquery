import {RootState} from "../../mainStore";

export const selectors = {
    selectStatusesLoadingIds: (state: RootState): { [key: string]: boolean } => {
        return state.statuses?.loadingIds;
    },
};

