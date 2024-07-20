import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Image } from 'leafer-ui';
import { Flow } from '@leafer-in/flow';
import stores from '@stores';
import { computedSize } from '@utils/utils';

export default observer(({ parent }) => {
    const [image, box, flow] = useMemo(() => {
        const image = new Image({
            width: 640,
            height: 427,
            url: stores.editor.img.src
        });
        const box = new Flow({
            width: 640,
            height: 427,
            flowAlign: 'center',
            overflow: 'hide',
            scale: 1,
            children: [image]
        });
        const flow = new Flow({ children: [box], width: stores.option.frameConf.width, height: stores.option.frameConf.height, flowAlign: 'center', zIndex: 0 });
        return [image, box, flow];
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
    }, [stores.option.scale])

    useEffect(() => {
        flow.width = stores.option.frameConf.width;
        flow.height = stores.option.frameConf.height;
        const { width, height } = computedSize(stores.editor.img.width, stores.editor.img.height, stores.option.frameConf.width - 40, stores.option.frameConf.height - 40);
        image.width = width - stores.option.padding;
        image.height = height - stores.option.padding;
        box.width = width;
        box.height = height;
    }, [stores.option.frameConf.width, stores.option.frameConf.height, stores.option.padding]);

    useEffect(() => {
        parent.add(flow);
        return (() => {
            flow.remove();
        })
    }, [parent]);
    return null;
});