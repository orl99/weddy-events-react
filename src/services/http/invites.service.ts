import { db } from './../firebase/firebase.service';

import {
    collection,
    addDoc,
    updateDoc,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    } from "firebase/firestore";
import { IInvite } from '../../models/invites.model';

    const collectionName = 'invites';

    // save invites
    export const saveInvites = async (inviteObj: IInvite) => {
        try {
            console.log('inviteObj', inviteObj);
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


