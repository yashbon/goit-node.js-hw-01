const fs = require("fs/promises");
const path = require("path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументувати кожну функцію

async function read() {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
}

async function write(data) {
    return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
    //Повертає масив контактів.
    const contacts = await read();

    return contacts;
}

async function getContactById(contactId) {
    // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await read();
    const contactById = contacts.find((contact) => contact.id === contactId);

    return contactById ? contactById : null;
}

async function removeContact(contactId) {
    // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await read();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (!index) {
        return null;
    }

    const newContacts = [
        ...contacts.slice(0, index),
        ...contacts.slice(index + 1),
    ];
    write(newContacts);

    return contacts[index];
}

async function addContact(name, email, phone) {
    // Повертає об'єкт доданого контакту.
    const contacts = await read();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    await write(contacts);

    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
