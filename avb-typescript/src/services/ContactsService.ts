import api from "../axios";
import { ContactData, AddContactData } from "../types/ContactData";

const getAll = () => {
  return api.get(`/contacts/paginated`);
}

const create = (data: AddContactData) => {
  return api.post(`/contacts`, data);
}

const update = (id: number, data: ContactData) => {
  return api.put(`/contacts/${id}`, data);
}

const remove = (id: number) => {
  return api.delete(`/contacts/${id}`);
}

const ContactsService = {
  getAll,
  create,
  update,
  remove
};

export default ContactsService