import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiRequest from "./content/ApiRequest";
import SearchUser from './content/SearchUser';
import Users from './Users';
import {API_URL} from '../api/axios'
import { Delete } from '@mui/icons-material';

const Admin = () => {
  
  const [users, setUsers] = useState([]);  
  const [newUser, setNewUser] = useState("");
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not recive expected data");
        const listUsers = await response.json();
        setUsers(listUsers);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } 
    };    
  }, []);    
  

  const handleDelete = async (id: number) => {
    const listUsers = users.filter(user => user.id !== id);
    setUsers(listUsers);
    localStorage.setItem("userlist", JSON.stringify(listUsers));

    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };  


  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <br />
      <SearchUser />
      <br />
      <br />
      <Users
        users={users.filter(item => users.user.toLowerCase().includes(search.toLocaleLowerCase()))}
        handleDelete={handleDelete}        
      />
      <Delete />
      <br />  
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  )
}

export default Admin