import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

const ContactRenders = () => {
  // Hooks for getInputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState([]);
  const id = Date.now() * Math.random();

  const getContacts = () => {
    fetch("http://localhost:5000/contacts/", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setContact(data);
        console.log(data);
      });
  };

  useEffect(() => getContacts());

  const createContact = () => {
    fetch("http://localhost:5000/contacts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        phone: phone,
        email: email,
      }),
    });
  };

  const deleteContact = (id) => {
    const id_temp = setContact((prevContact) =>
      prevContact.filter((contact) => contact.id !== id)
    );
    console.log(id_temp);
    fetch(`http://localhost:5000/contacts/${id_temp}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleSubmit = () => createContact();

  const columns = [
    { field: "name", headerName: "Name", width: 400, editable: true },
    { field: "email", headerName: "Email", width: 300, editable: true },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
      type: "String",
      editable: true,
    },

    {
      field: "edit",
      headerName: "Edit",
      type: "actions",
      width: 100,
      getActions: () => [
        <GridActionsCellItem
          //onClick={updateContact(row.id)}
          icon={<EditIcon />}
          label="Edit"
        />,
      ],
    },
    {
      field: "delete",
      headerName: "Delete",
      type: "actions",
      width: 100,

      getActions: (contact) => [
        <GridActionsCellItem
          onClick={() => deleteContact(contact.id)}
          icon={<DeleteIcon />}
          label="Delete"
        />,
      ],
    },
  ];

  return (
    <>
      <div className="form-input">
        <label>Name </label>
        <TextField
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name Full"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <label>Phone </label>
        <TextField
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
          required
          fullWidth
          name="phone"
          label="Phone (xx)xxxxxxx"
          type="phone"
          id="phone"
          autoComplete="phone"
        />
        <label>Email </label>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Digityour@email.com"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Button
          type="submit"
          id="button"
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={contact}
          columns={columns}
          pageSize={30}
          rowsPerPageOptions={[1]}
        />
      </div>
    </>
  );
};

export default ContactRenders;
