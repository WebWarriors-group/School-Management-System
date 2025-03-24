import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export default function InputError({ message, className = '', ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p {...props} className={cn('text-sm text-red-800 dark:text-red-800  bg-red-200 rounded-md h-10 w-80 flex items-center justify-center', className)}>
            {message}
        </p>
    ) : null;
}
