import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react"
import { person, home, qrCodeOutline, list } from "ionicons/icons"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Route, Redirect } from "react-router"
import { setSelectedTab } from "../../redux/Routing.slice"
import { LoginPage } from "../public/auth/Login"
import { DashboardPage } from "./dashboard/Dashboard"
import { InvitesPage } from "./invites/Invites"
import { ListPage } from "./List/List.page"
import { VerifyPage } from "./verify/Verify.page"

export const PrivatePage = () => {
    const [activeTab, setActiveTab] = useState('dashboard'); 

    const dispatch = useDispatch();
    const handleTabSelect = (selectedTab: string) => {
        setActiveTab(selectedTab);
        dispatch(setSelectedTab({selectedTab}));
    }
    return (
        <>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/private/dashboard">
                        <DashboardPage />
                    </Route>
                    <Route exact path="/private/login">
                        <LoginPage />
                    </Route>
                    <Route exact path="/private/verify">
                        <VerifyPage />
                    </Route>
                    <Route path="/private/invites">
                        <InvitesPage />
                    </Route>
                    <Route path="/private/list">
                        <ListPage />
                    </Route>
                    <Route exact path="/private">
                        <Redirect to="/private/dashboard" />
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton onClick={()=> handleTabSelect('dashboard')} tab="dashboard" href="/private/dashboard">
                        <IonIcon icon={home} />
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton onClick={()=> handleTabSelect('verify')}  tab="verify" href="/private/verify">
                        <IonIcon icon={qrCodeOutline} />
                        <IonLabel>Verificacion de Entrada</IonLabel>
                    </IonTabButton>
                    <IonTabButton onClick={()=> handleTabSelect('invites')} tab="invites" href="/private/invites">
                        <IonIcon icon={person} />
                        <IonLabel>Registro de Invitados</IonLabel>
                    </IonTabButton>
                    <IonTabButton onClick={()=> handleTabSelect('list')} tab="list" href="/private/list">
                        <IonIcon icon={list} />
                        <IonLabel>Lista</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </>
    )
}