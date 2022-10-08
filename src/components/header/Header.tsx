import React from 'react';

// Components
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
export const Header: React.FC<{headerTitle: string}> = ({headerTitle} ) => {

    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>{headerTitle}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
} 