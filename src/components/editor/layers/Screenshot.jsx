import { useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Rect } from 'leafer-ui';
import stores from '@stores';
import { computedSize, getPosition, getMargin } from '@utils/utils';
import macosIcon from '@utils/macosIcon';

export default observer(({ parent }) => {
    const bar = useRef(null);
    const [image, box, container] = useMemo(() => {
        const image = new Rect({
            origin: 'center',
            fill: {
                type: 'image',
                url: stores.editor.img.src
            }
        });
        const box = new Box({
            overflow: 'hide',
            children: [image]
        });
        const container = new Box({
            overflow: 'hide',
            strokeAlign: 'outside',
            scale: 1,
            fill: '#ffffff00',
            children: [box]
        });
        return [image, box, container];
    }, [parent]);

    useEffect(() => {
        if (stores.option.padding === 0) {
            box.fill = '#ffffff00'
        } else {
            box.fill = stores.option.paddingBg;
        }
    }, [stores.option.paddingBg, stores.option.padding]);

    useEffect(() => {
        const { round } = stores.option;
        container.cornerRadius = round;
        if (bar.current) {
            bar.current.cornerRadius = [round, round, 0, 0];
            box.cornerRadius = [0, 0, round, round];
            image.cornerRadius = [0, 0, round, round];
        } else {
            box.cornerRadius = round;
            image.cornerRadius = round;
        }
    }, [stores.option.round]);

    useEffect(() => {
        const { shadow } = stores.option;
        if (shadow === 0) {
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
    }, [stores.option.shadow]);

    useEffect(() => {
        container.scale = stores.option.scale;
    }, [stores.option.scale]);

    useEffect(() => {
        image.url = stores.editor.img.src;
    }, [stores.editor.img.src]);

    useEffect(() => {
        image.scaleX = stores.option.scaleX ? -1 : 1;
    }, [stores.option.scaleX]);

    useEffect(() => {
        image.scaleY = stores.option.scaleY ? -1 : 1;
    }, [stores.option.scaleY]);


    useEffect(() => {
        const { align, round, frame, frameConf } = stores.option;
        const margin = getMargin(frameConf.width, frameConf.height);
        const { width, height } = computedSize(stores.editor.img.width, stores.editor.img.height, frameConf.width - margin, frameConf.height - margin);
        let totalHeight = height;
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
                totalHeight += 32;
                bar.current = new Rect({
                    x: 0,
                    y: 0,
                    height: 32,
                    width: width,
                    cornerRadius: [round, round, 0, 0],
                    draggable: true,
                    fill: [
                        { type: 'solid', color: frame.includes('Dark')? '#3a3a3b' : '#ffffff' },
                        {type: 'image', url: macosIcon, format: 'svg', mode: 'clip', offset: {x: 10, y: 0}}
                    ]
                });
                container.addAfter(bar.current, box);
                box.cornerRadius = [0, 0, round, round]
                image.cornerRadius = [0, 0, round, round]
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
        box.width = width;
        box.height = height;
        box.x = 0;
        box.y = totalHeight - height;
        const imageWidth = width - stores.option.padding;
        const imageheight = Math.round(imageWidth * height / width);
        image.width = imageWidth + 2; // 解决有缝隙的问题
        image.height = imageheight + 2;
        image.x = stores.option.padding / 2 - 1;
        image.y = (height - imageheight) / 2 - 1;
        return (() => {
            container.strokeWidth = null;
            container.stroke = null;
            bar.current?.remove();
            bar.current = null;
            box.cornerRadius = stores.option.round;
            image.cornerRadius = stores.option.round;
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