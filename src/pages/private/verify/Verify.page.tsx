import { FC, useEffect, useState } from "react";

import { IonPage, IonContent, IonButton, IonItem, IonLabel, IonInput, IonIcon, IonCard} from '@ionic/react';
import { Header } from "../../../components/header/Header";

import './Verify.page.scss'
import { BarcodeScanner } from "../../../components/scanner/scanner.component";
import { checkInInvite, getInviteById } from "../../../services/http/invites.service";
import { IInvite } from "../../../models/invites.model";
import { qrCode } from "ionicons/icons";
import { useSelector } from "react-redux";


export const VerifyPage: FC = () => {

    const routing = useSelector<{Routing: string}, string>(state => state.Routing)

    const [activateScanner, setScannerStatus] = useState<boolean>(false);
    const [verifyInvite, setVerifyInvite] = useState<IInvite>();
    const [verifyState, setVerifyState] = useState<'CAN-VERIFY-INVITE' | 'INVITE-FOUND' | 'INVITE-NOT-FOUND'>('CAN-VERIFY-INVITE');

    const verifyInviteFunc = async (id: string) => {
        setScannerStatus(false);
        beepSound();
        const response = await getInviteById(id);
        if(response?.exists) {
            const invite: IInvite = response.data() as IInvite;
            (invite.is_checkin) ? invite.is_checkin_text = 'SI':  invite.is_checkin_text = 'NO';
            setVerifyInvite(invite);
            setVerifyState('INVITE-FOUND');
        } else {
            // not found
            setVerifyState('INVITE-NOT-FOUND');
        }
        setTimeout(()=> {
            setScannerStatus(true);
        }, 2000);
    }

    useEffect(()=> {
        if(routing !== 'verify') {
            setScannerStatus(false);
        }

    }, [routing])

    useOnPageHidden((pageStatus: boolean) => setScannerStatus(pageStatus))

    return(
        <>
            <IonPage>
                <Header headerTitle="Verificación de invitados" />
                <IonContent fullscreen>
                    <div className="verify-main">
                        <IonCard>
                            <div className="verify-main-container">
                                <div className="verify-invite-data">
                                    {!!verifyInvite && verifyState === "INVITE-FOUND" ? 
                                    <>
                                        <InviteInfoDataComponent emitCheckIn={(checkIn: boolean) => setVerifyState('CAN-VERIFY-INVITE') } invite={verifyInvite}/>
                                    </>
                                    : (verifyState === 'CAN-VERIFY-INVITE')? 
                                    <>
                                        <InviteFirstState/>
                                    </> 
                                    : 
                                    <>
                                        <InviteNotFound/>
                                    </>
                                    }
                                </div>
                                <div className="verify-line"></div>
                                <div className="verify-qr-container">
                                    {
                                        activateScanner ? <>
                                            <div className="qr-container">
                                                <BarcodeScanner emitBarcodeResult={(result: any) => verifyInviteFunc(result)}  start={activateScanner}/>
                                                <span className="text-center">Pasa el codigo QR para validar invitacion</span>
                                            </div>
                                        </>
                                        : <>
                                            <div className="qr-off-container">
                                                <h3>Encender scanner</h3>
                                                <IonIcon icon={qrCode} ></IonIcon>
                                                <IonButton onClick={() => setScannerStatus(true)} color={'light'}>Encender</IonButton>
                                            </div>
                                        </>
                                    }

                                </div>
                            </div>
                        </IonCard>

                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}

const InviteNotFound: FC = () => {
    return(<h2>Invitado no encontrado :(</h2>);
}

const InviteFirstState: FC = () => {
    return(<>
        <div className="very-first-container">
            <h2>Comienze a escanear invitaciones</h2>
            <IonIcon icon={qrCode} ></IonIcon>
        </div>
    </>);
}

export const InviteInfoDataComponent: FC<{invite: IInvite, emitCheckIn: Function}> = (props: {invite: IInvite, emitCheckIn: Function}) => {
    const handleCheckIn = async () => {
        const checkInResponse = await checkInInvite(props?.invite?.id, true);
        if(checkInResponse) {
            props.emitCheckIn(true);
        }
    }

    const cancelCheckIn = () => {
        props.emitCheckIn(false);
    }

    return(<>
        <div className="verify-invite-info-container">
            <h2>Invitado encontrado:</h2>

            <IonItem fill="solid">
                <IonLabel position="floating">Nombre Completo</IonLabel>
                <IonInput value={`${props?.invite.name}${props.invite.last_name}`} disabled placeholder="Nombre del Invitado"></IonInput>
            </IonItem>
            <IonItem fill="solid">
                <IonLabel position="floating">ID</IonLabel>
                <IonInput value={`${props?.invite.id}`} disabled placeholder="ID de invitado"></IonInput>
            </IonItem>
            <IonItem fill="solid">
                <IonLabel position="floating">Check-In | Ha ingresado</IonLabel>
                <IonInput value={`${props?.invite?.is_checkin_text}`} disabled placeholder="Check-In"></IonInput>
            </IonItem>
            <IonItem fill="solid">
                <IonLabel position="floating">Numero de Invitados</IonLabel>
                <IonInput value={`${props?.invite.number_of_invites}`} disabled  type="number" placeholder="Numero de Invitados"></IonInput>
            </IonItem>
            <IonItem fill="solid">
                <IonLabel position="floating">Mesa asignada</IonLabel>
                <IonInput value={1} disabled type="number" placeholder="Numero de Invitados"></IonInput>
            </IonItem>
            {/* Solo si es true */}
            <IonItem fill="solid">
                <IonLabel position="floating">Tipo de pase</IonLabel>
                {props?.invite?.is_just_dance
                    ? <>
                        <IonInput value={'Pase solo para Baile'} disabled placeholder="Tipo de pase"></IonInput>
                    </>
                    : <>
                        <IonInput value={'Pase completo'} disabled placeholder="Tipo de pase"></IonInput>
                    </>
                }
            </IonItem>
            <div>
                <IonButton color={'danger'} onClick={() => cancelCheckIn()}>Cancelar</IonButton>
                <IonButton color={'primary'} onClick={() => handleCheckIn()}>Check In</IonButton>
            </div>
        </div>
    </>)
}


const beepSound = () => {
    /*if you want to beep without using a wave file*/
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 800;
    oscillator.connect(context.destination);
    oscillator.start(); 
    // Beep for 500 milliseconds
    setTimeout(function () {
        oscillator.stop();
        oscillator.disconnect()           
    }, 100);     
}


enum DismissalEvents {
    VisibilityChange = 'visibilitychange',
    PageHide = 'pagehide',
}

const useOnPageHidden = (sideEffectCb: Function) => {
    useEffect(() => {
        let terminatingEventSent = false;

        const onHideHandler = ({ type }: Event) => {
            if (!!terminatingEventSent) {
                return;
            }

            if(type === 'pagehide') {
                terminatingEventSent = true;
                sideEffectCb(false);
            }

            if (type === 'visibilitychange' &&
                document.visibilityState === 'hidden'
            ) {
                console.log('come soon')
                sideEffectCb(false);
            }

            if (type === 'visibilitychange' &&
                document.visibilityState === 'visible'
            ) {
                console.log('wellcome back')
                sideEffectCb(true);
            }
        };

        document.addEventListener('visibilitychange', onHideHandler);
        window.addEventListener('pagehide', onHideHandler);

        return () => {
            document.removeEventListener('visibilitychange', onHideHandler);
            window.removeEventListener('pagehide', onHideHandler);
        };
    }, [sideEffectCb]);
};