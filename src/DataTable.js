import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataRow from './DataRow';
import './App.css';
import AddUserForm from './AddUserForm';
import axios from "axios";
import UpdatePlayerForm from './UpdateUserform';





const DataTable = () => {
  
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlayer,setSelectedPlayer] = useState(null);

  

  useEffect(() => {
    
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5196/Footballplayer/GetAllPlayers");
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteRow = async (rowToDelete) => {
    try {
    
        const response = await axios.delete(`http://localhost:5196/Footballplayer/${rowToDelete.id}`);
        console.log('Row deleted successfully:', response.data);

        const newData = data.filter((row) => row !== rowToDelete);
        setData(newData);

       
    } catch (error) {
       
        console.error('Error deleting row:', error);
    }
};

const handleAddRow = async (newPlayer) => {
    try {
      
        const response = await axios.post("http://localhost:5196/Footballplayer/", newPlayer);
        console.log('New player added:', response.data);

        const updatedUsers = [...data, newPlayer];
        setData(updatedUsers);
        fetchData();
       
    } catch (error) {
        console.error('Error adding new player:', error);
    }
};

const handleEditRow = (player) => {
    setSelectedPlayer(player);
    setShowModal(true);
};

const handleUpdatePlayer = (updatedPlayer) => {
    const updatedData = data.map((player) =>
        player.id === updatedPlayer.id ? updatedPlayer : player
    );
    setData(updatedData);
    fetchData();
};




  return (
    <div>
      <div className="table-container">
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
                      <DataRow key={rowIndex} row={row} onDelete={handleDeleteRow} onEdit = {handleEditRow}  />
                  ))}

              </tbody>
          </table>
      </div>
      <div><AddUserForm handleAddRow={handleAddRow}></AddUserForm></div>
            {selectedPlayer && (
                <UpdatePlayerForm
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    player={selectedPlayer}
                    onUpdate={handleUpdatePlayer}
                />
            )}
      </div>
  );
};

export default DataTable;