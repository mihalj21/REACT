import React, { useState, useEffect } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';

const AddUserForm = ({ handleAddRow , closeAddUserForm}) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [position, setPosition] = useState('');
    const [clubs, setClubs] = useState([]);
    const [selectedClub, setSelectedClub] = useState('');

    useEffect(() => {
        const fetchClub = async () => {
            try {
                const response = await axios.get("http://localhost:5196/Footballplayer/GetAllClubs");
                console.log(response.data);
                setClubs(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchClub();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            
            name,
            age: parseInt(age),
            position,
            clubId: selectedClub
        };
console.log(newUser);
        handleAddRow(newUser);
        closeAddUserForm();
        setName('');
        setAge('');
        setPosition('');
        setSelectedClub(''); 
    };

    const handlePositionChange = (e) => {
        setPosition(e.target.value);
    };

    const handleClubChange = (e) => {
        setSelectedClub(e.target.value); 
    };

    return (
        <div className="add-user-container">
            <h2>Add a New Player</h2>
            <form id="addUserForm">
                <label htmlFor="name">FullName:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                /><br /><br />

                <div>
                    <label htmlFor="club">Club:</label>
                    <select
                        id="club"
                        name="club"
                        value={selectedClub}
                        onChange={handleClubChange}
                        required
                    >
                        <option value="">Select Club</option>
                        {clubs.map((club) => (
                            <option key={club.id} value={club.id}>
                                {club.name}
                            </option>
                        ))}
                    </select>
                </div>
                <br />

                <label htmlFor="position">Position:</label>
                <input
                    type="text"
                    id="position"
                    name="position"
                    value={position}
                    onChange = {handlePositionChange}
                    required
                /><br /><br />
                <br />
                <Button   onClick={handleSubmit}  variant="outlined">Add Player</Button>
                <Button   onClick={closeAddUserForm} variant="outlined" color="error">Close</Button>
                
            </form>
        </div>
    );
};

export default AddUserForm;