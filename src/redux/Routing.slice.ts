import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const RoutingSlice = createSlice({
    name: 'Routing',
    initialState: {selectedTab: ''},
    reducers: {
        setSelectedTab: (state, action: PayloadAction<{selectedTab: string}>) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
            state.selectedTab = action.payload.selectedTab;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSelectedTab } = RoutingSlice.actions

export default RoutingSlice.reducer;