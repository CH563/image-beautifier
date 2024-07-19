import { customAlphabet } from 'nanoid/non-secure';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const supportImg = [
    'image/jpeg',
    'image/png',
    'image/bmp',
    'image/gif',
    'image/webp',
];

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

export const computedSize = (w, h, maxWidth = 950, maxHeight = 450) => {
    let width = w;
    let height = h;

    // 检查图片是否超过最大宽度
    if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
    }

    // 检查图片是否超过最大高度
    if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
    }
    return { width, height };
};

export const getImage = (src) => {
    const img = new Image();
    // cors
    if (!src.startsWith('data')) {
        img.crossOrigin = 'Anonymous';
    }
    return new Promise(function (resolve, reject) {
        img.onload = function () {
            resolve(img);
        };
        const errorHandler = function () {
            return reject(
                new Error('An error occurred attempting to load image')
            );
        };
        img.onerror = errorHandler;
        img.onabort = errorHandler;
        img.src = src;
    });
};