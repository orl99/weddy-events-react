import React from "react";
import { IonPage, IonContent} from '@ionic/react';
import { Header } from "../../../components/header/Header";
import { AddInviteComponent } from "../../../components/add-invite/AddInvite.component";
import { InviteInfoComponent } from "../../../components/invites-info/Invite-info.component";
import './Invites.scss';

export const InvitesPage: React.FC = () => {

    return(
        <IonPage>
            <Header headerTitle="Invites" />
            <IonContent fullscreen className="ion-padding">
                <div className="invites-page-container">
                    <AddInviteComponent/>
                    <InviteInfoComponent/>
                </div>
            </IonContent>
        </IonPage>
    )
}