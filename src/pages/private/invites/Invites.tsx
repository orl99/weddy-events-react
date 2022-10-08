import React from "react";
import { IonPage, IonContent } from '@ionic/react';
import { Header } from "../../../components/header/Header";

export const InvitesPage: React.FC = () => {

    return(
        <IonPage>
            <Header headerTitle="InvitesPage page" />
            <IonContent fullscreen>
                <div>hello InvitesPage</div>
            </IonContent>
        </IonPage>
    )
}