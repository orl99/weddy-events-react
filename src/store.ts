import { configureStore } from '@reduxjs/toolkit'
import invitesReducer from './redux/Invite.slice'

export default configureStore({
    reducer: { Invites: invitesReducer }
})