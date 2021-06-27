import { useEffect, useState } from "react";
import axios from "axios";

import { GoSearch } from "react-icons/go";

import "./Compocontact.css";

const Contact = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [contacts2, setContacts2] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const result = await axios.get("/contacts");
      setContacts(result.data);
      console.log(result.data);
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchContacts2 = async () => {
      const result = await axios.get("/contacts2");
      setContacts2(result.data);
    };
    fetchContacts2();
  }, []);

  return (
    <div className="container">
      <h1 className="title-contact">Rubrique Contacts MEDIATRANSPORTS</h1>
      <h2>Retrouver tous les contacts utiles au sein de notre société</h2>
      <div>
        <input
          type="text"
          placeholder="Recherche..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <GoSearch />
        <table className="table-style">
          <caption className="table-caption">
            Adresses et contacts des différents sites
          </caption>
          <thead>
            <tr>
              <td>Nom</td>
              <td>Adresse</td>
              <td>N. de Téléphone</td>
            </tr>
          </thead>
          <tbody>
            {contacts
              .filter((contact) => {
                if (searchTerm === "") {
                  return contact;
                } else if (
                  contact.nom.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return contact;
                }
              })
              .map((contact) => (
                <tr key={contact.nom}>
                  <td>{contact.nom}</td>
                  <td>{contact.adresse}</td>
                  <td>{contact.telephone}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <table className="table-style">
          <caption className="table-caption">
            Adresses et contacts santé et sécurité
          </caption>
          <thead>
            <tr>
              <td>Titre</td>
              <td>Description</td>
              <td>Site internet</td>
              <td>N. de Téléphone</td>
            </tr>
          </thead>
          <tbody>
            {contacts2
              .filter((contact2) => {
                if (searchTerm === "") {
                  return contact2;
                } else if (
                  contact2.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return contact2;
                }
              })
              .map((contact2) => (
                <tr key={contact2.title}>
                  <td>{contact2.title}</td>
                  <td>{contact2.description}</td>
                  <td>{contact2.site_internet}</td>
                  <td>{contact2.telephone}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contact;
