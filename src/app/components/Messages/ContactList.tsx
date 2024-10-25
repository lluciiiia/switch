import { contacts } from "@/app/data/contactData";
import React from "react";

interface Contact {
  name: string;
  role: string;
}

interface ContactListProps {
  onSelectContact: (contact: Contact) => void;
  selectedContact?: Contact;
}

const ContactList: React.FC<ContactListProps> = ({
  onSelectContact,
  selectedContact,
}) => {
  return (
    <div
      className={`flex gap-4 flex-wrap ${
        selectedContact ? "overflow-y-auto h-[580px] custom-scrollbar" : ""
      }`}
    >
      {Object.keys(contacts).map((department) => (
        <div
          key={department}
          className="bg-white shadow p-4 rounded-lg w-[320px] h-[370px]"
        >
          <h3 className="text-lg font-semibold mb-6">{department}</h3>
          {contacts[department].map((contact, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-8 cursor-pointer"
              onClick={() => onSelectContact(contact)}
            >
              <div className="flex items-center text-sm">
                <div className="rounded-full bg-gray-200 w-12 h-12 mr-3"></div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-gray-500">{contact.role}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-teal-500 text-white rounded-md text-sm">
                Contact
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
