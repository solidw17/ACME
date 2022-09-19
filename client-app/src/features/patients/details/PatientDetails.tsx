import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Patient } from '../../../app/models/patient'

interface Props{
    patient: Patient
    cancelSelectPatient: () => void;
    openForm: (id: string) => void;
}

export default function PatientDetails({patient, cancelSelectPatient, openForm}: Props){
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{patient.nome}</Card.Header>
                <Card.Meta>
                    <span>{patient.dataNascimento}</span>
                </Card.Meta>
                <Card.Description>
                    <div>{patient.cpf.substring(0, 3) + '.' + patient.cpf.substring(3, 6) + '.' + patient.cpf.substring(6, 9) + '-' + patient.cpf.substring(9, 11)}</div>
                    <div>{patient.sexo}</div>
                    <div>{patient.endereco}</div>
                    <div>{patient.status ? 'ATIVO' : 'INATIVO'}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic onClick={() => openForm(patient.id)} color='blue' content='Edit'/>
                    <Button basic onClick={cancelSelectPatient} color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}