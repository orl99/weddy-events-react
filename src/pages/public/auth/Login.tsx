import React from "react";
import { IonReactRouter, } from '@ionic/react-router';

// styles
import './Login.scss';
// components
import { IonPage, IonContent, IonInput, IonLabel, IonItem, IonCard, IonCardContent, IonButton } from "@ionic/react";

export const LoginPage: React.FC = ( ) => 

{
    // GlobalState
    // ComponentState
    // Functions

    // TODO: NEEDS LOGIC AND API

    return(
        <IonPage>
            <IonContent fullscreen>
                <div className="auth-page-container">
                    <IonCard className="auth-container">
                        <IonCardContent>
                            <div className="weddy-logo-container">
                                <img src="https://blog.leonhassan.co.uk/content/images/2017/08/O_UI5_V.svg" alt="Logo" />
                            </div>
                            <form className="auth-form-container">
                                <IonItem className="form-input">
                                    <IonLabel>Email</IonLabel>
                                    <IonInput name="email" type="email" />
                                </IonItem>
                                <IonItem className="form-input">
                                    <IonLabel>Password</IonLabel>
                                    <IonInput name="password" type="password" />
                                </IonItem>
                                <IonButton routerLink="/Dashboard" className="auth-login-btn">Login</IonButton>

                            </form>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
}