import React from "react";
import { IonPage, IonContent } from '@ionic/react';
import { Header } from "../../../components/header/Header";

export const ProfilePage: React.FC = () => {

    return(
        <IonPage>
            <Header headerTitle="ProfilePage page" />
            <IonContent fullscreen>
                <div>hello ProfilePage</div>
            </IonContent>
        </IonPage>
    )
}