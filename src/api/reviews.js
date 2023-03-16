import { API_URL } from "./url";

export const fetchAllReviews = async () => {
    try {
        const res = await fetch(`${API_URL}reviews`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const reviewsData = await res.json();
        return reviewsData

        // console.log(flavorsData)
    } catch (e) {
        console.error(e)
    }
};

export const fetchReviewsByFlavorId = async (flavor_id) => {
    try {
        const res = await fetch(`${API_URL}reviews/${flavor_id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const reviewIdData = await res.json();
        console.log("ReviewIdData", reviewIdData)
        return reviewIdData;

    } catch (e) {
        console.error(e)
    }
};

export const fetchCreateReview = async (flavor_id, title, content) => {
    try {
        const response = await fetch(`${API_URL}reviews/${flavor_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        });
        const newFlavorData = await response.json();
        return newFlavorData;
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
        const response = await fetch(`${API_URL}flavors/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });
        const deletedReview = await response.json();
        return deletedReview;
    } catch (e) {
        console.error(e)
    }
};