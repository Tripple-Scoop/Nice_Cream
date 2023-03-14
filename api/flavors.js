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
const { requireAdmin } = require("./utils");


// SUNNY //

flavorRouter.get('/', async (req, res) => {
    try {
        const flavors = await getAllFlavors();
        res.send(flavors);
        console.log(flavors)
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while getting all flavors');
    }
});


flavorRouter.post('/:name', requireAdmin, async (req, res, next) => {
    try {
        const { name, type, image_url, description, price } = req.body;
        console.log(req.body)

        const existingFlavor = await getFlavorByName(name);
        console.log(existingFlavor)
        if (existingFlavor) {
            throw new Error(`The Flavor ${name} already exists!!`);
        }

        const createdFlavor = await createFlavor({ name, type, image_url, description, price });
        console.log(createdFlavor)
        res.send(createdFlavor);
    } catch (error) {
        next(error);
    }
});

flavorRouter.patch("/:id", requireUser, async (req, res, next) => {
    try {
        const { name, type, image_url, description, price } = req.body;
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
            id: flavorId,
            name,
            type,
            image_url,
            description,
            price
        });

        res.send(updatedFlavor);
    } catch (error) {
        next(error);
    }
});

flavorRouter.delete("/:id", requireAdmin, async (req, res, next) => {
    const flavorId = req.params.id;
    const { name, type, image_url, description } = req.body;
    console.log("flavorID", flavorId)
    try {

        const registeredFlavor = await getFlavorById(flavorId);
        console.log("registeredFlav", registeredFlavor)
        if (registeredFlavor.id === flavorId) {
            await deleteFlavor(id);
            res.send(registeredFlavor);
        } else {
            res.status(403)
            next({
                error: "Deletetion Not Allowed",
                name: "PostNotFoundError",
                message: `User ${req.user.username} is not allowed to delete ${registeredFlavor.name}`,
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
}
);

module.exports = flavorRouter;