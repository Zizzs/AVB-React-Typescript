import React, { useState } from 'react';
import { isReturnStatement } from 'typescript';
import { ContactData, SingleContactData } from "../types/ContactData";

const SingleContact: React.FC<SingleContactData> = (props) => {

  const [mutableContact, setMutableContact] = useState<ContactData>();

  let tempContact: ContactData = {
    id: props.nextContactID,
    firstName: "",
    lastName: "",
    emails: [],
  };

  if (props.singleContact !== undefined && mutableContact === undefined){
    setMutableContact(props.singleContact);
  }

  if (props.singleContact !== undefined && mutableContact !== undefined){
    if(props.singleContact.id !== mutableContact.id){
      setMutableContact(props.singleContact);
    }
  }

  if (props.singleContact === undefined && mutableContact !== undefined){
    if(mutableContact.id !== tempContact.id){
      setMutableContact(tempContact);
    }
  }

  if ( props.singleContact === undefined && mutableContact === undefined) {
    setMutableContact(tempContact);
  }


  const editFirstName = (value: string) => {
    if(mutableContact !== undefined){
      tempContact = {...mutableContact}
      tempContact.firstName = value;
      setMutableContact(tempContact);
    }
    console.log(mutableContact);
  }

  const editLastName = (value: string) => {
    if(mutableContact !== undefined){
      tempContact = {...mutableContact}
      tempContact.lastName = value;
      setMutableContact(tempContact);
    }
    console.log(mutableContact);
  }

  let key = 0;
  if (mutableContact !== undefined){
    return (
      <div>
        <div className={"single-contact-first-last-name-div"}>
          <div>
            <p>First Name</p>
            <input className={"single-contact-input"} type="text" value={`${mutableContact.firstName}`} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => (editFirstName(e.target.value))}></input>
          </div>
          <div>
            <p>Last Name</p>
            <input className={"single-contact-input"} type="text" value={`${mutableContact.lastName}`} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => (editLastName(e.target.value))}></input>
          </div>
        </div>
        <div>Emails: {
          mutableContact.emails.map((email) => {
            return (<p key={key += 1}>{email}</p>)
          })
        }</div>
      </div>
    ) 
  } else {
    return (
      <div>
        No Contacts Selected
      </div>
    ) 
  }
}

export default SingleContact;
