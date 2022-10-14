import { IInvite } from './../../models/invites.model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveInvite } from  './../../services/http/invites.service';

export const addNewInvite =  createAsyncThunk(
    'posts/addNewPost',
    async (inviteDto: IInvite) => {
        const response = await saveInvite(inviteDto)
        return response
    }
);