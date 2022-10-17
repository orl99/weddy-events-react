import { forwardRef } from 'react'
import { IInvite } from '../../models/invites.model';
export const InvitationTemplateComponent = forwardRef<HTMLDivElement, {inviteInfo: IInvite, QRForInvite: string}>(({inviteInfo, QRForInvite}, ref) => {

    return (
        <div ref={ref}>
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
                    <p className="inv-invite-detail-with-number-of-invites">{`${inviteInfo.name} ${inviteInfo.last_name}: ${inviteInfo.number_of_invites}`}</p>
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
                    <p className="inv-invite-detail-with-number-of-invites text-center">{`${inviteInfo.name} ${inviteInfo.last_name}: ${inviteInfo.number_of_invites}`}</p>
                </div>
            </div>
        </div>
    );
});
