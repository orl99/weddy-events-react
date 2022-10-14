import { IInvite } from '../models/invites.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IInvitesState {
    currentInviteInfo: IInvite | null;
}

const initialInvitesState: IInvitesState = {
    currentInviteInfo: null
}
export const InvitesSlice = createSlice({
    name: 'Invites',
    initialState: initialInvitesState,
    reducers: {
        addCurrentInviteInfo: (state, action: PayloadAction<IInvite>) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
            state.currentInviteInfo = {...action.payload};
        },
    },
});

// Action creators are generated for each case reducer function
export const { addCurrentInviteInfo } = InvitesSlice.actions

export default InvitesSlice.reducer;