import React, { useState, useEffect, ChangeEvent } from 'react';
import ContactsService from "../services/ContactsService";
import ContactData from "../types/ContactData";

const ContactList: React.FC = () => {

  const [contacts, setContacts] = useState<Array<ContactData>>([]);

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

  console.log(contacts);
  return (
    <div>
      <p>Contacts</p>
      <div>
        {contacts &&
          contacts.map((contact, index) => {
            console.log(contact);
            return (
              <p>
                {contact.firstName} {contact.lastName}
              </p>
            )
          })}
      </div>

    </div>
  )
}

export default ContactList;
