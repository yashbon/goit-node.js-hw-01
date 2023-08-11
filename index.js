const contacts = require("./contacts");
const { program } = require("commander");
// const { Command } = require("commander");
// const program = new Command();

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contactsList = await contacts
                .listContacts()
                .then(console.log)
                .catch(console.error);
            return contactsList;

        case "get":
            const contactById = await contacts
                .getContactById(id)
                .then(console.log)
                .catch(console.error);
            return contactById;

        case "add":
            const addContact = await contacts
                .addContact(name, email, phone)
                .then(console.log)
                .catch(console.error);
            return addContact;

        case "remove":
            const delContact = await contacts
                .removeContact(id)
                .then(console.log)
                .catch(console.error);
            return delContact;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);
