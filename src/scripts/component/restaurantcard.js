import restaurantData from "../../public/data/DATA.json";

class RestaurantCard extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	async render() {
		try {
			const data = restaurantData;

			// Iterate over each restaurant and create a card
			data.restaurants.forEach((restaurant) => {
				const card = document.createElement("article");
				card.classList.add("product-item");

				card.innerHTML = `
                    <div class="product-section">
                        <img src="${restaurant.pictureId}" class="product-image" alt="${restaurant.name}">
                        <h3 class="product-city">${restaurant.city}</h3>
                    </div>
                    <div class="product-item-content">
                        <h4 class="product-rating">Rating: ${restaurant.rating}</h4>
                        <p class="product-desc">${restaurant.description}</p>
                    </div>
                `;

				this.appendChild(card);
			});
		} catch (error) {
			console.error("Error fetching and rendering data:", error);
		}
	}
}

customElements.define("restaurant-card", RestaurantCard);
