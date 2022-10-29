import { configureStore } from '@reduxjs/toolkit';
import invitesReducer from './redux/Invite.slice';
import RoutingSlice  from './redux/Routing.slice';

export default configureStore({
    reducer: { Invites: invitesReducer, Routing: RoutingSlice }
})