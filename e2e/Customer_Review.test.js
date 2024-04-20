/* eslint-disable no-undef */
Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});
Scenario('add user review', ({ I }) => {
  const restaurantId = 'rqdv5juczeskfw1e867';
  const productButtonSelector = `.product-button.product-${restaurantId}`;
  I.waitForVisible(productButtonSelector, 10);
  I.click(productButtonSelector);

  I.seeElement('#reviewForm');

  // Fill in the review form and submit a review
  const reviewerName = 'John Doe'; // Example reviewer name
  const reviewContent = 'This restaurant is amazing!'; // Example review content

  // Fill in the reviewer name
  I.fillField('#name', reviewerName);

  // Fill in the review content
  I.fillField('#review', reviewContent);

  // Submit the review by clicking the submit button
  I.click('Submit'); // Assuming the button text is "Submit"
});
