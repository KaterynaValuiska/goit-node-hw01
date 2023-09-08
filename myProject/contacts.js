// const fs = require("fs/promises");

// const contactsPath = async () => {
//   const data = await fs.readFile("./db/contacts.json", "utf-8");
//   console.log(data);
// };

// contactsPath();

// fs.readFile("./db/contacts.json")
//   .then((data) => console.log(data.toString()))
//   .catch((err) => console.log(err.message));

const contacts = require("./db");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "read":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
    case "getById":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    case "addContact":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case "deleteContact":
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);
    case "updateById":
      const updateContactById = await contacts.updateContact(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContactById);
  }
};

// invokeAction({ action: "read" });
// invokeAction({ action: "getById", id: "drsAJ4SHPYqZeG-83QTVW" });
// invokeAction({
//   action: "addContact",
//   name: "Stanislav",
//   email: "stan@com.ua",
//   phone: "111-11-11",
// });
// invokeAction({ action: "deleteContact", id: "a_v6XCJGMSVnPmP2dMP2N" });
// invokeAction({
//   action: "updateById",
//   id: "drsAJ4SHPYqZeG-83QTVW",
//   name: "Kennedy",
//   email: "mattis.Cras@nonenimMauris.net",
//   phone: "(542) 451-7038",
// });
