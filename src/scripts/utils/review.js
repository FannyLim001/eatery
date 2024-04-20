// reviewAPI.js
import CONFIG from '../globals/config';

async function postReview(reviewData) {
  const url = `${CONFIG.BASE_URL}/review`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error(`Failed to post review: ${response.status} ${response.statusText}`);
    }

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error('Error posting review:', error);
    throw error;
  }
}

export default postReview;
