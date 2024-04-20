/* eslint-disable no-unused-vars */
// Import required modules
import 'regenerator-runtime'; // for async await transpile
import '../styles/main.css';
import '../styles/responsive.css';
import swRegister from './utils/sw-register';

import './component/loading-indicator';
import './component/error-indicator';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// eslint-disable-next-line no-unused-vars
const START = 10;
// eslint-disable-next-line no-unused-vars
const NUMBER_OF_IMAGES = 100;

// Function to handle skip link behavior
function handleSkipLink() {
  const skipLinks = document.querySelectorAll('.skip-link');
  skipLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const mainContent = document.getElementById('mainContent');
      if (mainContent) {
        event.preventDefault();
        // Menambahkan tabindex jika belum ada untuk memungkinkan fokus
        if (!mainContent.hasAttribute('tabindex')) {
          mainContent.setAttribute('tabindex', '-1');
        }
        mainContent.scrollIntoView({ behavior: 'smooth' });
        // Menetapkan fokus ke mainContent
        mainContent.focus();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    // eslint-disable-next-line func-names
    reviewForm.addEventListener('submit', async function (event) {
      event.preventDefault(); // Prevent default form submission
      const restaurantId = this.querySelector('input[name="id"]').value;

      // Dynamically import the App module only when needed with a unique chunk name
      const { default: App } = await import(/* webpackChunkName: "appReviewForm" */ './views/app');
      const app = new App({
        button: document.querySelector('#menu'),
        drawer: document.querySelector('#drawer'),
        content: document.querySelector('#mainContent'),
      });

      window.location.href = `/#/detail/${restaurantId}`;
    });
  }
});

// Initialize the application after the DOM content is loaded
window.addEventListener('load', () => {
  // Dynamically import the App module only when needed with a different chunk name
  import(/* webpackChunkName: "appLoadEvent" */ './views/app').then(({ default: App }) => {
    const app = new App({
      button: document.querySelector('#menu'),
      drawer: document.querySelector('#drawer'),
      content: document.querySelector('#mainContent'),
    });

    app.renderPage();
    swRegister();
    handleSkipLink(); // Call the function to handle skip link behavior
  });

  // Handle hashchange event to render page
  window.addEventListener('hashchange', () => {
    // Re-import the App module with a unique chunk name to ensure the latest version is used
    import(/* webpackChunkName: "appHashChange" */ './views/app').then(({ default: App }) => {
      const app = new App({
        button: document.querySelector('#menu'),
        drawer: document.querySelector('#drawer'),
        content: document.querySelector('#mainContent'),
      });

      app.renderPage();
    }).catch((error) => {
      console.error('Error loading App module:', error);
    });
  });
});
