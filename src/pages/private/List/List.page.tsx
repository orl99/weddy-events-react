import { IonButton, useIonAlert, IonCard, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage } from "@ionic/react";
import { FC, useEffect, useState } from "react";
import { Header } from "../../../components/header/Header";
import { IInvite } from "../../../models/invites.model";
import { checkInInvite, getInvites } from "../../../services/http/invites.service";
import { checkmarkOutline, banOutline, idCardOutline } from "ionicons/icons"
import './List.page.scss'

// Material table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

    const [presentAlert] = useIonAlert();

    const handleCheckIn = async (id: string) => {
        await checkInInvite(id, true);
    }

    return(<>
        <div className="list-invites-list-container">
            <IonCard mode="ios" className="">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="left">Invitados</TableCell>
                            <TableCell align="left">Mesa</TableCell>
                            <TableCell align="left">Confirmado?</TableCell>
                            <TableCell align="left">CheckIn?</TableCell>
                            <TableCell align="left">Invitacion Virtual</TableCell>
                            <TableCell align="left">CheckIn Invitado</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.invitesLits.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {`${row.name} ${row.last_name}`}
                                </TableCell>
                                <TableCell align="left">{row.number_of_invites}</TableCell>
                                <TableCell align="left">{row?.table_number}</TableCell>
                                <TableCell align="left">
                                    {row.is_confirmed ?
                                        <IonIcon class="list-icon" slot="end" icon={checkmarkOutline} />
                                        :  <IonIcon class="list-icon" slot="end" icon={banOutline} />
                                    }
                                </TableCell>
                                <TableCell align="left">
                                    {row.is_checkin ?
                                        <IonIcon class="list-icon" slot="end" icon={checkmarkOutline} />
                                        :  <IonIcon class="list-icon" slot="end" icon={banOutline} />
                                    }
                                </TableCell>
                                <TableCell align="left">
                                    <a href={'https://wedy-tickets.web.app/invitation/' + row.id} target={'_blank'}>
                                        <IonIcon class="list-icon" slot="end" icon={idCardOutline} />
                                    </a>
                                </TableCell>
                                <TableCell align="left">
                                    <IonButton onClick={() => presentAlert({
                                                                header: `Check-In`,
                                                                message:  `Realizar Check-In a: ${row.name} ${row.last_name}`,
                                                                buttons: [
                                                                    {
                                                                        text: 'Cancelar',
                                                                        role: 'cancel',
                                                                    },
                                                                    {
                                                                        text: 'Confirmar',
                                                                        role: 'confirm',
                                                                        handler: () => {
                                                                            handleCheckIn(row.id);
                                                                        },
                                                                    },
                                                                ],
                                                            })}>Check-In</IonButton>
                                </TableCell>

                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </IonCard>
        </div>
    </>)
}