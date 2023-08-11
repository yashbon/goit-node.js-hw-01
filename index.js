// const { error } = require("console");
const contacts = require("./contacts");

console.log(
    "hello!"
    // process.argv
);

// contacts.listContacts().then(console.log).catch(console.error);
// contacts
//     .getContactById("05olLMgyVQdWRwgKfg5J6")
//     .then(console.log)
//     .catch(console.error);

// contacts
//     .addContact("xaxa", "email@email.eml", "1212")
//     .then(console.log)
//     .catch(console.error);

const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            contacts.listContacts().then(console.log).catch(console.error);
            break;

        case "get":
            contacts
                .getContactById("05olLMgyVQdWRwgKfg5J6")
                .then(console.log)
                .catch(console.error);
            break;

        case "add":
            // ... name email phone
            contacts
                .addContact(name, email, phone)
                .then(console.log)
                .catch(console.error);
            break;

        case "remove":
            // ... id
            contacts.removeContact(id).then(console.log).catch(console.error);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);
