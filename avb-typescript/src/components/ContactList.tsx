import React from 'react';
import { isPropertySignature } from 'typescript';
import { ContactData, ContactListData } from "../types/ContactData";
import "../App.css";

const ContactList: React.FC<ContactListData> = (props) => {


  return (
    <div className={"contact-list-main-div"}>
      <p className={"contact-list-header"}>Contacts</p>
      <div className={"contact-list-all-contacts"}>
        {props.contacts &&
          props.contacts.map((contact, index) => {
            let unselectedContactCSS = "contact-list-single-contact";
            let selectedContactCSS = "contact-list-single-contact-selected";
            let contactCSS = "";

            if (props.singleContact != undefined) {
              if (props.singleContact.id === contact.id) {
                contactCSS = selectedContactCSS;
              } else {
                contactCSS = unselectedContactCSS;
              }
            } else {
              contactCSS = unselectedContactCSS;
            }

            return (
              <div className={contactCSS} onClick={(event: React.MouseEvent<HTMLElement>) => {
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
                <span className={"contact-list-single-contact-names"}>{contact.firstName} {contact.lastName}</span>
              </div>
            )
          })}
      </div>

    </div>
  )
}

export default ContactList;
