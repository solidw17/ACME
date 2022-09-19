import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { Patient } from '../../../app/models/patient';
import PatientDetails from '../details/PatientDetails';
import PatientForm from '../form/PatientForm';
import PatientList from './PatientList';

interface Props{
    patients: Patient[];
    selectedPatient: Patient | undefined;
    selectPatient: (id: string) => void;
    cancelSelectPatient: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (patient: Patient) => void;
    deletePatient: (id: string) => void;
}

export default function PatientDashboard({patients, selectedPatient, selectPatient, cancelSelectPatient, editMode, openForm, closeForm, createOrEdit, deletePatient}: Props){
    return (
        <Grid>
            <Grid.Column width='10'>
                <PatientList patients={patients} selectPatient={selectPatient} deletePatient={deletePatient}/>
            </Grid.Column>
            <GridColumn width='6'>
                {selectedPatient && !editMode &&
                <PatientDetails
                 patient={selectedPatient} 
                 cancelSelectPatient={cancelSelectPatient}
                 openForm={openForm}
                 />}
                {editMode &&
                <PatientForm closeForm={closeForm} patient={selectedPatient} createOrEdit={createOrEdit}/>}
            </GridColumn>
        </Grid>
    )
}