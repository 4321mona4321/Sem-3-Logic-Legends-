// Sample array to store reviews
const reviews = [];

// Function to submit reviews
function submitReview() {
    const nameInput = document.getElementById('name');
    const reviewInput = document.getElementById('review');

    const name = nameInput.value;
    const review = reviewInput.value;

    if (name && review) {
        // Add the review to the array
        reviews.push({ name, review });

        // Clear the form fields
        nameInput.value = '';
        reviewInput.value = '';

        // Update the displayed reviews
        displayReviews();
    } else {
        alert('Please enter both name and review.');
    }
}

// Function to display reviews
function displayReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = '';

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `<strong>${review.name}:</strong> ${review.review}`;
        reviewsContainer.appendChild(reviewElement);
    });
}

// Call the function to display reviews when the page loads
document.addEventListener('DOMContentLoaded', displayReviews);
