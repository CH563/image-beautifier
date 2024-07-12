import { customAlphabet } from 'nanoid/non-secure';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// 7-character random string
export const nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    7
);

export const toDownloadFile = (url, name) => {
    let tmpLink = document.createElement('a');
    tmpLink.href = url;
    tmpLink.download = name;
    tmpLink.style = 'position: absolute; z-index: -111; visibility: none;';
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
    tmpLink = null;
};
