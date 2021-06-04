import React from "react";
import { IContact } from "../../types";

type ContactProps = {
  contact: IContact;
};
export function Contact({ contact }: ContactProps) {
  return (
    <React.Fragment>
      <div>
        <strong>Company</strong>
        <p>{contact.company}</p>
      </div>
      <div>
        <strong>Name</strong>
        <p>{contact.name}</p>
      </div>
      <div>
        <strong>Email</strong>
        <p>{contact.email}</p>
      </div>
      <div>
        <strong>Phone</strong>
        <p>{contact.phone}</p>
      </div>
    </React.Fragment>
  );
}
