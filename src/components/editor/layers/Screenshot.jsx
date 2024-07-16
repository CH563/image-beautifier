import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Image } from 'leafer-ui';
import { Flow } from '@leafer-in/flow';
import stores from '@stores';

export default observer(({ parent }) => {
    const [image, box, flow] = useMemo(() => {
        const image = new Image({
            width: 640,
            height: 427,
            url: stores.editor.img
        });
        const box = new Flow({
            width: 640,
            height: 427,
            flowAlign: 'center',
            overflow: 'hide',
            children: [image]
        });
        const flow = new Flow({ children: [box], width: stores.option.frameConf.width, height: stores.option.frameConf.height, flowAlign: 'center', zIndex: 0 });
        return [image, box, flow];
    }, [parent]);

    useEffect(() => {
        box.fill = stores.option.paddingBg;
    }, [stores.option.paddingBg]);

    useEffect(() => {
        image.width = 640 - stores.option.padding;
        image.height = 427 - stores.option.padding;
    }, [stores.option.padding]);

    useEffect(() => {
        box.cornerRadius = stores.option.round;
        image.cornerRadius = stores.option.round - 2;
    }, [stores.option.round]);

    useEffect(() => {
        const { shadow } = stores.option;
        if (shadow === 1) {
            box.shadow = null;
        } else {
            box.shadow = {
                x: shadow * 2,
                y: shadow * 2,
                blur: shadow * 2.5,
                color: '#00000035',
                box: true
            };
        }
    }, [stores.option.shadow]);
    useEffect(() => {
        flow.width = stores.option.frameConf.width;
        flow.height = stores.option.frameConf.height;
    }, [stores.option.frameConf.width, stores.option.frameConf.height]);

    useEffect(() => {
        parent.add(flow);
        return (() => {
            flow.remove();
        })
    }, [parent]);
    return null;
});