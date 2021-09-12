import React, { useState, useEffect, useCallback} from 'react';

import ContactsService from "./services/ContactsService";
import { ContactData } from "./types/ContactData";

import ContactList from './components/ContactList';
import SingleContact from "./components/SingleContact";

import './App.css';

const App: React.FC = () => {

  const [contacts, setContacts] = useState<Array<ContactData>>([]);
  const [currentContact, setCurrentContact] = useState<ContactData>();
  const [updateContacts, setUpdateContacts] = useState<boolean>(true);

  const updateContactsList = () => {
    setCurrentContact(undefined);
    setUpdateContacts(true);
  }
  
  const retrieveContacts = useCallback(() => {
    if(updateContacts){
      ContactsService.getAll()
      .then(response => {
        setContacts(response.data.contacts);
        setUpdateContacts(false);
      })
      .catch(e => {
        //console.log(e);
      })
    }
  }, [updateContacts],)

  useEffect(() => {
    retrieveContacts();
  }, [updateContacts, retrieveContacts]);

  let nextContactNumber = 5000;

  if (contacts.length > 0) {
    nextContactNumber = contacts[0].id + 1;
  }

  return (
    <div className={"root-div"}>
      <ContactList singleContact={currentContact} contacts={contacts} setCurrentContact={setCurrentContact}/>
      <SingleContact singleContact={currentContact} nextContactID={nextContactNumber} updateContactsList={updateContactsList}/>
    </div>
  );
}

export default App;
