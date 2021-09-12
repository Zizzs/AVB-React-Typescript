import React, { useState } from 'react';
import { ContactEmailData } from "../types/ContactData";
import "../App.css";


const ContactEmail: React.FC<ContactEmailData> = (props) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  }

  const handleMouseOut = () => {
    setIsHovered(false);
  }

  return (
    <div className={"single-contact-single-email"} onMouseLeave={handleMouseOut} onMouseEnter={handleMouseOver}>
      {props.email}{isHovered && <span onClick={(event: React.MouseEvent<HTMLElement>) => {props.deleteEmail(props.emailIndex)}} className="single-contact-delete-email-button">Delete</span>}
    </div>
  ) 
  
}

export default ContactEmail;
