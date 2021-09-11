import React from 'react';
import { ContactData, SingleContactData } from "../types/ContactData";

const SingleContact: React.FC<SingleContactData> = (props) => {

  if (props.singleContact === undefined) {
    return (
      <div>
        <p>No Contact Selected</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>Contact</p>
        <p>Contact ID: {props.singleContact.id}</p>
        <p>First Name: {props.singleContact.firstName}</p>
        <p>Last Name: {props.singleContact.lastName}</p>
        <p>Emails: {props.singleContact.emails.map((email) => {
          return (<p>{email}</p>)
        })}</p>
      </div>
    )
  }
}

export default SingleContact;
