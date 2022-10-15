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
                            <IonTitle>
                                {currentInviteInfo?.name + ' '} {currentInviteInfo?.last_name}
                            </IonTitle>
                            <div className="invites-info-details">
                                <IonItem>
                                    <IonLabel>{currentInviteInfo?.phone_number}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>{currentInviteInfo?.number_of_invites}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>{currentInviteInfo?.email}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    {qrCodeImg? (<img src={qrCodeImg} alt="" />) : (<></>)}
                                </IonItem>
                            </div>
                        </div>
                    </>
                )
            : (<></>)
        }
        </>
    )
}