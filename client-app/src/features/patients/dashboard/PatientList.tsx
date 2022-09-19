import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';

interface Props{
    patients: Patient[];
    selectPatient: (id: string) => void;
    deletePatient: (id: string) => void;
    submitting: boolean;
}

export default function PatientList({patients, selectPatient, deletePatient, submitting}: Props){
    const[target, setTarget] = useState('');

    function handlePatientDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePatient(id);
    }

    function handleSort(){
        const sortedData = [...patients].sort((a,b) => {
            return a.nome > b.nome ? 1 : -1
        })
    }

    return (
        <Segment>
            <Item.Group divided>
                {patients.map(patient => (
                    <Item key={patient.id}>
                        <Item.Content>
                            <Item.Header as='a'>{patient.nome}</Item.Header>
                            <Item.Meta>{patient.dataNascimento.split('T')[0]}</Item.Meta>
                            <Item.Description>
                                <div>{patient.cpf.substring(0, 3) + '.' + patient.cpf.substring(3, 6) + '.' + patient.cpf.substring(6, 9) + '-' + patient.cpf.substring(9, 11)}</div>
                                <div>{patient.status ? 'ATIVO' : 'INATIVO'}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectPatient(patient.id)} floated='right' content='View' color='blue'/>
                                {patient.status ? <Button name={patient.id} loading={submitting && target === patient.id} onClick={(e) => handlePatientDelete(e, patient.id)} floated='right' content='Delete' color='red'/> : ''}
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}