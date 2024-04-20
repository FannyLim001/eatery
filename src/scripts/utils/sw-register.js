import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in the browser');
    return;
  }

  const wb = new Workbox('./sw.bundle.js');

  wb.addEventListener('waiting', () => {
    // Reload the page when a new service worker is waiting
    window.location.reload();
  });

  wb.addEventListener('activated', (event) => {
    if (!event.isUpdate) {
      // Service worker is activated for the first time
      console.log('Service worker registered');
    } else {
      // Service worker is activated due to an update
      console.log('Service worker updated');
    }
  });

  try {
    // Register the service worker
    await wb.register();

    // If registration is successful, log a message
    console.log('Service worker registration successful');
  } catch (error) {
    // If registration fails, log an error message
    console.error('Service worker registration failed:', error);
  }
};

export default swRegister;
