import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Rect } from 'leafer-ui';
import stores from '@stores';

export default observer(({ parent }) => {
    const rect = useMemo(() => {
        const rect = new Rect({
            x: 0,
            y: 0,
        });
        return rect;
    }, [parent]);

    useEffect(() => {
        rect.width = stores.option.frameConf.width;
        rect.height = stores.option.frameConf.height;
    }, [stores.option.frameConf.width, stores.option.frameConf.height]);

    useEffect(() => {
        rect.zIndex = stores.option.waterIndex;
    }, [stores.option.waterIndex]);

    useEffect(() => {
        rect.fill = {
            type: 'image',
            url: stores.option.waterSvg,
            mode: 'repeat',
            format: 'svg',
            size: Math.round(stores.option.frameConf.width / 6)
        };
    }, [stores.option.waterSvg, stores.option.frameConf.width]);

    useEffect(() => {
        parent.add(rect);
        return (() => {
            rect.remove();
        });
    }, []);
    return null;
});