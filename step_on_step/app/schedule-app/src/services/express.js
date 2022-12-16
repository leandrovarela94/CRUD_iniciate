const express = require("express");

const server = express();

server.use(express.json());

const contacts = ["varela", "Robert", "Lukita"];

server.get("/contacts", (req, res) => {
  const { index } = req.params;

  return res.json(contacts[index]);
});

server.get("/contacts", (req, res) => {
  return res.json(contacts);
});

server.post("/contacts", (req, res) => {
  const { name } = req.body;

  return res.json(contacts.append(name));
});

server.put("/contacts", (req, res) => {
  const { index } = req.body;

  return res.json(contacts.splice(1, index));
});

server.delete(`/contacts/${id}`, (req, res) => {
  const { name } = req.body;
});

server.listen(5000);
