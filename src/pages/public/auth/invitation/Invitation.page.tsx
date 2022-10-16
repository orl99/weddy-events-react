import { IonContent, IonPage, IonTitle, IonSelect, IonSelectOption, IonButton} from '@ionic/react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import { confirmInvite, getInviteById } from '../../../../services/http/invites.service';
export const InvitationPage: FC<RouteComponentProps<{uuid:string}>> = (props) => {
    
    // Form hook
    const { register, handleSubmit, formState: { errors } } = useForm<{invitation_confirm: boolean}>();

    

    const [uuidToken, setToken] = useState<string>('');
    useEffect(()=>{

        const getInvite = async (uuid: string) => {
            const x = await getInviteById(uuid);
            console.log('x', x?.data());
        };

        if(props && !!props?.match.params.uuid ) {
            const token = props?.match.params.uuid;
            setToken(token);
            console.log('uuidToken', token);
            getInvite(token);
        }


    }, [ setToken, props]);

    const handleInvitationForm = handleSubmit( async (formData) => {
        
        // console.log('errors', )
        if(!!formData) {
            console.log('formData', formData)
            // const formAnswer = (formData.invitation_confirm) ? true : false;
            await confirmInvite(uuidToken, formData.invitation_confirm);
        }
    });


    return (
        <>
            <IonPage>
                <IonContent>
                    <div className="invitation-main-container">
                        <IonTitle>Bienvenida Samantha</IonTitle>
                        <p>Nos complace mucho tenerte como una de nuestras Invitad@s para nuestra proxima boda</p>
                        <p>Aqui tienes mas datos de la boda y la Invitacion virtual</p>

                        <div className="invitation">
                            {/* <img src="" alt="" /> */}
                        </div>

                        <div className="invitation-confirm">
                            <p>Para nosotros es muy importante que confirmes tu asistencia, podrias confirmar?</p>
                            <form onSubmit={(event) => handleInvitationForm(event)}>
                                <IonSelect {...register('invitation_confirm')} name="invitation_confirm" id="invitation_confirm">
                                    <IonSelectOption value={true}>
                                        Si :D
                                    </IonSelectOption>
                                    <IonSelectOption value={false}>
                                        No :(
                                    </IonSelectOption>
                                </IonSelect>
                                <IonButton type='submit'>
                                    Enviar mi respuesta
                                </IonButton>
                            </form>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}