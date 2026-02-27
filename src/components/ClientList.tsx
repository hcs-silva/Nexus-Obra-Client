import styles from "../styles/clientlist.module.css";
import commonStyles from "../styles/common.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

import type { Client } from "../types/auth";

const ClientList = () => {
  const nav = useNavigate();

  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/clients/`)
      .then((response) => {
        const responseClients = Array.isArray(response.data)
          ? response.data
          : (response.data?.clients ?? []);

        console.log("Fetched clients:", responseClients);
        setClients(responseClients);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  const normalizedQuery = appliedQuery.trim().toLowerCase();
  const filteredClients = normalizedQuery
    ? clients.filter((client) => {
        const haystack = [
          client._id,
          client.clientName,
          client.clientEmail,
          client.clientPhone,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      })
    : clients;

  return (
    <div className={styles.clientListWrapper}>
      <h1 className={styles.title}>Client List</h1>
      <form
        className={commonStyles.form}
        onSubmit={(event) => {
          event.preventDefault();
          setAppliedQuery(searchQuery);
        }}
      >
        <label>
          Search Client:
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Name, email, phone, or ID"
          />
          <button type="submit" className={commonStyles.button}>
            Search
          </button>
          <button
            type="button"
            className={commonStyles.clearBtn}
            onClick={() => {
              setSearchQuery("");
              setAppliedQuery("");
            }}
            disabled={!searchQuery.trim() && !appliedQuery.trim()}
          >
            Clear
          </button>
        </label>
      </form>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Client Phone</th>
            <th>Subscription Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.length === 0 ? (
            <tr>
              <td colSpan={6}>No clients match your search.</td>
            </tr>
          ) : (
            filteredClients.map((client: Client) => (
              <tr key={client._id}>
                <td>{client._id}</td>
                <td>{client.clientName}</td>
                <td>{client.clientEmail}</td>
                <td>{client.clientPhone}</td>
                <td>{client.subStatus ? "Ativo" : "Inativo"}</td>
                <td>
                  <button
                    className={styles.editBtn}
                    onClick={() => {
                      nav(`/editclient/${client._id}`);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button
        onClick={() => nav("/masterdash")}
        className={commonStyles.cancelBtn}
      >
        Back
      </button>
    </div>
  );
};
export default ClientList;
