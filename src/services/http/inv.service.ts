import axios from 'axios';
// const endPoint = 'http://localhost:3005'
// const endPoint = 'https://wedy-api.herokuapp.com'
const endPoint = 'https://us-central1-wedy-tickets.cloudfunctions.net/api'
// const endPoint = 'http://localhost:5000/wedy-tickets/us-central1/api'
export const renderInvitationToImg = async (invitationHTML: string, width: number, height: number) => {
    try {
        console.log('wid', {
            width,
            height
        })
        const invitationToImg = await axios.post(`${endPoint}/invitation/renderInvitationToImg`, {
            invitationHTML,
            width,
            height
        });
        return invitationToImg.data;
    } catch (error) {
        console.error('error', error);
        return null;
    }
}