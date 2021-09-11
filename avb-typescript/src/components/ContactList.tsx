import React, { useState, useEffect, ChangeEvent } from 'react';
import ContactsService from "../services/ContactsService";
import ContactData from "../types/ContactData";

interface contactProp {
  contacts: Array<ContactData>,
  setCurrentContact: React.Dispatch<React.SetStateAction<ContactData | undefined>>,
}

const ContactList: React.FC<contactProp> = (props) => {


  console.log(props.contacts);
  return (
    <div>
      <p>Contacts</p>
      <div>
        {props.contacts &&
          props.contacts.map((contact, index) => {
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
