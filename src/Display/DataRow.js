import React from 'react';
import Button from '@mui/material/Button';


const DataRow = ({ row, onDelete, onEdit }) => {

    const handleDelete = () => {
        onDelete(row); 
    };

    const handleEdit = () => {
        onEdit(row);
    };

    const columnFields = Object.keys(row);

    return (
        <tr>
            {columnFields.map((field, index) => (
                <td key={index}>{row[field]}</td>
            ))}

            <td>
                <Button onClick={handleEdit} variant="outlined">Edit</Button>
                <Button onClick={handleDelete} variant="outlined" color="error">Delete</Button>
            </td>
        </tr>
    );
};

export default DataRow;