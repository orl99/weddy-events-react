import React, { useState } from "react";

import { IonPage, IonContent, IonButton} from '@ionic/react';
import { Header } from "../../../components/header/Header";

import './Verify.scss'
// import { BarcodeScanner } from "../../../components/scanner/scanner.component";

export const VerifyPage: React.FC = () => {

    const [activateScanner, setScannerStatus] = useState<boolean>(false)
    return(
        <>
            <IonPage>
                <Header headerTitle="VerifyPage page" />
                <IonContent fullscreen>
                    <div className="verify-main-container">
                        <div className="verify-invite-data">
                            hello I will have a lot of data of the invite
                            <IonButton onClick={()=> setScannerStatus(true)}>Active Scanner</IonButton>
                            <IonButton onClick={()=> setScannerStatus(false)}>Desactivar Scanner</IonButton>
                        </div>
                        <div className="verify-qr-container">
                            <div className="qr-container">
                                {/* <BarcodeScanner start={activateScanner}/> */}
                            </div>
                        </div>
                        
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}