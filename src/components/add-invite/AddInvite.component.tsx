import { IonItem, IonInput, IonLabel, IonCheckbox, IonButton } from '@ionic/react';
import { FormEvent } from 'react';

export const AddInviteComponent = () => {
    const addInviteFormHandler = (formEvent: FormEvent<HTMLFormElement> | undefined ) => {
        console.log('formEvent', formEvent);
        formEvent?.preventDefault();
        
    }

    return (
        <>
            <form onSubmit={(event) =>  addInviteFormHandler(event)}>
                <IonItem>
                    <IonLabel>Nombre</IonLabel>
                    <IonInput type='text' name='name' placeholder='Nombre'></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Apellidos</IonLabel>
                    <IonInput type='text' name='lastName' placeholder='Apellidos'></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Numero de telefono</IonLabel>
                    <IonInput type='tel' name='phoneNumber' placeholder='Numero de telefono'></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Email</IonLabel>
                    <IonInput type='email' name='phoneNumber' placeholder='Numero de telefono'></IonInput>
                </IonItem>
                <IonItem>
                    <IonCheckbox slot="start"></IonCheckbox>
                    <IonLabel>Es Familia?</IonLabel>
                </IonItem>
                <IonButton type='submit'>Guardar</IonButton>
            </form>
        </>
    )
}