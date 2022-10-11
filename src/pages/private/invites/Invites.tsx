import React from "react";
import { IonPage, IonContent} from '@ionic/react';
import { Header } from "../../../components/header/Header";
import { AddInviteComponent } from "../../../components/add-invite/AddInvite.component";

export const InvitesPage: React.FC = () => {

    return(
        <IonPage>
            <Header headerTitle="Invites" />
            <IonContent fullscreen>
                <AddInviteComponent/>
            </IonContent>
        </IonPage>
    )
}