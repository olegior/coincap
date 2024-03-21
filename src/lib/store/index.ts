import { configureStore } from "@reduxjs/toolkit";
import { historIntervalReducer } from "./features/historyInterval/historyIntervalSlice";
import { historyDataReducer } from "./features/historyData/historyDataSlice";
import { portfolioReducer } from "./features/portfolio/portfolioSlice";
import { searchReducer } from "./features/search/searchSilce";

export const makeStore = () => {
    return configureStore({
        reducer: {
            historInterval: historIntervalReducer,
            historyData: historyDataReducer,
            portfolio: portfolioReducer,
            search: searchReducer
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']