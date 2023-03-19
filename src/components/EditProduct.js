import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUpdateFlavor } from "../api/flavors";


const EditProduct = ({ user, token }) => {
    const [editflavor, setEditFlavor] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchedUpdatedFlavor = () => {
            fetchUpdateFlavor(
                editflavor.name,
                editflavor.type,
                editflavor.image_url,
                editflavor.description,
                editflavor.price
            )
                .then((result) => {
                    setEditFlavor(result)
                    console.log(result)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        fetchedUpdatedFlavor()
    }, [editflavor]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Call an API function to update the flavor data with the new values
    };

    const handleNameChange = (event) => {
        setEditFlavor({ ...editflavor, name: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="flavor-name">Flavor Name:</label>
            <input
                id="flavor-name"
                type="text"
                value={editflavor.name}
                onChange={handleNameChange}
            />
            <button type="submit">Update Flavor</button>
        </form>
    );
};


export default EditProduct;
