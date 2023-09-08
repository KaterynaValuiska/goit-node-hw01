const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// Повертає масив контактів.
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
async function getContactById(id) {
  const contactId = String(id);
  const contacts = await listContacts();
  const oneContact = contacts.find((item) => item.id === contactId);
  return oneContact || null;
}
// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
async function removeContact(id) {
  const deleteContact = await getContactById(id);
  const contacts = await listContacts();
  const contactId = String(id);
  const updateContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));

  return deleteContact || null;

  // const contacts = await listContacts();
  // const index = contacts.findIndex((item) => item.id === id);
  // if (index === -1) {
  //   return null;
  // }
  //     const [result] = contacts.splice(index, 1);
  //     await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  //     return result;
}

//  Повертає об'єкт доданого контакту.
async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

//  Повертає об'єкт доданого зміненого контакту.
async function updateContact(id, data) {
  const contacts = await listContacts();
  const contactId = String(id);
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
