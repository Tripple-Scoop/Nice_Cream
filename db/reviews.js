
//getAllReviews()- return an array of all reviews

async function getAllReviews() {
    try {
        const { rows } = await client.query(`
        SELECT * 
        FROM reviews
        INNER JOIN users
        ON users.id = reviews.author_id
        ;
      `);
        return rows;
    } catch (error) {
        throw error;
    }
}  //ask about linking username to authorId

//*createReview(userId, flavorId, title, content)- return new review

async function createReview({ author_id, flavor_id, title, content }) {
    try {
        const { rows: [review] } = await client.query(`
        INSERT INTO routines(author_id, flavor_id, title, content) 
        VALUES($1, $2, $3, $4) 
        ON CONFLICT (flavor_id) DO NOTHING 
        RETURNING *;
      `, [author_id, flavor_id, title, content]);

        return review;
    } catch (error) {
        throw error;
    }
}

//*(same author)updateReview(reviewId, userId)- return updated review object

async function updateReview({ author_id, flavor_id, title, content }) {
    let reviewToUpdate = {};
    if (author_id /*maybe username? */) {
        reviewToUpdate.author_id = author_id;
    }
    if (flavor_id) {
        reviewToUpdate.flavor_id = flavor_id;
    }
    if (title) {
        reviewToUpdate.title = title;
    }
    if (content) {
        reviewToUpdate.content = content;
    }

    const setString = Object.keys(reviewToUpdate)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [review], } = await client.query(
            `
        UPDATE reviews
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
            Object.values(reviewsToUpdate)
        );

        return review;
    } catch (error) {
        throw error;
    }
}
//getReviewsByUser(userId)- return array of reviews by specific user

//getReviewsByFlavor(flavorId)- return array of reviews for a specific flavor

//*(same author)deleteReview(reviewId, userId)-