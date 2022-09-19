import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';

interface Props{
    patients: Patient[];
    selectPatient: (id: string) => void;
    deletePatient: (id: string) => void;
}

export default function PatientList({patients, selectPatient, deletePatient}: Props){
    return (
        <Segment>
            <Item.Group divided>
                {patients.map(patient => (
                    <Item key={patient.id}>
                        <Item.Content>
                            <Item.Header as='a'>{patient.nome}</Item.Header>
                            <Item.Meta>{patient.dataNascimento}</Item.Meta>
                            <Item.Description>
                                <div>{patient.cpf.substring(0, 3) + '.' + patient.cpf.substring(3, 6) + '.' + patient.cpf.substring(6, 9) + '-' + patient.cpf.substring(9, 11)}</div>
                                <div>{patient.status ? '    ' : 'INATIVO'}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectPatient(patient.id)} floated='right' content='View' color='blue'/>
                                <Button onClick={() => deletePatient(patient.id)} floated='right' content='Delete' color='red'/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}