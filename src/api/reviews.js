import { API_URL } from "./url";

export const fetchAllReviews = async () => {
    try {
        const res = await fetch(`${API_URL}reviews`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const reviewData = await res.json();
        return reviewData

        // console.log(reviewData)
    } catch (e) {
        console.error(e)
    }
};



export const fetchCreateReview = async (author_id, flavor_id, title, content) => {
    try {
        const response = await fetch(`${API_URL}reviews/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                author_id: author_id,
                flavor_id: flavor_id,
                title: title,
                content: content
            })
        });
        const newReviewData = await response.json();
        return newReviewData;
    } catch (e) {
        console.error(e)
    }
};

export const fetchUpdateReview = async (title, content) => {
    try {
        const response = await fetch(`${API_URL}reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        });
        const newUpdatedReviewData = await response.json();
        return newUpdatedReviewData;
    } catch (e) {
        console.error(e)
    }
};


export const fetchDeleteReview = async () => {
    try {
        const response = await fetch(`${API_URL}reviews/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });
        const deletedFlavor = await response.json();
        return deletedFlavor;
    } catch (e) {
        console.error(e)
    }
};
