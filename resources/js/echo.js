import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

// Get userId from meta tag
const userId = document.querySelector('meta[name="user-id"]')?.getAttribute('content');

if (userId) {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: true,
        encrypted: true,
        authEndpoint: '/broadcasting/auth',
        auth: {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
            }
        }
    });

    window.Echo.private(`study-materials.${userId}`)
        .listen('.StudyMaterialUploaded', (e) => {
            console.log('Notification:', e);
            // Show notification here
        });
} else {
    console.error('User ID not found in meta tag');
}
