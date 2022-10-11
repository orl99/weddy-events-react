import React from "react";

import { IonPage, IonContent } from '@ionic/react';
import { Header } from "../../../components/header/Header";

import './Verify.scss'
import { BarcodeScanner } from "../../../components/scanner/scanner.component";

export const VerifyPage: React.FC = () => {


    return(
        <>
            <IonPage>
                <Header headerTitle="VerifyPage page" />
                <IonContent fullscreen>
                    <div className="verify-main-container">
                        <div className="verify-invite-data">
                            hello I will have a lot of data of the invite
                        </div>
                        <div className="verify-qr-container">
                            <div className="qr-container">
                                <BarcodeScanner/>

                            </div>
                        </div>
                        
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}