import api from "../axios";
import ContactData from "../types/ContactData";

const getAll = () => {
  return api.get("/contacts/paginated");
}

const ContactsService = {
  getAll
};

export default ContactsService