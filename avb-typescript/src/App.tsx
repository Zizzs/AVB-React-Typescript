import React, { useState, useEffect, ChangeEvent } from 'react';

import ContactsService from "./services/ContactsService";
import { ContactData } from "./types/ContactData";

import ContactList from './components/ContactList';
import SingleContact from "./components/SingleContact";

import './App.css';

const App: React.FC = () => {

  const [contacts, setContacts] = useState<Array<ContactData>>([]);
  const [currentContact, setCurrentContact] = useState<ContactData>();

  useEffect(() => {
    retrieveContacts();
  }, [])

  const retrieveContacts = () => {
    ContactsService.getAll()
      .then(response => {
        setContacts(response.data.contacts);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  console.log(currentContact);
  return (
    <div className={"root-div"}>
      <ContactList singleContact={currentContact} contacts={contacts} setCurrentContact={setCurrentContact} />
      <SingleContact singleContact={currentContact} />
    </div>
  );
}

export default App;
