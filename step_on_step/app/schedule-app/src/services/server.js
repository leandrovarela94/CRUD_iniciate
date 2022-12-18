const express = require("express");

const server = express();

server.use(express.json());

const contacts = [
  {
    id: 1,
    name: "LEANDRO VARELA PEREIRA",
    phone: "+55(21) 97477 - 0964",
    email: "varela@gmail.com",
  },
  {
    id: 2,
    name: "LUCAS VARELA PEREIRA",
    phone: "+55(21) 97477 - 0964",
    email: "lucas@gmail.com",
  },
  {
    id: 3,
    name: "ROBERT VARELA PEREIRA",
    phone: "+55(21) 97477 - 0964",
    email: "robert@gmail.com",
  },
  {
    id: 4,
    name: "JUNIOR VARELA PEREIRA",
    phone: "+55(21) 97477 - 0964",
    email: "melynx@gmail.com",
  },
];

server.get("/contacts", (req, res) => {
  return res.json(contacts);
});

server.post("/contacts", (req, res) => {
  const contact = req.body;
  contacts.push(req.body);

  return res.json(contact);
});

server.put("/contacts", (req, res) => {
  const { contact } = req.body;

  return res.json(contact);
});

server.delete(`/contacts/`, (req, res) => {
  const { id } = req.body;

  contacts.splice(id, 1);

  return res.json({ message: "O contato foi deletado" });
});

server.listen(5000);
