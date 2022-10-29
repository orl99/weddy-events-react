import { db } from './../firebase/firebase.service';

import {
    collection,
    addDoc,
    updateDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    setDoc
    } from "firebase/firestore";
import { IInvite } from '../../models/invites.model';

    const collectionName = 'invites';

    // Save Invite
    export const saveInvite = async (inviteObj: IInvite) => {
        try {
            const docRef = doc(db, collectionName, inviteObj.id);
            setDoc(docRef, inviteObj);
        } catch (error) {
            console.error('Firebase Error: ', error);
        }
    }

    // Confirm Invite
    export const confirmInvite = async (id: string, confirmInviteAnswer: boolean) => {
        try {
            
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, {
                is_confirmed: confirmInviteAnswer
            });
            return true;
        } catch (error) {
            console.error('Firebase Error: ', error);
            return false;
        }
    }
    // Confirm checkin
    export const checkInInvite = async (id: string, confirmInviteAnswer: boolean) => {
        try {
            
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, {
                is_checkin: confirmInviteAnswer
            });
            return true;
        } catch (error) {
            console.error('Firebase Error: ', error);
            return false;
        }
    }

    // Get Invite by Id
    export const getInviteById = async (id: string) => {
        try {
            const docRef = doc(db, collectionName, id);
            const uniqInvite = await getDoc(docRef);
            return uniqInvite;
        } catch (error) {
            console.error('Firebase Error: ', error);
        }
    }

    export const getInvites = async () => {
        try {
            const docRef = collection(db, collectionName);
            const invites = await getDocs(docRef);
            return invites;
        } catch (error) {
            console.error('Firebase Error: ', error);
        }
    }

    // Get Invite by Email
    export const getInviteByEmail = async (email: string) => {
        try {
            const uniqInvite = await getDoc(doc(db, collectionName, email));
            return uniqInvite;
        } catch (error) {
            console.error('Firebase Error: ', error);
        }
    }

    // Get Invite by phone number
    export const getInviteByPhoneNumber = async (phoneNumber: string) => {
        try {
            // const uniqInvite = await getDoc(doc(db, collectionName, phoneNumber));
            const invitesRef = collection(db, collectionName)
            const inviteQuery = query(invitesRef, where('phone_number',  '==', phoneNumber));
            const uniqInvite = await getDocs(inviteQuery);
            return uniqInvite;
        } catch (error) {
            console.error('Firebase Error: ', error);
            return null;
        }
    }
    // Get Invites by Last name
    // TODO: MAKE IT
    export const getInviteByLastName = async (inviteObj: IInvite) => {
        try {
            return addDoc(collection(db, collectionName), inviteObj);
        } catch (error) {
            console.error('Firebase Error: ', error);
        }
    }

    // modify invites
    // delete invites

    // checkInInvites
    // verifyInvites



    
    // export const updateWebsite = (id, updatedFields) =>
    //     updateDoc(doc(db, collectionName, id), updatedFields);
    
    // export const onGetLinks = (callback) => {
    //     const unsub = onSnapshot(collection(db, collectionName), callback);
    //     return unsub;
    // };
    
    // export const getWebsites = () => getDocs(collection(db, collectionName));
    
    // export const deleteWebsite = (id) => deleteDoc(doc(db, collectionName, id));
    
    // export const getWebsite = (id) => getDoc(doc(db, collectionName, id));


