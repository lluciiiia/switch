"use client";

import React, { useState } from "react";
import ContactList from "./ContactList";
import MessageArea from "./Message";

interface Contact {
  name: string;
  role: string;
  avatar?: string;
}

const Page: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(
    undefined
  );

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="my-6 grid grid-cols-5 gap-4">
      <div className={selectedContact ? "col-span-3" : "col-span-5"}>
        <ContactList
          onSelectContact={handleSelectContact}
          selectedContact={selectedContact}
        />
      </div>
      {selectedContact && (
        <div className="col-span-2">
          <MessageArea selectedContact={selectedContact} />
        </div>
      )}
    </div>
  );
};

export default Page;
