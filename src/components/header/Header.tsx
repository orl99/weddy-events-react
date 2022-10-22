import React from 'react';
import './Header.component.scss'

// Components
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
export const Header: React.FC<{headerTitle: string}> = ({headerTitle} ) => {

    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle className='header-title'>{headerTitle}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
} 