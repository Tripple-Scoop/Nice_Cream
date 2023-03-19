import { useState } from 'react';
import { fetchCreateFlavor } from "../api/flavors";

const CreateNewFlavor = () => {
    const [flavor, setFlavor] = useState({
        name: "",
        type: "",
        image_url: "",
        description: "",
        price: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFlavor((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newFlavor = await fetchCreateFlavor(
                flavor.name,
                flavor.type,
                flavor.image_url,
                flavor.description,
                flavor.price
            );
            console.log(newFlavor);
            setFlavor({
                name: "",
                type: "",
                image_url: "",
                description: "",
                price: "",
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Flavor Name:
                <input
                    type="text"
                    name="name"
                    value={flavor.name}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Flavor Type:
                <input
                    type="text"
                    name="type"
                    value={flavor.type}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Flavor Image URL:
                <input
                    type="text"
                    name="image_url"
                    value={flavor.image_url}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Flavor Description:
                <input
                    type="text"
                    name="description"
                    value={flavor.description}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Flavor Price:
                <input
                    type="text"
                    name="price"
                    value={flavor.price}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Create Flavor</button>
        </form>
    );
};

export default CreateNewFlavor;