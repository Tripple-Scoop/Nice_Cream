const express = require("express");
const flavorRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
    createFlavor,
    getAllFlavors,
    getFlavorById,
    getFlavorByName,
    updateFlavor,
    deleteFlavor
} = require("../db");
const { requireUser } = require("./utils");


// SUNNY //

flavorRouter.get('/', async (req, res) => {
    try {
        const flavors = await getAllFlavors();
        res.send(flavors);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while getting all flavors');
    }
});


flavorRouter.post('/:name', async (req, res) => {
    try {
        const { name, type, image_url, description } = req.body;
        console.log(req.body)

        const existingFlavor = await getFlavorByName(name);
        console.log(existingFlavor)
        if (existingFlavor) {
            throw new Error(`The Flavor ${name} already exists!!`);
        }

        const createdFlavor = await createFlavor({ name, type, image_url, description });
        console.log(createdFlavor)
        res.send(createdFlavor);
    } catch (error) {
        next(error);
    }
});

flavorRouter.patch("/:id", async (req, res, next) => {
    try {
        const { name, type, image_url, description } = req.body;
        const flavorId = req.params.id;
        const existingFlavor = await getFlavorById(flavorId);

        if (!existingFlavor) {
            throw new Error(`There is no Flavor with this ${flavorId} id`);
        }

        const conflictFlavor = await getFlavorByName(name);

        if (conflictFlavor && conflictFlavor.id !== flavorId) {
            throw new Error(`The flavor ${name} does not exists`);
        }

        const updatedFlavor = await updateFlavor({
            name,
            type,
            image_url,
            description,
        });

        res.send(updatedFlavor);
    } catch (error) {
        next(error);
    }
});

flavorRouter.delete("/:id", requireUser, async (req, res, next) => {
    const { flavorId } = req.params.id;
    const { name, type, image_url, description } = req.body;

    try {

        const registeredFlavor = await getFlavorById(id);

        if (registeredFlavor.id === flavorId) {
            await deleteFlavor(id);
            res.send(registeredFlavor);
        } else {
            res.status(403)
            next({
                error: "Deletetion Not Allowed",
                name: "PostNotFoundError",
                message: `User ${req.user.username} is not allowed to delete ${flavors.name}`,
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
}
);

module.exports = flavorRouter;