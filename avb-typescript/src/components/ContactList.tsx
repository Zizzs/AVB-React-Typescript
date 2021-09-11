import React from 'react';
import { isPropertySignature } from 'typescript';
import { ContactData, ContactListData } from "../types/ContactData";
import "../App.css";

const ContactList: React.FC<ContactListData> = (props) => {


  return (
    <div>
      <p>Contacts</p>
      <div>
        {props.contacts &&
          props.contacts.map((contact, index) => {
            //console.log(contact);
            return (
              <p className={"contact-list-single-contact"} onClick={(event: React.MouseEvent<HTMLElement>) => {
                if (props.singleContact != undefined) {
                  if (props.singleContact.id === contact.id) {
                    props.setCurrentContact(undefined);
                  } else {
                    props.setCurrentContact(contact);
                  }
                } else {
                  props.setCurrentContact(contact)
                }
              }}>
                {contact.firstName} {contact.lastName}
              </p>
            )
          })}
      </div>

    </div>
  )
}

export default ContactList;
