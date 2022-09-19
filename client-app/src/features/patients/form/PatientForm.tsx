import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Patient } from '../../../app/models/patient';

interface Props{
    patient: Patient | undefined;
    closeForm: () => void;
    createOrEdit: (patient: Patient) => void;
}

export default function PatientForm({patient: selectedPatient, closeForm, createOrEdit} : Props)
{
    const initialState = selectedPatient ? selectedPatient : {
        id: '',
        nome: '',
        dataNascimento: '',
        cpf: '',
        sexo: '',
        endereco: '',
        status: ''
    }

    const [patient, setPatient] = useState(initialState);

    function handleSubmit() {
        createOrEdit(patient);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setPatient({...patient, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Nome' value={patient.nome} name='nome' onChange={handleInputChange}/>
                <Form.Input placeholder='Data de Nascimento' value={patient.dataNascimento} name='nascimento' onChange={handleInputChange}/>
                <Form.Input placeholder='CPF' value={patient.cpf} name='cpf' onChange={handleInputChange}/>
                <Form.Input placeholder='Sexo' value={patient.sexo} name='sexo' onChange={handleInputChange}/>
                <Form.Input placeholder='Endereco' value={patient.endereco} name='endereco' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>    
            </Form>
        </Segment>
    )
}