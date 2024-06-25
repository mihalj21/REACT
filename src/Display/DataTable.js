import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataRow from './DataRow';
import '../App.css';
import AddUserForm from '../Add/AddUserForm';
import UpdatePlayerForm from '../Edit/UpdateUserform';
import Button from '@mui/material/Button';
import FilterForm from '../Filter/Filter';
import FilterIcon from '@mui/icons-material/Filter';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showFilterForm, setShowFilterForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5196/Footballplayer/GetAllPlayers");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteRow = async (rowToDelete) => {
    try {
      const response = await axios.delete(`http://localhost:5196/Footballplayer/${rowToDelete.id}`);
      console.log('Row deleted successfully:', response.data);
      const newData = data.filter((row) => row.id !== rowToDelete.id);
      setData(newData);
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const handleAddRow = async (newPlayer) => {
    try {
      const response = await axios.post("http://localhost:5196/Footballplayer/", newPlayer);
      console.log('New player added:', response.data);
      fetchData();
    } catch (error) {
      console.error('Error adding new player:', error);
    }
  };

  const handleEditRow = (player) => {
    setSelectedPlayer(player);
    setShowModal(true);
  };

  const handleUpdatePlayer = async (updatedPlayer) => {
    try {
      const response = await axios.put(`http://localhost:5196/Footballplayer/${updatedPlayer.id}`, updatedPlayer);
      console.log('Player updated successfully:', response.data);
      fetchData();
      setShowModal(false); // Close modal after successful update
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  const openAddUserForm = () => {
    setShowAddUserForm(true);
  };

  const closeAddUserForm = () => {
    setShowAddUserForm(false);
  };

  const toggleFilterForm = () => {
    setShowFilterForm(!showFilterForm); 
};
const closeFilterForm = () => {
    setShowFilterForm(false)
  };


  return (
    <div>
      <div className="table-container">
        
        <div className="addButton"> 
        <Button variant="contained" color="success" onClick={toggleFilterForm} >
            <h1><FilterIcon /> </h1>
        </Button>
            <Button variant="contained" color="success" onClick={openAddUserForm}>
            <h1>+</h1>
            </Button>
        </div>
        <table className="styled-table">
          <thead>
            <tr>
              <td>Player-ID</td>
              <td>FullName</td>
              <td>Age</td>
              <td>Position</td>
              <td>Club</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <DataRow key={rowIndex} row={row} onDelete={handleDeleteRow} onEdit={handleEditRow} />
            ))}
          </tbody>
        </table>
      </div>

      {showAddUserForm && (
        <div className="modal-add">
          <div className="modal-add-content">
            <AddUserForm handleAddRow={handleAddRow} closeAddUserForm={closeAddUserForm} />
          </div>
        </div>
      )}

      {selectedPlayer && (
        <UpdatePlayerForm
          show={showModal}
          handleClose={() => setShowModal(false)}
          player={selectedPlayer}
          onUpdate={handleUpdatePlayer}
        />
      )}
        {showFilterForm && (
        <div className="modal-filter">
          <div className="modal-filter-content">
          <FilterForm closeFilterForm = {closeFilterForm} ></FilterForm>
          </div>
        </div>
      )}
   
    </div>
  );
};

export default DataTable;
