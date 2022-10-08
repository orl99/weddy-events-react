import React from "react";

import { IonPage, IonContent } from '@ionic/react';
import { Header } from "../../../components/header/Header";

export const VerifyPage: React.FC = () => {

    return(
        <IonPage>
            <Header headerTitle="VerifyPage page" />
            <IonContent fullscreen>
                <div>hello VerifyPage</div>
            </IonContent>
        </IonPage>
    )
}