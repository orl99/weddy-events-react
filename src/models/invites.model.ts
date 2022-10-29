export interface IInvite {
    email: string;
    is_checkin?: boolean;
    is_checkin_text?: string;
    is_confirmed?: boolean;
    is_family?: boolean;
    last_name: string;
    name: string;
    number_of_invites: number;
    phone_number: string;
    id: string;
    is_just_dance?: boolean;
    table_number?: number;
}
export interface IInviteForm {
    email: string;
    is_checkin?: boolean;
    is_checkin_text?: string;
    is_confirmed?: boolean;
    is_family?: boolean;
    last_name: string;
    name: string;
    number_of_invites: number;
    phone_number: string;
    is_just_dance?: boolean;
    table_number?: number;
}