import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async restaurantList() {
    try {
      const response = await fetch(API_ENDPOINT.HOME);
      // Check if the response was ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      // Log the error or handle it as needed
      console.error('Error fetching restaurant list:', error);
      // Re-throw or handle the error appropriately
      throw error;
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      console.error(`Error fetching restaurant detail for ID ${id}:`, error);
      throw error;
    }
  }
}

export default RestaurantSource;
