import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Patient } from '../models/patient';
import NavBar from './NavBar';
import PatientDashboard from '../../features/patients/dashboard/PatientDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const[patients, setPatients] = useState<Patient[]>([]);
  const[selectedPatient, setSelectedPatient] = useState<Patient | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Patient[]>('http://localhost:5000/api/patients').then(response => {
      setPatients(response.data);
    })
  }, [])

  function handleSelectPatient(id: string){
    setSelectedPatient(patients.find(x => x.id === id))
  }

  function handleCancelSelectPatient(){
    setSelectedPatient(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectPatient(id) : handleCancelSelectPatient();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditPatient(patient: Patient){
    patient.id ? setPatients([...patients.filter(x => x.id !== patient.id), patient]) : setPatients([...patients, {...patient, id: uuid()}]);
    setEditMode(false);
    setSelectedPatient(patient);
  }

  function handleDeletePatient(id: string){
    setPatients([...patients.filter(x => x.id !== id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
          <PatientDashboard 
            patients={patients}
            selectedPatient={selectedPatient}
            selectPatient={handleSelectPatient}
            cancelSelectPatient={handleCancelSelectPatient}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditPatient}
            deletePatient={handleDeletePatient}
          />
      </Container>
    </>
  );
}

export default App;
