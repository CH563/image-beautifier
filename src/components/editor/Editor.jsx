import { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { App, Rect, Frame, Image } from 'leafer-ui';
import { Flow } from '@leafer-in/flow';
import debounce from 'lodash/debounce';
import { addListener, removeListener } from 'resize-detector';
import rotatePng from './rotate.png';
import stores from '@stores';
import '@leafer-in/editor';
import '@leafer-in/view';



export default observer(() => {
    const editorRef = useRef(null);

    useEffect(() => {
        const app = new App({
            view: editorRef.current,
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

        stores.editor.setApp(app);

        const frame = new Frame({
            width: 800,
            height: 600,
            overflow: 'hide',
            fill: {
                type: 'linear',
                from: 'left',
                stops: ['#6366f1', '#a855f7', '#ec4899']
            }
        });
        frame.name = 'frame';
        app.tree.add(frame);
        const image = new Image({
            width: 600,
            cornerRadius: [8, 8, 8, 8],
            url: 'https://images.unsplash.com/photo-1514053514818-a89e7ce304e9',
            shadow: {
                x: 5,
                y: 5,
                blur: 10,
                color: '#00000015',
                box: true
            }
        });
        const flow = new Flow({ children: [image], width: 800, height: 600, flowAlign: 'center' });
        frame.add(flow);
        frame.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100));
        frame.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100));

        // 监听容器变化
        const onResize = debounce(() => {
            app.tree.zoom('fit', 100);
        }, 100);
        addListener(editorRef.current, onResize);
    
        setTimeout(() => {
            app.tree.zoom('fit', 100);
        }, 50);

        return (() => {
            removeListener(editorRef.current, onResize);
            stores.editor.destroy();
        });
    }, []);

    return (
        <div className='md:w-0 md:flex-1 overflow-hidden select-none' ref={editorRef}>
        </div>
    );
});
