import { useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Rect } from 'leafer-ui';
import stores from '@stores';
import { computedSize, getPosition, getMargin } from '@utils/utils';
import macosIcon from '@utils/macosIcon';
import { windowDark, windowLight } from '@utils/windowsIcon';
import macbookpro16 from '@assets/macbook-pro-16.png';
import macbookair from '@assets/macbook-air.png';
import imacpro from '@assets/imac-pro.png';
import ipadpro from '@assets/ipadpro.png';
import iphonepro from '@assets/iphonepro.png';
import { debounce } from 'lodash';

const info = {
    macbookpro16: {
        image: macbookpro16,
        width: 1920,
        height: 1266,
        horizontal: 4 / 5,
        vertical: 26 / 33,
        top: 7 / 66
    },
    macbookair: {
        image: macbookair,
        width: 1920,
        height: 1147,
        horizontal: 396 / 500,
        vertical: 258 / 299,
        top: 9 / 299
    },
    imacpro: {
        image: imacpro,
        width: 1920,
        height: 1599,
        horizontal: 112 / 125,
        vertical: 252 / 417,
        top: 29 / 417
    },
    ipadpro: {
        image: ipadpro,
        width: 1920,
        height: 1425,
        horizontal: 430 / 500,
        vertical: 302 / 372,
        top: 35 / 372
    },
    iphonepro: {
        image: iphonepro,
        width: 968,
        height: 1920,
        horizontal: 214 / 253,
        vertical: 462 / 500,
        top: 19 / 500
    }
};

const createSnap = debounce(() => {
    stores.editor.createSnap('update');
}, 100);

export default observer(({ parent }) => {
    const bar = useRef(null);
    const [image, box, container] = useMemo(() => {
        const image = new Rect({
            origin: 'center'
        });
        const box = new Box({
            overflow: 'hide',
            children: [image]
        });
        const container = new Box({
            id: 'screenshot-box',
            overflow: 'hide',
            strokeAlign: 'outside',
            scale: 1,
            fill: '#ffffff00',
            children: [box]
        });
        return [image, box, container];
    }, [parent]);

    useEffect(() => {
        image.fill = {
            type: 'image',
            url: stores.editor.img.src,
            align: stores.option.mode === 'fit' ? 'center' : 'top',
            mode: stores.option.mode
        };
        createSnap();
    }, [stores.option.mode]);

    useEffect(() => {
        if (stores.option.padding === 0 && !info[stores.option.frame]) {
            box.fill = '#ffffff00';
        } else {
            box.fill = stores.option.paddingBg;
        }
        createSnap();
    }, [stores.option.paddingBg, stores.option.padding]);

    useEffect(() => {
        const { round } = stores.option;
        container.cornerRadius = round;
        if (!bar.current || info[stores.option.frame]) {
            image.cornerRadius = round;
        }
        createSnap();
    }, [stores.option.round]);

    useEffect(() => {
        const { shadow } = stores.option;
        if (shadow === 0 || stores.option.frame === 'macbookpro16') {
            container.shadow = null;
        } else {
            container.shadow = {
                x: shadow * 4,
                y: shadow * 4,
                blur: shadow * 3,
                color: '#00000045',
                box: true
            };
        }
        createSnap();
    }, [stores.option.shadow]);

    useEffect(() => {
        container.scale = stores.option.scale;
        createSnap();
    }, [stores.option.scale]);

    useEffect(() => {
        image.url = stores.editor.img.src;
    }, [stores.editor.img.src]);

    useEffect(() => {
        image.scaleX = stores.option.scaleX ? -1 : 1;
        createSnap();
    }, [stores.option.scaleX]);

    useEffect(() => {
        image.scaleY = stores.option.scaleY ? -1 : 1;
        createSnap();
    }, [stores.option.scaleY]);


    useEffect(() => {
        const { align, frame, frameConf, shadow, round, padding } = stores.option;
        const { img } = stores.editor;
        const margin = getMargin(frameConf.width, frameConf.height);
        const { width, height } = computedSize(img.width, img.height, frameConf.width - margin, frameConf.height - margin);
        let totalHeight = height;
        let boxX = 0;
        let boxY = 0;
        let boxWidth = width;
        let boxHeight = height;
        switch (frame) {
            case 'light':
                container.strokeWidth = 8;
                container.stroke = '#ffffff80';
                break;
            case 'dark':
                container.strokeWidth = 8;
                container.stroke = '#00000050';
                break;
            case 'macosBarLight':
            case 'macosBarDark':
            case 'windowsBarLight':
            case 'windowsBarDark':
                totalHeight += 32;
                boxY = 32;
                const barUrl = {
                    mac: { type: 'image', url: macosIcon, format: 'svg', mode: 'clip', offset: { x: 10, y: 0 } },
                    windowsBarLight: { type: 'image', url: windowDark, format: 'svg', mode: 'clip', offset: { x: width - 105, y: 0 } },
                    windowsBarDark: { type: 'image', url: windowLight, format: 'svg', mode: 'clip', offset: { x: width - 105, y: 0 } },
                }
                bar.current = new Rect({
                    x: 0,
                    y: 0,
                    height: 32,
                    width: width,
                    fill: [
                        { type: 'solid', color: frame.includes('Dark')? '#3a3a3b' : '#ffffff' },
                        barUrl[frame] || barUrl.mac
                    ]
                });
                container.addAfter(bar.current, box);
                box.cornerRadius = null;
                image.cornerRadius = null;
                break;
            case 'macbookpro16':
            case 'macbookair':
            case 'imacpro':
            case 'ipadpro':
            case 'iphonepro':
                const device = info[frame];
                const bgSize = computedSize(device.width, device.height, width, height);
                bar.current = new Rect({
                    x: 0,
                    y: 0,
                    height,
                    width,
                    fill: [
                        {
                            type: 'image', url: device.image, align: 'center', mode: 'clip',
                            size: {
                                width: bgSize.width,
                                height: bgSize.height
                            }
                        },
                    ]
                });
                boxWidth = bgSize.width * device.horizontal;
                boxHeight = bgSize.height * device.vertical;
                boxX = (width - boxWidth) / 2;
                boxY = (bgSize.height * device.top) + (height - bgSize.height) / 2;
                container.shadow = null;
                box.cornerRadius = frame === 'iphonepro' ? bgSize.width * 1/10 : null;
                container.addAfter(bar.current, box);
                break;
            default:
                container.strokeWidth = null;
                container.stroke = null;
        };
        const { x, y } = getPosition(align, frameConf.width - width, frameConf.height - totalHeight);
        container.width = width;
        container.height = totalHeight;
        container.origin = align;
        container.x = x;
        container.y = y;
        box.width = boxWidth;
        box.height = boxHeight;
        box.x = boxX;
        box.y = boxY;
        const imageWidth = boxWidth - padding;
        const imageheight = Math.round(imageWidth * boxHeight / boxWidth);
        image.width = imageWidth + 2; // 解决有缝隙的问题
        image.height = imageheight + 2;
        image.x = padding / 2 - 1;
        image.y = (boxHeight - imageheight) / 2 - 1;
        createSnap();
        return (() => {
            container.strokeWidth = null;
            container.stroke = null;
            bar.current?.remove();
            bar.current = null;
            box.cornerRadius = null;
            image.cornerRadius = round;
            container.cornerRadius = round;
            container.shadow = {
                x: shadow * 4,
                y: shadow * 4,
                blur: shadow * 3,
                color: '#00000045',
                box: true
            };
        });
    }, [stores.option.frameConf.width, stores.option.frameConf.height, stores.option.padding, stores.option.align, stores.option.frame]);

    useEffect(() => {
        parent.add(container);
        return (() => {
            container.remove();
        })
    }, [parent]);
    return null;
});