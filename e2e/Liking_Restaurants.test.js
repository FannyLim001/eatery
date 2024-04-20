/* eslint-disable no-undef */
Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/like');
});
Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#notFoundMessage');
  I.see('Tidak ada restaurant untuk ditampilkan', '.not-found');
});

Scenario('liking one restaurant', ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.not-found');

  I.amOnPage('/');

  const restaurantId = 'rqdv5juczeskfw1e867';
  const productButtonSelector = `.product-button.product-${restaurantId}`;
  I.waitForVisible(productButtonSelector, 10);
  I.click(productButtonSelector);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.products');
});

Scenario('Unliking one restaurant', ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.not-found');

  I.amOnPage('/');

  const restaurantId = 'rqdv5juczeskfw1e867';
  const productButtonSelector = `.product-button.product-${restaurantId}`;
  I.waitForVisible(productButtonSelector, 10);
  I.click(productButtonSelector);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.products');

  I.waitForVisible(productButtonSelector, 10);
  I.click(productButtonSelector);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.dontSeeElement('.products');
});
