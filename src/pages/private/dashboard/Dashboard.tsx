import React from "react";
import { IonPage, IonContent } from '@ionic/react';
import { Header } from "../../../components/header/Header";

export const DashboardPage: React.FC = () => {

    return(
        <IonPage>
            <Header headerTitle="Dashboard page" />
            <IonContent fullscreen>
                <div>hello Dashboard</div>
            </IonContent>
        </IonPage>
    )
}