import { IonItem, IonInput, IonLabel, IonCheckbox, IonButton } from '@ionic/react';
import { FC } from 'react';
import { useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { IInvite, IInviteForm } from '../../models/invites.model';
import { addCurrentInviteInfo } from '../../redux/Invite.slice';
import { getInviteByPhoneNumber, saveInvite } from './../../services/http/invites.service';

export const AddInviteComponent: FC = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<IInviteForm>();
    const onSubmit =  handleSubmit(async(data) =>  {
        const inviteDTO: IInvite=  {
            name: data.name,
            phone_number: data.phone_number,
            number_of_invites: data.number_of_invites,
            is_checkin: false,
            is_confirmed: false,
            is_family: data.is_family,
            last_name: data.last_name,
            email: data.email,
            id: global.crypto.randomUUID()
        };
        // TODO: Add condition phone number and uuid
        const response = await getInviteByPhoneNumber(inviteDTO.phone_number);
        let possibleInvites: IInvite[] = [];
        if(!response) {
            return;
        }
        response?.forEach((docsFound) => possibleInvites.push(docsFound.data() as IInvite) );
        console.log('response?.empty()', response?.empty,  'possibleInvites', possibleInvites);
        if(response?.empty) {
            console.log('This is a new Invite');
            await saveInvite(inviteDTO);
            dispatch(addCurrentInviteInfo(inviteDTO));
        } else {
            console.log('Invite all ready exists');
        }
    });

    return (
        <>
            <form onSubmit={(event) => onSubmit(event)}>
                <IonItem>
                    <IonLabel>Nombre</IonLabel>
                    <IonInput {...register("name", { required: true })} id='name' type='text' name='name' placeholder='Nombre'></IonInput>
                    {errors.name && errors.name.type === "required" && <span>El nombre completo es requerido</span>}
                </IonItem>
                <IonItem>
                    <IonLabel>Apellidos</IonLabel>
                    <IonInput {...register("last_name", { required: true })} type='text' name='last_name' placeholder='Apellidos'></IonInput>
                    {errors.last_name && errors.last_name.type === "required" && <span>Los apellidos son requeridos</span>}
                </IonItem>
                <IonItem>
                    <IonLabel>Numero de telefono</IonLabel>
                    <IonInput {...register("phone_number")} type='tel' name='phone_number' placeholder='Numero de telefono'></IonInput>
                    {errors.phone_number && errors.phone_number.type === "required" && <span>El numero de telefono es requerido</span>}
                </IonItem>
                <IonItem>
                    <IonLabel>Numero de invitados</IonLabel>
                    <IonInput {...register("number_of_invites")} type='number' name='number_of_invites' placeholder='0'></IonInput>
                    {errors.number_of_invites && errors.number_of_invites.type === "required" && <span>El Numero de invitados es requerido</span>}
                </IonItem>
                <IonItem>
                    <IonLabel>Email</IonLabel>
                    <IonInput {...register("email")} type='email' name='email' placeholder='Email del invitado'></IonInput>
                </IonItem>
                <IonItem>
                    {/* TODO: FIX CHECKBOX */}
                    <IonCheckbox {...register("is_family")} id="is_family" name="is_family" slot="start"></IonCheckbox>
                    <IonLabel>Es Familia?</IonLabel>
                </IonItem>
                <IonButton type='submit'>Guardar</IonButton>
            </form>
        </>
    )
}