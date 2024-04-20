/* eslint-disable no-alert */
import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import postReview from '../../utils/review';

const Detail = {
  async render() {
    return `
      <section class="content" id="detail">
      </section>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantContainer = document.querySelector('#detail');

    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorIndicator = document.getElementById('errorIndicator');

    try {
      loadingIndicator.classList.remove('hidden'); // Show loading indicator
      const restaurant = await RestaurantSource.detailRestaurant(url.id);
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
      this.initReviewForm();
      loadingIndicator.classList.add('hidden'); // Hide loading indicator

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          city: restaurant.city,
          rating: restaurant.rating,
          pictureId: restaurant.pictureId,
        },
      });
    } catch (error) {
      loadingIndicator.classList.add('hidden'); // Ensure loading indicator is hidden on error
      errorIndicator.textContent = `Error: ${error.message}`;
      errorIndicator.classList.remove('hidden'); // Show error message
      errorIndicator.classList.add('error-message'); // Apply error styling
    }
  },
  initReviewForm() {
    const reviewForm = document.getElementById('reviewForm');

    if (reviewForm) {
      reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
          const formData = new FormData(reviewForm); // Get form data
          const reviewData = Object.fromEntries(formData); // Convert FormData to object

          const response = await postReview(reviewData); // Submit review data
          console.log('Review submitted:', response);
          alert('Review submitted successfully!');

          window.location.reload();
        } catch (error) {
          console.error('Failed to submit review:', error);
          alert('Failed to submit review');
        }
      });
    }
  },
};

export default Detail;
