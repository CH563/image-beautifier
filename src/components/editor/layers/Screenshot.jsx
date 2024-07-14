import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Image } from 'leafer-ui';
import { Flow } from '@leafer-in/flow';
import stores from '@stores';

export default observer(({ parent }) => {
    const [image, flow] = useMemo(() => {
        const image = new Image({
            width: 600,
            cornerRadius: [stores.option.round],
            url: stores.editor.img,
            shadow: {
                x: 5,
                y: 5,
                blur: 10,
                color: '#00000015',
                box: true
            }
        });
        const flow = new Flow({ children: [image], width: stores.option.frameConf.width, height: stores.option.frameConf.height, flowAlign: 'center' });
        return [image, flow];
    }, [parent]);
    useEffect(() => {
        image.cornerRadius = [stores.option.round];
    }, [stores.option.round]);
    useEffect(() => {
        const { shadow } = stores.option;
        if (shadow === 1) {
            image.shadow = null;
        } else {
            image.shadow = {
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