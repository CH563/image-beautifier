import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { App, Rect, Frame, Image } from 'leafer-ui';
import debounce from 'lodash/debounce';
import { addListener, removeListener } from 'resize-detector';
import rotatePng from '@assets/rotate.png';
import stores from '@stores';
import FrameBox from './layers/FrameBox';
import Screenshot from './layers/Screenshot';
import { ScrollBar } from '@leafer-in/scroll'
import '@leafer-in/editor';
import '@leafer-in/view';



export default observer(({target}) => {
    useEffect(() => {
        const app = new App({
            view: target,
            editor: {
                lockRatio: 'corner',
                stroke: '#3f99f7',
                skewable: false,
                hover: false,
                middlePoint: { cornerRadius: 100, width: 20, height: 6 },
                rotatePoint: {
                    width: 20,
                    height: 20,
                    fill: {
                        type: 'image',
                        url: rotatePng,
                    },
                },
            },
            tree: {
                usePartRender: true,
            },
            sky: {
                type: 'draw',
                usePartRender: true,
            },
        });
        new ScrollBar(app);

        stores.editor.setApp(app);

        // const frame = new Frame({
        //     width: 800,
        //     height: 600,
        //     overflow: 'hide',
        //     fill: {
        //         type: 'linear',
        //         from: 'left',
        //         stops: ['#6366f1', '#a855f7', '#ec4899']
        //     }
        // });
        // frame.name = 'frame';
        // app.tree.add(frame);
        // const image = new Image({
        //     width: 600,
        //     cornerRadius: [8, 8, 8, 8],
        //     url: demoPng,
        //     shadow: {
        //         x: 5,
        //         y: 5,
        //         blur: 10,
        //         color: '#00000015',
        //         box: true
        //     }
        // });
        // const flow = new Flow({ children: [image], width: 800, height: 600, flowAlign: 'center' });
        // frame.add(flow);
        // frame.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100));
        // frame.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100));

        // 监听容器变化
        const onResize = debounce(() => {
            app.tree.zoom('fit', 100);
        }, 10);
        addListener(target, onResize);
    
        setTimeout(() => {
            app.tree.zoom('fit', 100);
        }, 10);

        return (() => {
            removeListener(target, onResize);
            stores.editor.destroy();
        });
    }, [target]);

    return (<>
        {
            stores.editor.app?.tree &&
            <FrameBox parent={stores.editor.app.tree} {...stores.option.frameConf}>
                <Screenshot />
            </FrameBox>
        }
    </>);
});
