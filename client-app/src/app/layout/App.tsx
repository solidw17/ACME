import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Patient } from '../models/patient';
import NavBar from './NavBar';
import PatientDashboard from '../../features/patients/dashboard/PatientDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const[patients, setPatients] = useState<Patient[]>([]);
  const[selectedPatient, setSelectedPatient] = useState<Patient | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);
  const[loading, setLoading] = useState(true);
  const[submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Patients.list().then(response => {
      let patients: Patient[] = [];
      response.forEach(patient =>{
        patient.dataNascimento = patient.dataNascimento.split('T')[0];
        patients.push(patient);
      })
      setPatients(patients);
      setLoading(false);
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
    setSubmitting(true);
    if(patient.id){
      agent.Patients.update(patient).then(() => {
        setPatients([...patients.filter(x => x.id !== patient.id), patient]);
        setSelectedPatient(patient);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      patient.id = uuid();
      agent.Patients.create(patient).then(() => {
        setPatients([...patients, patient])
        setSelectedPatient(patient);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeletePatient(id: string){
    setSubmitting(true);
    agent.Patients.delete(id).then(() => {
      setPatients([...patients.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  if(loading) return <LoadingComponent content='Loading app'/>

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
            submitting={submitting}
          />
      </Container>
    </>
  );
}

export default App;
