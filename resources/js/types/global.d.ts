import type { route as routeFn } from 'ziggy-js';
import { User } from '@/types';

declare module '@inertiajs/core' {
  interface PageProps {
    auth: {
      user: User;
    };
  }
}

declare global {
    const route: typeof routeFn;
}
