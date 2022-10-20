import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react"
import { triangle, ellipse, square } from "ionicons/icons"
import { Route, Redirect } from "react-router"
import { LoginPage } from "../public/auth/Login"
import { DashboardPage } from "./dashboard/Dashboard"
import { InvitesPage } from "./invites/Invites"
import { VerifyPage } from "./verify/Verify"

export const PrivatePage = () => {
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
                    <Route exact path="/">
                        <Redirect to="/private/dashboard" />
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="dashboard" href="/private/dashboard">
                        <IonIcon icon={triangle} />
                        <IonLabel>Dashboard</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="verify" href="/private/verify">
                        <IonIcon icon={ellipse} />
                        <IonLabel>Verify</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="invites" href="/private/invites">
                        <IonIcon icon={square} />
                        <IonLabel>Invites</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </>
    )
}