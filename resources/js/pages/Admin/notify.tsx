import React, { useEffect, useState, useRef, memo } from 'react';
import { usePage } from '@inertiajs/react';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

interface AuthUser {
  id: number;
  name?: string;
}

interface CustomPageProps extends InertiaPageProps {
  auth?: {
    user?: AuthUser;
  };
}

interface StudyMaterial {
  id: number;
  title: string;
  grade: string;
  subject: string;
}

interface NotificationEvent {
  material: StudyMaterial;
}

const NotificationListener: React.FC = () => {
  const { auth } = usePage<CustomPageProps>().props;
  const userId = auth?.user?.id;

  const [notification, setNotification] = useState<NotificationEvent | null>(null);
  const notificationRef = useRef<NotificationEvent | null>(null);

  useEffect(() => {
    notificationRef.current = notification;
  }, [notification]);

  useEffect(() => {
    console.log('NotificationListener useEffect fired, userId:', userId);

    if (!userId) {
      console.log('No userId, exiting listener setup');
      return;
    }

    if (!window.Echo) {
      console.log('Initializing Pusher & Echo with key:', import.meta.env.VITE_PUSHER_APP_KEY);
      window.Pusher = Pusher;
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: true,
        encrypted: true,
        authEndpoint: '/broadcasting/auth',
        auth: {
          headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '',
          },
        },
      });
    } else {
      console.log('Echo already initialized');
    }

    const channelName = `study-materials.${userId}`;
    console.log('Subscribing to channel:', channelName);
    const channel = window.Echo.private(channelName);

    channel.listen('.StudyMaterialUploaded', (e: NotificationEvent) => {
      console.log('Received StudyMaterialUploaded event:', e);

      if (
        notificationRef.current &&
        notificationRef.current.material.id === e.material.id
      ) {
        console.log('Duplicate notification received, ignoring');
        return;
      }

      setNotification(e);

      // ** Removed auto-dismiss timeout so notification stays visible **
    });

    return () => {
      console.log('Cleaning up NotificationListener, leaving channel:', channelName);
      window.Echo.leave(channelName);
    };
  }, [userId]);

  if (!notification) return null;

  return (
    <div className="fixed top-5 right-5 max-w-sm py-4 px-6
  bg-gradient-to-br from-blue-900/30 to-sky-500/20
  border border-blue-500 rounded-lg shadow-lg z-50 backdrop-blur-md text-white">


     
    
      <strong className="block mb-2">New Study Material Uploaded!</strong>
      <p><b>Title:</b> {notification.material.title}</p>
      <p><b>Grade:</b> {notification.material.grade}</p>
      <p><b>Subject:</b> {notification.material.subject}</p>
      <a
        href={`/study-materials/${notification.material.id}`}
        className="text-blue-600 underline"
        onClick={() => setNotification(null)}
      >
        View Material
      </a>
      <button
        onClick={() => setNotification(null)}
        className="ml-4 text-gray-500 hover:text-gray-700"
        aria-label="Close notification"
        type="button"
      >
        ✖
      </button>
    </div>
  );
};

export default memo(NotificationListener);
