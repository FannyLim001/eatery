import FavoriteRestaurantIdb from '../../data/fav-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
      <section class="content">
      <div class="latest">
        <h1>Favorite Restaurant</h1>
        <div class="products" id="restaurant">
        </div>
        <div class="not-found" id="notFoundMessage">Tidak ada restaurant untuk ditampilkan</div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('#restaurant');
    const notFoundMessage = document.querySelector('#notFoundMessage');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorIndicator = document.getElementById('errorIndicator');

    try {
      loadingIndicator.classList.remove('hidden'); // Show loading indicator
      const restaurant = await FavoriteRestaurantIdb.getAllRestaurant();
      restaurantContainer.innerHTML = '';
      if (restaurant.length > 0) {
        // Display restaurant items
        restaurantContainer.innerHTML = '';
        restaurant.forEach((movie) => {
          restaurantContainer.innerHTML += createRestaurantItemTemplate(movie);
        });
        notFoundMessage.classList.add('hidden'); // Hide the "not found" message
      } else {
        // No restaurant data available
        notFoundMessage.classList.remove('hidden'); // Show the "not found" message
        restaurantContainer.innerHTML = ''; // Clear restaurant container
      }
      loadingIndicator.classList.add('hidden'); // Hide loading indicator
    } catch (error) {
      loadingIndicator.classList.add('hidden'); // Ensure loading indicator is hidden on error
      errorIndicator.textContent = `Error: ${error.message}`;
      errorIndicator.classList.remove('hidden'); // Show error message
      errorIndicator.classList.add('error-message'); // Apply error styling
    }
  },
};

export default Like;
