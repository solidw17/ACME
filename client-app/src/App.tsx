import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const[patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/patients').then(response => {
      console.log(response);
      setPatients(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='ACME'/>
        <List>
          {patients.map((patient: any) => (
              <List.Item key={patient.Id}>
                {patient.Nome}
              </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
