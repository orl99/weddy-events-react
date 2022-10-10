import React from "react";

import { IonPage, IonContent } from '@ionic/react';
import { Header } from "../../../components/header/Header";
import { BarcodeScanner } from '../../../components/barcode-scanner/barcodeScanner';

export const VerifyPage: React.FC = () => {

    return(
        <IonPage>
            <Header headerTitle="VerifyPage page" />
            <IonContent fullscreen>
                <div>hello VerifyPage</div>
                <BarcodeScanner />
            </IonContent>
        </IonPage>
    )
}