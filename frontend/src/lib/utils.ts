import { type ClassValue, clsx } from 'clsx';
import { customAlphabet } from 'nanoid';

const randomId = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 25);

import { twMerge } from 'tailwind-merge';
const UUID_KEY = 'uuid';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getOperatingSystem = (): 'mac' | 'windows' | 'unknown' => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes('Mac OS X')) {
        return 'mac';
    }
    if (userAgent.includes('Windows')) {
        return 'windows';
    }
    return 'unknown';
};

export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
