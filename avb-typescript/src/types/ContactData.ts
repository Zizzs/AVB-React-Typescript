import React from "react";

export interface ContactData {
  id: number,
  firstName: string,
  lastName: string,
  emails: Array<string>,
}

export interface AddContactData {
  firstName: string,
  lastName: string,
  emails: Array<string>,
}

export interface ContactListData {
  contacts: Array<ContactData>,
  setCurrentContact: React.Dispatch<React.SetStateAction<ContactData | undefined>>,
  singleContact: ContactData | undefined,
}

export interface SingleContactData {
  singleContact: ContactData | undefined,
  nextContactID: number,
  updateContactsList: () => void,
}

export interface ContactEmailData {
  email: string,
  emailIndex: number,
  deleteEmail: (index: number) => void,
}