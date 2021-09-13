import React, { useState } from 'react';
import { ContactData, AddContactData, SingleContactData } from "../types/ContactData";
import ContactsService from "../services/ContactsService";
import ContactEmail from "./ContactEmail";

const SingleContact: React.FC<SingleContactData> = (props) => {

  const [mutableContact, setMutableContact] = useState<ContactData>();
  const [inputEmailVisibility, setInputEmail] = useState<boolean>(false);
  const [inputtedEmailTemp, setInputtedEmailTemp] = useState<string>("");
  const [invalidFirstName, setInvalidFirstName] = useState<boolean>(false);
  const [invalidLastName, setInvalidLastName] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [successAdd, setSuccessAdd] = useState<boolean>(false);
  const [successSave, setSuccessSave] = useState<boolean>(false);
  const [successDelete, setSuccessDelete] = useState<boolean>(false);

  let tempContact: ContactData = {
    id: props.nextContactID,
    firstName: "",
    lastName: "",
    emails: [],
  };

  const successTimeoutAlert = () => {
    setTimeout( () => {
      setSuccessAdd(false);
      setSuccessDelete(false);
      setSuccessSave(false);
    }, 1500)
  }

  // If the contact passed down exists and we have no mutable contact created, then we want to use the real contact information.
  if (props.singleContact !== undefined && mutableContact === undefined){
    tempContact = JSON.parse(JSON.stringify(props.singleContact));
    setMutableContact(tempContact);
    setInputtedEmailTemp("");
    setInputEmail(false);
    setInvalidEmail(false);
    successTimeoutAlert();
  }

  // If the contact passed down exists, and we already have a mutable contact but the ids are different, replace the old data with the new contact data.
  if (props.singleContact !== undefined && mutableContact !== undefined){
    if(props.singleContact.id !== mutableContact.id){
      tempContact = JSON.parse(JSON.stringify(props.singleContact));
      setMutableContact(tempContact);
      setInputtedEmailTemp("");
      setInputEmail(false);
      setInvalidEmail(false);
      successTimeoutAlert();
    }
  }

  // If the single contact is undefined (If the user clicks the same contact again to deselect it), and we still have mutable contact data from the previous contact, set the mutable contact data to the temporary contact information (Can be used to make a new contact profile)
  if (props.singleContact === undefined && mutableContact !== undefined){
    if(mutableContact.id !== tempContact.id){
      setMutableContact({...tempContact});
      setInputtedEmailTemp("");
      setInputEmail(false);
      setInvalidEmail(false);
      successTimeoutAlert();
    }
  }

  // Only happens when the page is loaded for the first time. When the user has not clicked on a contact yet, causing the mutable contact data to be undefined as well. Set the mutable contact data to the temporary contact. (Can be used to make a new contact profile).
  if ( props.singleContact === undefined && mutableContact === undefined) {
    setMutableContact({...tempContact});
    setInputtedEmailTemp("");
    setInputEmail(false);
    setInvalidEmail(false);
    successTimeoutAlert();
  }

  // Function called upon any change to first name input, modifies the mutable contact.
  const editFirstName = (value: string) => {
    if(mutableContact !== undefined){
      tempContact = JSON.parse(JSON.stringify(mutableContact));
      tempContact.firstName = value;
      setMutableContact({...tempContact});
    }
  }

  // Function called upon any change to the last name input, modifies the mutable contact.
  const editLastName = (value: string) => {
    if(mutableContact !== undefined){
      tempContact = JSON.parse(JSON.stringify(mutableContact));
      tempContact.lastName = value;
      setMutableContact({...tempContact});
    }
  }

  // Function called upon user clicking the "Add Email" button, retrieves the temporary email input stored in state from the input and pushes it into the email array.
  const addEmail = () => {
    if(mutableContact !== undefined){
      tempContact = JSON.parse(JSON.stringify(mutableContact));
      tempContact.emails.push(inputtedEmailTemp);
      setMutableContact({...tempContact});
      setInputtedEmailTemp("");
      setInputEmail(false);
    }
  }

  // Function called upon user clicking the "Delete" button next to an email in the ContactEmail component. Removes the email from the selected index.
  const deleteEmail = (index: number) => {
    if(mutableContact !== undefined){
      tempContact = JSON.parse(JSON.stringify(mutableContact));
      tempContact.emails.splice(index, 1);
      setMutableContact({...tempContact});
    }
  }

  // Function called upon user clicking the "Cancel" button, this restores the contact's information to the original information.
  const restoreContact = () => {
    if(mutableContact !== undefined){
      if(mutableContact.id === props.nextContactID){
        let tempContact: ContactData = {
          id: props.nextContactID,
          firstName: "",
          lastName: "",
          emails: [],
        };
        setInvalidFirstName(false);
        setInvalidLastName(false);
        setInvalidEmail(false);
        setInputEmail(false);
        setMutableContact(tempContact)
      } else {
        setInvalidFirstName(false);
        setInvalidLastName(false);
        setInvalidEmail(false);
        setInputEmail(false);
        tempContact = JSON.parse(JSON.stringify(props.singleContact));
        setMutableContact({...tempContact})
      }
    }
  }

  // Function called upon user clicking the "Save" button, this saves the updated contact information in the database and then updates the contact list with the new contact information.
  const saveContact = () => {
    if(mutableContact !== undefined){
      console.log(`Saved Contact with id: ${mutableContact.id}`)
      if(mutableContact.firstName.length > 0 && mutableContact.lastName.length > 0 ){
        setInvalidFirstName(false);
        setInvalidLastName(false);
        setInvalidEmail(false);
        ContactsService.update(mutableContact.id, mutableContact)
          .then(() => {
            setSuccessSave(true);
            props.updateContactsList();
          })
      }
      if(mutableContact.firstName.length === 0) {
        setInvalidFirstName(true);
      } else {
        setInvalidFirstName(false);
      }
      if(mutableContact.lastName.length === 0) {
        setInvalidLastName(true);
      } else {
        setInvalidLastName(false);
      }
    }
  }

  // Function called upon user clicking the "Delete" button, this deletes the current contact from the database and updates the contact list with the contact removed.
  const deleteContact = () => {
    if(mutableContact !== undefined){
      console.log(`Deleting Contact with id: ${mutableContact.id}`)
      setSuccessDelete(true);
      setInvalidFirstName(false);
      setInvalidLastName(false);
      setInvalidEmail(false);
      ContactsService.remove(mutableContact.id)
      .then(() => {
        props.updateContactsList();
        })
      
    }
  }

  // Function called upon user clicking the "Add" button, this adds the current contact to the database and updates the contact list.
  const addContact = () => {
    if(mutableContact !== undefined){
      let temp: AddContactData = {
        firstName: mutableContact.firstName,
        lastName: mutableContact.lastName,
        emails: mutableContact.emails,
      }
      if(temp.firstName.length > 0 && temp.lastName.length > 0){
        setInvalidFirstName(false);
        setInvalidLastName(false);
        ContactsService.create(temp)
        .then(() => {
            setSuccessAdd(true);
            props.updateContactsList();
          })
      } else {
        if(temp.firstName.length === 0) {
          setInvalidFirstName(true);
        } else {
          setInvalidFirstName(false);
        }
        if(temp.lastName.length === 0) {
          setInvalidLastName(true);
        } else {
          setInvalidLastName(false);
        }
      }
      
    }
  }

  const validateEmail = () => {
    let regex = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
    let emailValidated =  regex.test(inputtedEmailTemp);

    if(emailValidated) {
      setInvalidEmail(false);
      handleAddEmailButton();
      addEmail();
    } else {
      setInvalidEmail(true);
    }
  }

  // Function called upon user inputting text into the input line for the email. Sets it to a temporary state value to be used in the "addEmail" function.
  const handleInputEmailChange = (value: string) => {
    setInputtedEmailTemp(value);
  }

  // Tied to the Input email button, which shows the input line to add a new email.
  const handleInputEmailButton = () => {
    setInputEmail(true);
  }

  // Tied to the Add email button, which removes the input line after adding an email.
  const handleAddEmailButton = () => {
    setInputEmail(false);
  }

  if (mutableContact !== undefined){
    return (
      <div className={"single-contact-root-div"}>
        <div className={"single-contact-first-last-name-div"}>
          <div>
            <p>First Name</p>
            <input className={"single-contact-input"} type="text" value={`${mutableContact.firstName}`} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => (editFirstName(e.target.value))}></input>
            {invalidFirstName && <p className={"single-contact-invalid-warning"}>Invalid Name</p>}
          </div>
          <div>
            <p>Last Name</p>
            <input className={"single-contact-input"} type="text" value={`${mutableContact.lastName}`} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => (editLastName(e.target.value))}></input>
            {invalidLastName && <p className={"single-contact-invalid-warning"}>Invalid Name</p>}
          </div>
        </div>
        <div className={"single-contact-emails-div"}>
          <p className={"single-contact-emails-header"}>Emails:</p>
          <div className={"single-contact-emails"}>
            {
            mutableContact.emails.map((email, index) => {
              return (<ContactEmail key={index} deleteEmail={deleteEmail} emailIndex={index} email={email}/>)
            })
            }
            {
              inputEmailVisibility ? 
              <div>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>): void => (handleInputEmailChange(e.target.value))}/>
                <p className={"single-contact-input-email-button"} onClick={(event: React.MouseEvent<HTMLElement>) => {
                  validateEmail(); 
                }}>Add Email</p>
              </div> :
              <div>
                <p className={"single-contact-input-email-button"} onClick={(event: React.MouseEvent<HTMLElement>) => { 
                  handleInputEmailButton();
                }}>Input Email</p>
              </div>
            }
            {invalidEmail && <p className={"single-contact-invalid-warning"}>Invalid Email</p>}
          </div>
        </div>
        <div className={"single-contact-interact-buttons"}>
          {mutableContact.id === props.nextContactID ?
            <div>
              <p className={"single-contact-add-button"} onClick={(event: React.MouseEvent<HTMLElement>) => { 
                addContact();
              }}>Add</p>
            </div> :
            <div>
              <p className={"single-contact-delete-button"} onClick={(event: React.MouseEvent<HTMLElement>) => { 
                deleteContact();
              }}>Delete</p>
            </div>

          }
          <p></p>
          <p className={"single-contact-cancel-button"} onClick={(event: React.MouseEvent<HTMLElement>) => { 
                  restoreContact();
                }}>Cancel</p>
          <div>
            {mutableContact.id !== props.nextContactID &&
            <p className={"single-contact-save-button"} onClick={(event: React.MouseEvent<HTMLElement>) => { 
                    saveContact();
                  }}>Save</p>
            }
          </div>
        </div>
        <div>
          {successAdd === false && successDelete === false && successSave === false && <p className={"single-contact-footer-filler"}>.</p>}
          {successAdd && <p className={"single-contact-footer-success"}>Successfully Added</p>}
          {successDelete && <p className={"single-contact-footer-success"}>Successfully Deleted</p>}
          {successSave && <p className={"single-contact-footer-success"}>Save Successful</p>}
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
