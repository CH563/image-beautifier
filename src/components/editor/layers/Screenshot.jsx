import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Image, Box } from 'leafer-ui';
import stores from '@stores';
import { computedSize, getPosition, getMargin } from '@utils/utils';

export default observer(({ parent }) => {
    const [image, box] = useMemo(() => {
        const image = new Image({
            url: stores.editor.img.src,
            origin: 'center'
        });
        const box = new Box({
            overflow: 'hide',
            scale: 1,
            children: [image]
        });
        return [image, box];
    }, [parent]);

    useEffect(() => {
        if (stores.option.padding === 0) {
            box.fill = '#ffffff00'
        } else {
            box.fill = stores.option.paddingBg;
        }
    }, [stores.option.paddingBg, stores.option.padding]);

    useEffect(() => {
        box.cornerRadius = stores.option.round;
        image.cornerRadius = stores.option.round - 2;
    }, [stores.option.round]);

    useEffect(() => {
        const { shadow } = stores.option;
        if (shadow === 0) {
            box.shadow = null;
        } else {
            box.shadow = {
                x: shadow * 4,
                y: shadow * 4,
                blur: shadow * 3,
                color: '#00000045',
                box: true
            };
        }
    }, [stores.option.shadow]);

    useEffect(() => {
        box.scale = stores.option.scale;
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
        const margin = getMargin(stores.option.frameConf.width, stores.option.frameConf.height);
        const { width, height } = computedSize(stores.editor.img.width, stores.editor.img.height, stores.option.frameConf.width - margin, stores.option.frameConf.height - margin);
        image.width = width - stores.option.padding;
        image.height = height - stores.option.padding;
        box.width = width;
        box.height = height;
        box.origin = stores.option.align;
        const { x, y } = getPosition(stores.option.align, stores.option.frameConf.width - width, stores.option.frameConf.height - height);
        box.x = x;
        box.y = y;
        if (stores.option.padding > 0) {
            image.x = stores.option.padding / 2;
            image.y = stores.option.padding / 2;
        }
    }, [stores.option.frameConf.width, stores.option.frameConf.height, stores.option.padding, stores.option.align]);

    useEffect(() => {
        parent.add(box);
        return (() => {
            box.remove();
        })
    }, [parent]);
    return null;
});