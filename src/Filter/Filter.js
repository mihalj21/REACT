import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Button from '@mui/material/Button';


const FilterForm = ({closeFilterForm}) => {

    const [players, setPlayers] = useState([]);
    const [nameId, setNameId] = useState('');
    const [age, setAge] = useState('');
    const [position, setPosition] = useState('');
    const [clubId, setClubId] = useState('');
    const [sortBy, setSortBy] = useState('Name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
   
  
    useEffect(() => {
      fetchPlayers();
    }, [nameId, age, position, clubId, sortBy, sortOrder, pageNumber, pageSize]);
  
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:5196/players', {
          params: {
            nameId: nameId ,
            age: age ,
            position: position ,
            clubId: clubId,
            sortBy,
            sortOrder,
            pageNumber,
            pageSize,
          },
        });
        setPlayers(response.data);
        console.log("matko",response.clubId);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
  
   

    const close = () =>{
        closeFilterForm();
    };
  
    return (
      <div className="filter-form-container">
        <h2>Players List</h2>
  
        <form  className="filter-form" >
          <label>
            Name Id:
            <input type="text" value={nameId} onChange={(e) => setNameId(e.target.value)} />
          </label>
          <br />
  
          <label>
            Age:
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
          <br />
  
          <label>
            Position:
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
          </label>
          <br />
  
          <label>
            Club Id:
            <input type="text" value={clubId} onChange={(e) => setClubId(e.target.value)} />
          </label>
          <br />
  
          <label>
            Sort By:
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="Name">Name</option>
              <option value="Age">Age</option>
            </select>
          </label>
          <br />
  
          <label>
            Sort Order:
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
          <br />
          <Button onClick={close} variant="outlined" color="error">Close</Button>
        </form>
  
        <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
            <th>Club</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.age}</td>
              <td>{player.position}</td>
              <td>{player.clubName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    );
};

export default FilterForm;