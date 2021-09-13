import React from 'react';
import { ContactListData } from "../types/ContactData";
import "../App.css";

const ContactList: React.FC<ContactListData> = (props) => {

  const handleAddNewUser = () => {
    props.setCurrentContact(undefined);
  }

  return (
    <div className={"contact-list-main-div"}>
      <p className={"contact-list-header"}>Contacts<span onClick={(event: React.MouseEvent<HTMLElement>) => { handleAddNewUser()}}className={"contact-list-add-button"}>+</span></p>
      <div className={"contact-list-all-contacts"}>
        {props.contacts &&
          props.contacts.map((contact, index) => {
            let unselectedContactCSS = "contact-list-single-contact";
            let selectedContactCSS = "contact-list-single-contact-selected";
            let contactCSS = "";

            if(props.singleContact !== undefined){
              if (contact.id === props.singleContact.id) {
                contactCSS = selectedContactCSS;
              } else {
                contactCSS = unselectedContactCSS;
              }
            } else {
              contactCSS = unselectedContactCSS;
            }
            
            return (
              <div key={contact.id} className={contactCSS} onClick={(event: React.MouseEvent<HTMLElement>) => {
                if (props.singleContact !== undefined) {
                  if (props.singleContact.id === contact.id) {
                    props.setCurrentContact(undefined);
                  } else {
                    props.setCurrentContact(contact);
                  }
                } else {
                  props.setCurrentContact(contact);
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
