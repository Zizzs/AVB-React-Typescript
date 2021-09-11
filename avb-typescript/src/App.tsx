import React, { useState, useEffect, ChangeEvent } from 'react';
import ContactsService from "./services/ContactsService";
import ContactData from "./types/ContactData";
import ContactList from './components/ContactList';
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

  return (
    <div>
      <ContactList contacts={contacts} setCurrentContact={setCurrentContact} />
    </div>
  );
}

export default App;
