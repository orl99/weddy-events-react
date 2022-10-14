import { IonTitle, IonLabel, IonItem} from '@ionic/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IInvite } from '../../models/invites.model';
import { IInvitesState } from '../../redux/Invite.slice';
import { qrCodeGenerator } from '../../services/qr-code-generator.service';


export const InviteInfoComponent: FC = () => {
    // Inner state
    const [qrCodeImg, setQrCodeImg] = useState<string>();
    const [currentInvite, setCurrentInvite] = useState<IInvite | null>();
    const currentInviteInfo = useSelector<IInvitesState, IInvite | null>( (state) => state.currentInviteInfo)
    setCurrentInvite(currentInviteInfo);

    useCallback(async () => {
        if(!!currentInvite) {
            const generatedQRcode = await qrCodeGenerator(currentInvite.id);
            if(!!generatedQRcode) {
                setQrCodeImg(generatedQRcode);
            }
        }

    }, [currentInvite]);

    //
    return (
        <>
            <div className="invites-info-container">
                <IonTitle>
                    {currentInvite?.name + ' '} {currentInvite?.last_name}
                </IonTitle>
                <div className="invites-info-details">
                    <IonItem>
                        <IonLabel>{currentInvite?.phone_number}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>{currentInvite?.number_of_invites}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>{currentInvite?.email}</IonLabel>
                    </IonItem>
                    <IonItem>
                        {qrCodeImg? (<img src={qrCodeImg} alt="" />) : (<></>)}
                    </IonItem>
                </div>
            </div>
        </>
    )
}