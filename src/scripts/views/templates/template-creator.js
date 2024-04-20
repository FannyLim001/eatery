import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <article class="detail">
    <figure class="detail__figure">
      <img src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" alt="${restaurant.name}" />
      <figcaption>Foto Restaurant ${restaurant.name}</figcaption>
      <div class="add__review">
        <h3>Add Review</h3>
        <form id="reviewForm" method="POST">
            <input type="hidden" name="id" value="${restaurant.id}"/>
            <label for="name">Nama:</label>
            <input type="text" id="name" name="name" placeholder="Udin"/>
            <label for="review">Review:</label>
            <textarea id="review" name="review" placeholder="Makanannya..."></textarea>
            <button type="submit">Submit</button>
        </form>
    </div>
    </figure>
    <div class="detail__content">
      <h1 class="detail__title">${restaurant.name}</h1>
      <h3><i class="fa-solid fa-location-dot"></i> ${restaurant.address}, ${restaurant.city}</h3>
      <p class="detail__description">
        ${restaurant.description}
      </p>
      <br>
      <h3 class="detail__subtitle">Food Menu</h3>
      <div class="food_menu" id="food_menu">
        ${restaurant.menus.foods.map((food) => `<p><i class="fa-solid fa-bowl-food"></i> ${food.name}</p>`).join('')}
      </div>
      <br>
      <h3 class="detail__subtitle">Drink Menu</h3>
      <div class="drink_menu" id="drink_menu">
        ${restaurant.menus.drinks.map((drink) => `<p><i class="fa-solid fa-mug-hot"></i> ${drink.name}</p>`).join('')}
      </div>
      <br>
      <h3 class="detail__subtitle">Reviews</h3>
      <div class="customer_reviews">
        ${restaurant.customerReviews.map((review) => `
          <div class="review">
            <p><q>${review.review}</q></p>
            <h3>${review.name} - <span>${review.date}</span></h3>
          </div>
        `).join('')}
      </div>
    </div>
  </article>
`;

const createRestaurantItemTemplate = (restaurant) => `
<article class="product-item">    
    <div class="product-section">
        <img data-src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" class="lazyload product-image" alt="${restaurant.name}">
        <h3 class="product-city">${restaurant.city}</h3>
    </div>
    <div class="product-item-content"><h4 class="product-name">${restaurant.name}</h4>
        <h4 class="product-rating">Rating: ${restaurant.rating}</h4>
        <p class="product-desc">${restaurant.description}</p>
        <a class="product-button product-${restaurant.id}" href="#/detail/${restaurant.id}">Read More</a>
    </div>
</article>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate, createRestaurantDetailTemplate, createLikeButtonTemplate,
  createLikedButtonTemplate,
};
