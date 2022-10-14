export interface IInvite {
    email: string;
    is_checkin?: boolean;
    is_confirmed?: boolean;
    is_family?: boolean;
    last_name: string;
    name: string;
    number_of_invites: number;
    phone_number: string;
    id: string;
}
export interface IInviteForm {
    email: string;
    is_checkin?: boolean;
    is_confirmed?: boolean;
    is_family?: boolean;
    last_name: string;
    name: string;
    number_of_invites: number;
    phone_number: string;
}