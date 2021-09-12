import React, { useState } from 'react';
import { isReturnStatement } from 'typescript';
import { ContactData, SingleContactData } from "../types/ContactData";

const SingleContact: React.FC<SingleContactData> = (props) => {

  const [mutableContact, setMutableContact] = useState<ContactData>();
  const [inputEmailVisibility, setInputEmail] = useState<boolean>(false);
  const [inputtedEmailTemp, setInputtedEmailTemp] = useState<string>("");

  let tempContact: ContactData = {
    id: props.nextContactID,
    firstName: "",
    lastName: "",
    emails: [],
  };

  console.log("Prop", props.singleContact);
  console.log("Mutable", mutableContact);

  // If the contact passed down exists and we have no mutable contact created, then we want to use the real contact information.
  if (props.singleContact !== undefined && mutableContact === undefined){
    tempContact = JSON.parse(JSON.stringify(props.singleContact));
    setMutableContact(tempContact);
  }

  // If the contact passed down exists, and we already have a mutable contact but the ids are different, replace the old data with the new contact data.
  if (props.singleContact !== undefined && mutableContact !== undefined){
    if(props.singleContact.id !== mutableContact.id){
      tempContact = JSON.parse(JSON.stringify(props.singleContact));
      setMutableContact(tempContact);
    }
  }

  // If the single contact is undefined (If the user clicks the same contact again to deselect it), and we still have mutable contact data from the previous contact, set the mutable contact data to the temporary contact information (Can be used to make a new contact profile)
  if (props.singleContact === undefined && mutableContact !== undefined){
    if(mutableContact.id !== tempContact.id){
      setMutableContact({...tempContact});
    }
  }

  // Only happens when the page is loaded for the first time. When the user has not clicked on a contact yet, causing the mutable contact data to be undefined as well. Set the mutable contact data to the temporary contact. (Can be used to make a new contact profile).
  if ( props.singleContact === undefined && mutableContact === undefined) {
    setMutableContact({...tempContact});
  }

  // Function called upon any change to first name input, modifies the mutable contact.
  const editFirstName = (value: string) => {
    if(mutableContact !== undefined){
      tempContact = JSON.parse(JSON.stringify(mutableContact));
      tempContact.firstName = value;
      setMutableContact({...tempContact});
    }
    console.log(mutableContact);
  }

  // Function called upon any change to the last name input, modifies the mutable contact.
  const editLastName = (value: string) => {
    if(mutableContact !== undefined){
      tempContact = JSON.parse(JSON.stringify(mutableContact));
      tempContact.lastName = value;
      setMutableContact({...tempContact});
    }
    console.log(mutableContact);
  }

  const addEmail = () => {
    if(mutableContact !== undefined){
      tempContact = JSON.parse(JSON.stringify(mutableContact));
      tempContact.emails.push(inputtedEmailTemp);
      setMutableContact({...tempContact});
      setInputtedEmailTemp("");
      setInputEmail(false);
    }
  }

  const handleInputEmailChange = (value: string) => {
    setInputtedEmailTemp(value);
  }

  const handleInputEmailButton = () => {
    setInputEmail(true);
  }

  const handleAddEmailButton = () => {
    setInputEmail(false);
  }

  let key = 0;
  if (mutableContact !== undefined){
    return (
      <div className={"single-contact-root-div"}>
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
        <div className={"single-contact-emails-div"}>
          <p className={"single-contact-emails-header"}>Emails:</p>
          <div className={"single-contact-emails"}>
            {
            mutableContact.emails.map((email) => {
              return (<p key={key += 1}>{email}</p>)
            })
            }
            {
              inputEmailVisibility ? 
              <div>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>): void => (handleInputEmailChange(e.target.value))}/>
                <p className={"single-contact-input-email-button"} onClick={(event: React.MouseEvent<HTMLElement>) => {
                  addEmail(); 
                  handleAddEmailButton();
                }}>Add Email</p>
              </div> :
              <div>
                <p className={"single-contact-input-email-button"} onClick={(event: React.MouseEvent<HTMLElement>) => { 
                  handleInputEmailButton();
                }}>Input Email</p>
              </div>
            }
          </div>
        </div>
        <div className={"single-contact-interact-buttons"}>
          {mutableContact.id === props.nextContactID ?
            <p className={"single-contact-add-button"}>Add</p> :
            <p className={"single-contact-delete-button"}>Delete</p>

          }
          <p></p>
          <p className={"single-contact-save-button"}>Save</p>
        </div>
      </div>
    ) 
  } else {
    return (
      <div>
        <p>You shouldn't be here. Click a contact to view information.</p>
      </div>
    ) 
  }
}

export default SingleContact;
