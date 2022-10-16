import { IonContent, IonPage, IonTitle, IonSelect, IonSelectOption, IonButton} from '@ionic/react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import { IInvite } from '../../../../models/invites.model';
import { confirmInvite, getInviteById } from '../../../../services/http/invites.service';
import { qrCodeGenerator } from './.././../../../services/qr-code-generator.service';
import './Invitation.page.scss'
export const InvitationPage: FC<RouteComponentProps<{uuid:string}>> = (props) => {
    
    // Form hook
    const { register, handleSubmit, formState: { errors } } = useForm<{invitation_confirm: boolean}>();

    const [uuidToken, setToken] = useState<string>('');
    const [inviteInfo, setInviteInfo] = useState<IInvite>();
    const [QRForInvite, setQRForInvite] = useState<string>();

    useEffect(()=>{
        // get invite from token id
        const getInvite = async (uuid: string) => {
            const response = await getInviteById(uuid);
            if(response?.exists()) {
                const invite = response.data() as IInvite;
                setInviteInfo(invite);
                const qrCodeImg = await qrCodeGenerator(invite.id);
                if(qrCodeImg) {
                    setQRForInvite(qrCodeImg);
                }
            }
        };

        if(props && !!props?.match.params.uuid ) {
            const token = props?.match.params.uuid;
            setToken(token);
            console.log('uuidToken', token);
            getInvite(token);
        }


    }, [ setToken, props]);

    const handleInvitationForm = handleSubmit( async (formData) => {
        if(!!formData) {
            await confirmInvite(uuidToken, formData.invitation_confirm);
        }
    });


    return (
        <>
            <IonPage>
                <IonContent>
                    {inviteInfo ? 
                    (<>
                        <div className="inv-main-container ion-padding">
                            <h1 className='text-center'>Bienvenida Samantha</h1>
                            <div className="inv-greetings-container">
                                <p>Nos complace mucho tenerte como una de nuestras Invitad@s para nuestra proxima boda</p>
                                <p>Aqui tienes mas datos de la boda y la Invitacion virtual</p>
                            </div>

                            <div className="inv-container-theming inv-container">
                                    <div className="inv-logo-container">
                                        <img src="assets/img/inv-logo.png" alt="QR Code Invite" />
                                    </div>
                                    <div className="inv-inv1-container">
                                        <img src="assets/img/inv-1.png" alt="QR Code Invite" />
                                    </div>
                                    <div className="inv-inv2-container">
                                        <img src="assets/img/inv-2.png" alt="QR Code Invite" />
                                    </div>
                                    <div>
                                        <p className='inv-invite-detail-with-number-of-invites'>{`${inviteInfo.name} ${inviteInfo.last_name}: ${inviteInfo.number_of_invites}`}</p>
                                    </div>
                                    <div className="inv-qr-code-container">
                                        <img src={QRForInvite} alt="QR Code Invite" />
                                    </div>
                            </div>
                            <div className="inv-container-theming inv-container-desktop">
                                    <div className="inv-container-p1">
                                        <div className="inv-logo-container">
                                            <img src="assets/img/inv-logo.png" alt="QR Code Invite" />
                                        </div>
                                        <div className="inv-qr-code-container">
                                            <img src={QRForInvite} alt="QR Code Invite" />
                                        </div>
                                    </div>
                                    <div className="inv-container-p2">
                                        <div className="inv-inv2-container">
                                            <img src="assets/img/inv-2.png" alt="QR Code Invite" />
                                        </div>
                                        <div className="inv-inv1-container">
                                            <img src="assets/img/inv-1.png" alt="QR Code Invite" />
                                        </div>
                                        <span className='inv-invite-detail-with-number-of-invites'>{`${inviteInfo.name} ${inviteInfo.last_name}: ${inviteInfo.number_of_invites}`}</span>
                                    </div>
                            </div>
                            <div className="inv-confirm">
                                <p>Para nosotros es muy importante que confirmes tu asistencia, podrias confirmar?</p>
                                <form onSubmit={(event) => handleInvitationForm(event)}>
                                    <IonSelect {...register('invitation_confirm')} name="inv_confirm" id="inv_confirm">
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
                    </>)
                    :
                    (<></>)    
                }

                </IonContent>
            </IonPage>

            {/* 
            
            
                                        <div className="inv-container">
                                <div className="inv-container-p1">
                                    <div className="inv-logo-container">
                                        <img src="assets/img/inv-logo.png" alt="QR Code Invite" />
                                    </div>
                                    <div className="inv-qr-code-container">
                                        <img src={QRForInvite} alt="QR Code Invite" />
                                    </div>
                                </div>
                                <div className="inv-container-p2">
                                    <div className="inv-inv2-container">
                                        <img src="assets/img/inv-2.png" alt="QR Code Invite" />
                                    </div>
                                    <div className="inv-inv1-container">
                                        <img src="assets/img/inv-1.png" alt="QR Code Invite" />
                                    </div>
                                    <span className='inv-invite-detail-with-number-of-invites'>{`${inviteInfo.name} ${inviteInfo.last_name}: ${inviteInfo.number_of_invites}`}</span>
                                </div>
                            </div>
            */}
        </>
    )
}


