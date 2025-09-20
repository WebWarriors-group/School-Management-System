import Echo from 'laravel-echo';

declare global {
  interface Window {
    Echo: Echo;
    Pusher: any; // if you also add window.Pusher
  }
}
