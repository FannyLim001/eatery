class RestaurantCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async render() {
    try {
      // Fetch data from the API
      const response = await fetch('https://restaurant-api.dicoding.dev/list');
      const data = await response.json();

      // Check if the response contains the restaurants data
      if (data && data.restaurants) {
        // Iterate over each restaurant and create a card
        data.restaurants.forEach((restaurant) => {
          const card = document.createElement('article');
          card.classList.add('product-item');

          card.innerHTML = `
                        <div class="product-section">
                            <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" class="product-image" alt="${restaurant.name}">
                            <h3 class="product-city">${restaurant.city}</h3>
                        </div>
                        <div class="product-item-content"><h4 class="product-name">${restaurant.name}</h4>
                            <h4 class="product-rating">Rating: ${restaurant.rating}</h4>
                            <p class="product-desc">${restaurant.description}</p>
                        </div>
                    `;

          this.appendChild(card);
        });
      } else {
        throw new Error('Restaurants data is not available.');
      }
    } catch (error) {
      console.error('Error fetching and rendering data:', error);
    }
  }
}

customElements.define('restaurant-card', RestaurantCard);
