import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UpdatePlayerForm = ({ show, handleClose, player, onUpdate }) => {
    const [updatedPlayer, setUpdatedPlayer] = useState(player);
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        setUpdatedPlayer(player);
    }, [player]);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await axios.get("http://localhost:5196/Footballplayer/GetAllClubs");
                setClubs(response.data);
            } catch (error) {
                console.error("Error fetching clubs:", error);
            }
        };
        fetchClubs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPlayer((prevPlayer) => ({ ...prevPlayer, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5196/Footballplayer/${updatedPlayer.id}`, updatedPlayer);
            onUpdate(response.data);
            handleClose();
        } catch (error) {
            console.error("Error updating player:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Player</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={updatedPlayer.name || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            value={updatedPlayer.age || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPosition">
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                            as="select"
                            name="position"
                            value={updatedPlayer.position || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Position</option>
                            <option value="CF">CF</option>
                            <option value="MID">MID</option>
                            <option value="DF">DF</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formClub">
                        <Form.Label>Club</Form.Label>
                        <Form.Control
                            as="select"
                            name="clubId"
                            value={updatedPlayer.clubId || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Club</option>
                            {clubs.map((club) => (
                                <option key={club.id} value={club.id}>
                                    {club.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update Player
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdatePlayerForm;
