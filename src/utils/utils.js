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

export const calculateRotatedRectDimensions = (width, height, angleDegrees) => {
    const angleRadians = angleDegrees * (Math.PI / 180);
    const newWidth = Math.abs(width * Math.cos(angleRadians)) + Math.abs(height * Math.sin(angleRadians));
    const newHeight = Math.abs(width * Math.sin(angleRadians)) + Math.abs(height * Math.cos(angleRadians));

    return {
        width: Math.round(newWidth),
        height: Math.round(newHeight)
    };
};

export const text2Svg = ({ text, color, angleDegrees }) => {
    const div = document.createElement('div');
    div.style = `text-align:center;white-space:nowrap;line-height:100px;transform: rotate(${angleDegrees}deg);position: absolute;top:0;left:0;opacity: 0;`;
    const span = document.createElement('span');
    span.style.color = color;
    span.style.fontSize = '36px';
    span.innerText = text;
    div.append(span);
    document.body.append(div);
    const { width, height } = div.getBoundingClientRect();
    document.body.removeChild(div);
    const result = calculateRotatedRectDimensions(width, height, angleDegrees);
    const divHtml = `
        <div xmlns="http://www.w3.org/1999/xhtml" style="text-align:center;white-space:nowrap;line-height:${result.height}px;transform:rotate(${angleDegrees}deg);">
            <span style="color:${color};font-size:36px;">${text}</span>
        </div>
    `;
    const data = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${result.width} ${result.height}" width="${result.width}" height="${result.height}">
                <foreignObject width="100%" height="100%">
                    ${divHtml}
                </foreignObject>
            </svg>`;
    const svgFile = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(svgFile);
    return url;
};
