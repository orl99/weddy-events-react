/* eslint-disable jsx-a11y/iframe-has-title */
import { IonContent, IonPage, IonSelect, IonSelectOption, IonButton, IonLabel, IonItem, useIonToast } from '@ionic/react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import { IInvite } from '../../../models/invites.model';
import { confirmInvite, getInviteById } from '../../../services/http/invites.service';
import { qrCodeGenerator } from '../../../services/qr-code-generator.service';
import './Invitation.page.scss'
import domtoimage from 'dom-to-image';
import { StaticContext } from 'react-router';

export const InvitationPage: FC<RouteComponentProps<{ uuid: string }, StaticContext, unknown>> = (props) => {
    // Form hook
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<{ invitation_confirm: boolean }>();

    const [uuidToken, setToken] = useState<string>('');
    const [inviteInfo, setInviteInfo] = useState<IInvite | null>(null);
    const [inviteStatus, setInviteStatus] = useState<'loading' | 'inviteGet' | 'notFound'>('loading');
    const [QRForInvite, setQRForInvite] = useState<string>();
    const [isWebKitIos, setIsWebKitIos] = useState<boolean>(true);
    const [changeConfirm, setChangeConfirm] = useState(true);


    useEffect(() => {
        // Check if the browser is in webkit or not
        isWebKitFunc();
        // get invite from token id
        const getInvite = async (uuid: string) => {
            try {
                console.log('getInviteById')
                const response = await getInviteById(uuid);
                if (response?.exists()) {
                    const invite = response.data() as IInvite;
                    setInviteInfo(invite);
                    setInviteStatus('inviteGet');
                    const qrCodeImg = await qrCodeGenerator(invite.id);
                    if (qrCodeImg) {
                        setQRForInvite(qrCodeImg);
                    }
                    setValue('invitation_confirm', (invite.is_confirmed) ? invite.is_confirmed : false);
                } else {
                    // invitacion no encontrada
                    setToken('');
                    setInviteInfo(null);
                    setInviteStatus('notFound');
                }
            } catch (error) {
                setToken('');
                setInviteInfo(null);
                setInviteStatus('notFound');
                alert('Hubo un error al tratar de obtener tu invitacion, puede que no estes conectado a internet o otro problema, comunicate con los novios para ver una solucion')
            }
        };

        if (props && !!props?.match?.params.uuid) {
            const token = props?.match?.params.uuid;
            console.log('uuidToken', token);
            getInvite(token);
            setToken(token);
        }
    }, [setToken, props]);

    const handleInvitationForm = handleSubmit(async (formData) => {
        if (!!formData) {
            const confirmation = await confirmInvite(uuidToken, formData.invitation_confirm);
            if (confirmation) {
                setChangeConfirm(false);
            }
        }
    });

    const downloadInvitation = async () => {
        const invitationNode = document.getElementById('invitationTemplate');
        try {
            const dataUrl = await domtoimage.toJpeg(invitationNode as HTMLElement, { quality: 1.0 });
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `Invitacion para ${inviteInfo?.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            // in case of a network error or an error
            alert('Hubo un problema al descargar tu invitación :(, por favor, toma una captura de pantalla a la invitación o lleva tu celular con esta invitación virtual, o puedes comunicarte con los novios');
        }
    }

    const isWebKitFunc = () => {
        try {
            ('GestureEvent' in window) ? setIsWebKitIos(true) : setIsWebKitIos(false);
        } catch (error) {
            setIsWebKitIos(true);
        }
    }

    return (
        inviteStatus === 'loading' ?
            <LoadingComponent />
            : (inviteStatus === 'notFound') ?
                (<NotFoundComponent />)
                :
                (
                    <>
                        <IonPage>
                            <IonContent>
                                <div className="header">
                                    Alondra & Orlando
                                </div>
                                <div className='inv-page'>
                                        <div className="inv-greetings-container">
                                <h1 className='text-center'>Invitacion: {inviteInfo?.name} {inviteInfo?.last_name}</h1>
                                            <p>Nos complace mucho tenerte como una de nuestros Invitados para nuestra proxima boda</p>
                                            <p>Aqui tienes mas datos de la boda y la Invitacion virtual</p>
                                        </div>
                                    <div className="inv-border-desktop">
                                        <div className="inv-main-container">
                                            <h2 className='text-center'>Tu invitacion virtual</h2>
                                            <div>
                                                {/* For mobile */}
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
                                                        <p className='inv-invite-detail-with-number-of-invites'>{`${inviteInfo?.name} ${inviteInfo?.last_name}: Invitados (${inviteInfo?.number_of_invites})`}</p>
                                                    </div>
                                                    <div className="inv-qr-code-container">
                                                        <img src={QRForInvite} alt="QR Code Invite" />
                                                    </div>
                                                </div>
                                                {/* For mobile */}

                                                {/* For desktop */}
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
                                                            <img src="assets/img/inv-1.png" alt="QR Code Invite" crossOrigin='anonymous' />
                                                        </div>
                                                        <div className="inv-inv2-container">
                                                            <img src="assets/img/inv-2.png" alt="QR Code Invite" crossOrigin='anonymous' />
                                                        </div>
                                                        <p className='inv-invite-detail-with-number-of-invites text-center'>{`${inviteInfo?.name} ${inviteInfo?.last_name}: Invitados (${inviteInfo?.number_of_invites})`}</p>
                                                    </div>
                                                </div>
                                                {/* For desktop */}
                                            </div>
                                            {
                                                (!isWebKitIos) ?
                                                    (
                                                        <IonButton className='inv-download-btn inv-btn' onClick={() => downloadInvitation()}>Descargar Invitacion</IonButton>
                                                    )
                                                    :
                                                    (<div className='inv-confirm-form-message-container'>
                                                        <span className='text-center'>Tomale una captura 📸  Al QR y invitacion o muestra esta invitacion virtual en la entrada de la boda</span>
                                                    </div>)
                                            }

                                            <DividerComponent/>

                                            <div className="inv-confirm-container">
                                                <h2 className='text-center'>Confirmación</h2>
                                                <p className='text-center'>Para nosotros es muy importante que confirmes tu asistencia, ¿Podrias confirmar?🙏</p>
                                                <form className='inv-form-container' onSubmit={(event) => handleInvitationForm(event)}>
                                                    {!changeConfirm ?
                                                        <div className="inv-confirm-form-message-container">
                                                            <p className='text-center'>Gracias por confirmar tu asistencia, si gustas cambiar tu confirmacion solo selecciona de nuevo una opcion :)</p>
                                                            <div className="inv-change-confirmation">
                                                                <IonButton className='inv-btn' onClick={() => setChangeConfirm(true)} >Cambiar confirmacion</IonButton>
                                                            </div>
                                                        </div>
                                                        : <>
                                                            <IonItem className='inv-select-item' fill='outline'>
                                                                <IonLabel>Seleccione su opción</IonLabel>
                                                                <IonSelect onIonChange={(e) => setValue('invitation_confirm', e.detail.value)} {...register('invitation_confirm')} name="inv_confirm" id="inv_confirm">
                                                                    <IonSelectOption value={true}>
                                                                        Si :D
                                                                    </IonSelectOption>
                                                                    <IonSelectOption value={false}>
                                                                        No :(
                                                                    </IonSelectOption>
                                                                </IonSelect>
                                                            </IonItem>
                                                            <IonButton className='inv-btn' type='submit'>
                                                                Enviar mi respuesta
                                                            </IonButton>
                                                        </>
                                                    }
                                                </form>
                                            </div>
                                            <DividerComponent/>
                                            <div className="inv-map-container">
                                                <h2 className='text-center'>Ubicación 📍</h2>
                                                <p className='text-center'>Calle Vankvy, Sinaloa 145, Victoria, 87390 Heroica Matamoros, Tamps.</p>
                                                <iframe 
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d961.9136021903936!2d-97.5129686275559!3d25.839716162272808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866feb13cae5c4bf%3A0x7e5d71d95bea8da1!2sVankvy!5e0!3m2!1sen!2smx!4v1666295057445!5m2!1sen!2smx" 
                                                    // width="600"
                                                    // height="450"
                                                    className='inv-map'
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                                            </div>
                                            <DividerComponent/>
                                            <DonationComponent/>
                                        </div>
                                    </div>
                                    
                                <div className="inv-footer">
                                    <p className='text-center'>Hecho con mucho amor por Orlando y Alondra 💗 Para ustedes 🫶</p>
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
                                                    <p className='inv-invite-detail-with-number-of-invites'>{`${inviteInfo?.name} ${inviteInfo?.last_name}: Invitados(${inviteInfo?.number_of_invites})`}</p>
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
                                                    <p className='inv-invite-detail-with-number-of-invites text-center'>{`${inviteInfo?.name} ${inviteInfo?.last_name}: Invitados(${inviteInfo?.number_of_invites})`}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* Just for downloading */}
                                </div>
                            </IonContent>
                        </IonPage>
                    </>
                )
    )

}

const DonationComponent: FC = () => {
    const [present] = useIonToast();

    const copyToClipboard = async (textToCopy: string) => {
        await navigator.clipboard.writeText(textToCopy);
        await present({
            message: 'Copiado!',
            duration: 1500,
            position: 'bottom'
        });
    }

    return (
        <>
            <div className="donate-main-container">
                <h2 className='text-center'>Donaciones 🫶</h2>
                <p className='text-center donate-message'>Estamos muy emocionados de verte pronto en nuestra boda, la hemos organizado con mucho amor y dedicación, pero si gustas aportar, lo agradeceriamos muchisimo, puedes hacerlo voluntariamente mediante PayPal o con transferencia electronica</p>
                <div className="donate-concep-container">
                    <div className="donate-in-paypal-container">
                        <IonButton className='donate-paypal-btn'>
                            <a target="_blank" href="https://paypal.me/orl99?country.x=MX&locale.x=es_XC"> 
                            <span>Donar en </span>
                            <img src={paypalSvgLogo} alt="PayPal" />
                            </a>
                        </IonButton>
                    </div>
                    <div className="donate-line"></div>
                    <div className="donate-transfer">
                        <div className="donate-item">
                            <h5>Datos bancarios</h5>
                        </div>
                        <div className="donate-item" onClick={() => copyToClipboard('036818500638889621')}>
                            <span>CLABE Interbancaria:</span> <span> 036818500638889621</span> <img src="assets/img/copy.png" alt="" />
                        </div>
                        <div className="donate-item" onClick={() => copyToClipboard('Orlando Emmanuel Garcia')}>
                            <span>Beneficiario:</span> <span> Orlando Emmmanuel Garcia</span>  <img src="assets/img/copy.png" alt="" />
                        </div>
                        <div className="donate-item" onClick={() => copyToClipboard('Donación para Boda')}>
                            <span>Concepto: </span> <span> Donación para Boda</span> <img src="assets/img/copy.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


const LoadingComponent: FC = () => {
    return (
        <>
            <div className="inv-not-found">
                <h3 className='text-center'>
                    ... Estamos obteniedo tu invitacion 💌 ✨
                </h3>
            </div>
        </>
    )
}

const NotFoundComponent: FC = () => {
    return (
        <>
            <div className="inv-not-found">
                <h3 className='text-center'>
                    Vaya, esta invitacion no es valida o expiro, por favor contacta a los novios para obtener tu invitacion virtual
                </h3>
            </div>
        </>
    )
}

const DividerComponent: FC = () => <div className="inv-divider"></div>

const paypalSvgLogo = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4';