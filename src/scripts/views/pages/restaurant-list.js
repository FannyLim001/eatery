import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const RestaurantList = {
  async render() {
    return `
    <section class="content">
      <article class="headline">
        <figure class="headline__figure">
          <picture>
            <source media="(max-width: 600px)" srcset="./images/heros/hero-image_4-small.jpg" width="480" height="320">
            <img src="./images/heros/hero-image_4-large.jpg" width="800" height="533" alt="img" />
          </picture>
          <figcaption>Eatery Storytime</figcaption>
        </figure>
        <div class="headline__content">
          <h1 class="headline__title">Story of Eatery</h1>
          <p class="headline__description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus eum
            facere nostrum officiis qui quidem ratione similique, soluta veniam
            voluptatum. Accusantium ad amet asperiores, aut commodi corporis dicta
            distinctio ducimus expedita itaque laudantium magnam maiores, nobis
            obcaecati officiis provident quasi qui quos repellat rerum saepe sint soluta
            veniam vero vitae, voluptas voluptate voluptatem. Esse nobis non nulla optio
            vero. Laudantium!
          </p>
          <button class="headline__button">Read More</button>
        </div>
      </article>
      <div class="latest">
        <h1>Restaurant</h1>
        <div class="products" id="restaurant">
        </div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const restaurantsContainer = document.querySelector('#restaurant');

    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorIndicator = document.getElementById('errorIndicator');

    try {
      loadingIndicator.classList.remove('hidden'); // Show loading indicator
      const restaurants = await RestaurantSource.restaurantList();
      restaurantsContainer.innerHTML = '';
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
      loadingIndicator.classList.add('hidden'); // Hide loading indicator
    } catch (error) {
      loadingIndicator.classList.add('hidden'); // Ensure loading indicator is hidden on error
      errorIndicator.textContent = 'Error loading restaurant';
      errorIndicator.classList.remove('hidden'); // Show error message
      errorIndicator.classList.add('error-message'); // Apply error styling
    }
  },
};

export default RestaurantList;
