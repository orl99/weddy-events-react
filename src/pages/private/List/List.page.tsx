import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage } from "@ionic/react";
import { FC, useEffect, useState } from "react";
import { Header } from "../../../components/header/Header";
import { IInvite } from "../../../models/invites.model";
import { getInvites } from "../../../services/http/invites.service";
import { checkmarkOutline, banOutline } from "ionicons/icons"
import './List.page.scss'
interface InviteList  {
    invitesLits: IInvite[]
}
export const ListPage: FC = () => {
    const [inviteList, setInviteList] = useState<IInvite[]>();
    useEffect(()=> {
        const getAllInvites = async () => {
            const response =  await getInvites();
            if (!response?.empty && !!response) {
                const invites: IInvite[] = response.docs.map(doc => doc.data() as IInvite);
                setInviteList([...invites]);
            }
            return response;
        }
        getAllInvites();
    })

    return (
        <>
            <IonPage>
                <IonContent fullscreen>
                    <Header headerTitle="Lista de Invitados"></Header>
                    <div className="list-main-container">
                        {inviteList?
                            <ListInvitesView invitesLits={inviteList}/>
                            :
                            <></>
                        }

                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}


export const ListInvitesView: FC<InviteList> = (props: InviteList) => {

    return(<>
        <div className="list-invites-list-container">
            <IonList>
                <div className="list-list-header">
                    <h1 >Lista de invitados</h1>
                    <IonLabel className="list-list-header-item">Confirmado?</IonLabel>
                    <IonLabel className="list-list-header-item">CheckIn?</IonLabel>
                </div>
                {
                    props.invitesLits.map((invite) => (
                        <IonItem key={invite.id}>
                            <IonLabel>{invite.name} {invite.last_name}</IonLabel>
                            {invite.is_confirmed ?
                                <IonIcon class="list-icon" slot="end" icon={checkmarkOutline} />
                                :  <IonIcon class="list-icon" slot="end" icon={banOutline} />
                            }
                            {invite.is_checkin ?
                                <IonIcon class="list-icon" slot="end" icon={checkmarkOutline} />
                                :  <IonIcon class="list-icon" slot="end" icon={banOutline} />
                            }
                        </IonItem>
                    ))
                }
            </IonList>
        </div>
    </>)
}