import React from 'react';

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
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default DataRow;