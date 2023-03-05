const express = require("express");
const reviewRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
    getAllReviews,
    getReviewsByFlavor,
    getReviewsByUser,
    createReview,
    updateReview,
    deleteReview
} = require("../db");


reviewRouter.get('/', async (req, res) => {
    try {
        const reviews = await getAllReviews();
        res.send(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while getting all Reviews');
    }
});

reviewRouter.post('/:id', requireUser, async (req, res) => {
    try {
        const { author_id, flavor_id, title, content } = req.body;
        console.log(req.body)

        const existingReview = await getReviewsByUser(author_id, flavor_id);
        console.log(existingReview)
        if (existingReview) {
            throw new Error(`A review by ${author_id} already exists for this ${flavor_id}!!`);
        }

        const createdReview = await createReview({ author_id, flavor_id, title, content });
        console.log(createdReview)
        res.send(createdReview);
    } catch (error) {
        next(error);
    }
});

reviewRouter.patch('/:id', requireUser, async (req, res, next) => {
    try {
        const { author_id, flavor_id, title, content } = req.body
        const reviewId = req.params.id;

        const existingReview = await getReviewsByFlavor(reviewId);
        if (!existingReview) {
            throw new Error(`Review already exists for this flavor!`)
        }

        const updatedReview = await updateReview({ author_id, flavor_id, title, content });

        res.send(updatedReview);
    } catch (error) {
        next(error);
    }
});

flavorRouter.delete("/:id", requireUser, async (req, res, next) => {
    const { author_id, flavor_id, title, content } = req.body
    const reviewId = req.params.id;

    try {
        const registeredReview = await getReviewsByUser(reviewId);

        if (registeredReview.id === reviewId) {
            await deleteReview(id);
            res.send(registeredReview);
        } else {
            res.status(403)
            next({
                error: "Deletetion Not Allowed",
                name: "PostNotFoundError",
                message: `User ${req.user.username} is not allowed to delete ${reviewId}`,
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
}
);
