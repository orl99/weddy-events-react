import { IonTitle, IonLabel, IonItem} from '@ionic/react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { IInvite } from '../../models/invites.model';
import { IInvitesState } from '../../redux/Invite.slice';
import { qrCodeGenerator } from '../../services/qr-code-generator.service';
import './Invites-info.scss';




export const InviteInfoComponent: FC = () => {
    // Inner state
    const [qrCodeImg, setQrCodeImg] = useState<string>();
    const generateQRCallBack = async (invite: IInvite | null) => {
        if(!!invite) {
            const generatedQRcode = await qrCodeGenerator(invite.id);
            console.log('generatedQRcode', generatedQRcode);
    
            if(!!generatedQRcode) {
                setQrCodeImg(generatedQRcode);
            }
        }
    }
    const currentInviteInfo = useSelector<{Invites: IInvitesState}, IInvite | null>( (state) => {
        if(!!state.Invites.currentInviteInfo) {
            generateQRCallBack(state.Invites.currentInviteInfo);
        }
        return state.Invites.currentInviteInfo;
    })

    //
    return (
        <>
        {currentInviteInfo ?
                (
                    <>
                        <div className="invites-info-container">
                            <IonTitle color={'dark'}>
                                Datos del Invitado
                            </IonTitle>
                            <div className="invites-info-details">
                                <IonItem lines='none'>
                                    <IonLabel>
                                        <span className='invites-info-item-title'>Nombre: </span>
                                        <span className='invites-info-item-description'>
                                            {currentInviteInfo?.name + ' '} {currentInviteInfo?.last_name}
                                        </span>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines='none'>
                                    <IonLabel>
                                        <span className='invites-info-item-title'>Telefono: </span>
                                        <span className='invites-info-item-description'>
                                            {currentInviteInfo?.phone_number}
                                        </span>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines='none'>
                                    <IonLabel>
                                        <span className='invites-info-item-title'>Numero de Invitados: </span>
                                        <span className='invites-info-item-description'>
                                            {currentInviteInfo?.number_of_invites}
                                        </span>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines='none'>
                                    <IonLabel>
                                        <span className='invites-info-item-title'>Email: </span>
                                        <span className='invites-info-item-description'>
                                            {currentInviteInfo?.email}
                                        </span>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines='none'>
                                    <IonLabel>
                                        <span className='invites-info-item-title'>Es Familia: </span>
                                        <span className='invites-info-item-description'>
                                            {currentInviteInfo?.is_family ?
                                            (<>Si</>) 
                                            : 
                                            (<> No</>)   
                                        }
                                        </span>
                                    </IonLabel>
                                </IonItem>
                                <IonItem lines='none'>
                                    <IonLabel className='invites-info-item-title text-center'>Codigo QR del Invitado (Fast Enter)</IonLabel>
                                </IonItem>
                                <div className="qr-code-img-container">
                                    {qrCodeImg? (<img src={qrCodeImg} alt="" />) : (<></>)}
                                </div>
                            </div>
                        </div>
                    </>
                )
            : (<></>)
        }
        </>
    )
}