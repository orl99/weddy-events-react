import { IonContent, IonPage, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { FC, ReactInstance, Ref, RefObject, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import { InvitationTemplateComponent } from '../../../../components/Invitation-template/Invitation-template.component';
import { IInvite } from '../../../../models/invites.model';
import { confirmInvite, getInviteById } from '../../../../services/http/invites.service';
import { qrCodeGenerator } from './.././../../../services/qr-code-generator.service';
import './Invitation.page.scss'

/* in ES 5 */
// const domtoimage = require('dom-to-image');

/* in ES 6 */
import domtoimage from 'dom-to-image';


export const InvitationPage: FC<RouteComponentProps<{ uuid: string }>> = (props) => {
    const componentRef = useRef<Ref<HTMLDivElement> | undefined>();
    // Form hook
    const { register, handleSubmit, formState: { errors } } = useForm<{ invitation_confirm: boolean }>();

    const [uuidToken, setToken] = useState<string>('');
    const [inviteInfo, setInviteInfo] = useState<IInvite>();
    const [QRForInvite, setQRForInvite] = useState<string>();

    useEffect(() => {
        // get invite from token id
        const getInvite = async (uuid: string) => {
            const response = await getInviteById(uuid);
            if (response?.exists()) {
                const invite = response.data() as IInvite;
                setInviteInfo(invite);
                console.log('invite', invite);
                const qrCodeImg = await qrCodeGenerator(invite.id);
                if (qrCodeImg) {
                    setQRForInvite(qrCodeImg);
                }
            }
        };

        if (props && !!props?.match.params.uuid) {
            const token = props?.match.params.uuid;
            setToken(token);
            console.log('uuidToken', token);
            getInvite(token);
        }


    }, [setToken, props]);

    const handleInvitationForm = handleSubmit(async (formData) => {
        if (!!formData) {
            console.log('uuidToken', uuidToken);
            await confirmInvite(uuidToken, formData.invitation_confirm);
        }
    });

    const downloadInvitation = async () => {
        // const invitationTemplateDesktop = document.getElementById('invitationTemplateDesktop');
        // const invitationTemplateMobile = document.getElementById('invitationTemplateMobile');
        // invitationTemplateDesktop?.classList.add('deskToPrint');
        // invitationTemplateMobile?.classList.add('mobileToPrint');
        // debugger
        const invitationNode = document.getElementById('invitationTemplate');
        const dataUrl = await domtoimage.toJpeg(invitationNode as HTMLElement, { quality: 1.0 });
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `Invitacion para ${inviteInfo?.name}`;
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        // invitationTemplateDesktop?.classList.remove('deskToPrint');
        // invitationTemplateMobile?.classList.remove('mobileToPrint');
    }


    return (
        <>
            <IonPage>
                <IonContent>
                    {inviteInfo ?
                        (<>
                            <div className="inv-main-container ion-padding">
                                <h1 className='text-center'>Bienvenid@ {inviteInfo.name}</h1>
                                <div className="inv-greetings-container">
                                    <p>Nos complace mucho tenerte como una de nuestras Invitad@s para nuestra proxima boda</p>
                                    <p>Aqui tienes mas datos de la boda y la Invitacion virtual</p>
                                </div>
                                <div>
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
                                            <div className="inv-inv1-container">
                                                <img src="assets/img/inv-1.png" alt="QR Code Invite" />
                                            </div>
                                            <div className="inv-inv2-container">
                                                <img src="assets/img/inv-2.png" alt="QR Code Invite" />
                                            </div>
                                            <p className='inv-invite-detail-with-number-of-invites text-center'>{`${inviteInfo.name} ${inviteInfo.last_name}: ${inviteInfo.number_of_invites}`}</p>
                                        </div>
                                    </div>
                                </div>
                                <IonButton onClick={() => downloadInvitation()}>Descargar Invitacion</IonButton>
                                <img id='test' alt="" />
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
                            {/* Just for downloading */}
                                <div className='invitationForDownload'>
                                    <div id="invitationTemplate">
                                        <div id="invitationTemplateMobile" className="inv-container-theming inv-container mobileToPrint">
                                            <div className="inv-logo-container">
                                                <img src="assets/img/inv-logo.png" alt="Logo de boda" />
                                            </div>
                                            <div className="inv-inv1-container">
                                                <img src="assets/img/inv-1.png" alt="inv part 1" />
                                            </div>
                                            <div className="inv-inv2-container">
                                                <img src="assets/img/inv-2.png" alt="inv part 2" />
                                            </div>
                                            <div>
                                                <p className='inv-invite-detail-with-number-of-invites'>{`${inviteInfo.name} ${inviteInfo.last_name}: ${inviteInfo.number_of_invites}`}</p>
                                            </div>
                                            <div className="inv-qr-code-container qrToDownload">
                                                <img src={QRForInvite} alt="QR Code Invite" />
                                            </div>
                                        </div>
                                        <div id='invitationTemplateDesktop' className="inv-container-theming inv-container-desktop deskToPrint">
                                            <div className="inv-container-p1">
                                                <div className="inv-logo-container">
                                                    <img src="assets/img/inv-logo.png" alt="Logo de boda" />
                                                </div>
                                                <div className="inv-qr-code-container qrToDownload">
                                                    <img src={QRForInvite} alt="QR Code Invite" />
                                                </div>
                                            </div>
                                            <div className="inv-container-p2">
                                                <div className="inv-inv1-container">
                                                    <img src="assets/img/inv-1.png" alt="Inv part 1" />
                                                </div>
                                                <div className="inv-inv2-container">
                                                    <img src="assets/img/inv-2.png" alt="Inv part 2" />
                                                </div>
                                                <p className='inv-invite-detail-with-number-of-invites text-center'>{`${inviteInfo.name} ${inviteInfo.last_name}: ${inviteInfo.number_of_invites}`}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            {/* Just for downloading */}

                        </>)
                        :
                        (<></>)
                    }

                </IonContent>
            </IonPage>
        </>
    )
}


