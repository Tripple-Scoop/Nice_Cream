import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllFlavors, fetchUpdateFlavor } from "../api/flavors";


const EditProduct = () => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchedAllFlavors = () => {
            fetchAllFlavors()
                .then((result) => {
                    setProduct(result);
                    console.log(result);
                })

                .catch((error) => {
                    console.log(error);
                });
        };
        fetchedAllFlavors();
    }, []);

    const [editProduct, setEditProduct] = useState({
        name: product.name,
        type: product.type,
        image_url: product.image_url,
        description: product.description,
        price: product.price
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        fetchUpdateFlavor(
            editProduct.name,
            editProduct.type,
            editProduct.image_url,
            editProduct.description,
            editProduct.price,
        )
            .then((result) => {
                setEditProduct(result);
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="product-name">Product Name:</label>
            <input
                id="product-name"
                type="text"
                name="name"
                value={editProduct.name}
                onChange={handleChange}
            />
            <label htmlFor="product-type">Product Type:</label>
            <input
                id="product-type"
                type="text"
                name="type"
                value={editProduct.type}
                onChange={handleChange}
            />

            <label htmlFor="product-image">Product image_url:</label>
            <input
                id="product-image"
                type="text"
                name="image_url"
                value={editProduct.image_url}
                onChange={handleChange}
            />

            <label htmlFor="product-description">Product Description:</label>
            <input
                id="product-description"
                type="text"
                name="description"
                value={editProduct.description}
                onChange={handleChange}
            />
            <label htmlFor="product-price">Product Price:</label>
            <input
                id="product-price"
                type="text"
                name="price"
                value={editProduct.price}
                onChange={handleChange}
            />
            <button type="submit">Update Product</button>
        </form>
    );
};

export default EditProduct;
